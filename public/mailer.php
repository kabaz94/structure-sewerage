<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

if (!empty($input['honeypot'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name    = isset($input['fullName'])    ? trim($input['fullName'])    : '';
$company = isset($input['companyName']) ? trim($input['companyName']) : '';
$email   = isset($input['email'])       ? trim($input['email'])       : '';
$phone   = isset($input['phone'])       ? trim($input['phone'])       : '';
$service = isset($input['service'])     ? trim($input['service'])     : '';
$message = isset($input['message'])     ? trim($input['message'])     : '';

if (empty($name) || empty($email) || empty($phone) || empty($service)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Rate limiting
$rateFile = sys_get_temp_dir() . '/mailer_rate_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (file_exists($rateFile) && (time() - filemtime($rateFile)) < 60) {
    $count = (int)file_get_contents($rateFile);
    if ($count >= 5) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many requests. Please try again later.']);
        exit;
    }
    file_put_contents($rateFile, $count + 1);
} else {
    file_put_contents($rateFile, '1');
}

// SMTP config — uses cPanel mail account
define('SMTP_HOST', 'mail.structuresewerage.com');
define('SMTP_PORT', 465);
define('SMTP_USER', 'info@structuresewerage.com');
define('SMTP_PASS', 'Passgodaddy*8');
define('SMTP_FROM', 'info@structuresewerage.com');
define('SMTP_FROM_NAME', 'Structure Sewerage Website');
define('TO_EMAIL', 'info@structuresewerage.com');

function smtp_send($to, $toName, $subject, $htmlBody, $textBody) {
    $socket = @fsockopen('ssl://' . SMTP_HOST, SMTP_PORT, $errno, $errstr, 15);
    if (!$socket) {
        return "Connection failed: $errstr ($errno)";
    }

    $read = function() use ($socket) {
        $data = '';
        while ($line = fgets($socket, 515)) {
            $data .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $data;
    };

    $send = function($cmd) use ($socket, $read) {
        fputs($socket, $cmd . "\r\n");
        return $read();
    };

    $read(); // banner
    $send('EHLO ' . SMTP_HOST);
    $send('AUTH LOGIN');
    $send(base64_encode(SMTP_USER));
    $r = $send(base64_encode(SMTP_PASS));
    if (strpos($r, '235') === false) {
        fclose($socket);
        return "Auth failed: $r";
    }

    $send('MAIL FROM:<' . SMTP_FROM . '>');
    $send('RCPT TO:<' . $to . '>');
    $send('DATA');

    $boundary = md5(time());
    $headers  = "From: " . SMTP_FROM_NAME . " <" . SMTP_FROM . ">\r\n";
    $headers .= "To: $toName <$to>\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";
    $headers .= "X-Mailer: PHP/StructureSewerage\r\n";

    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= $textBody . "\r\n";
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $body .= $htmlBody . "\r\n";
    $body .= "--$boundary--\r\n";

    $r = $send($headers . "\r\n" . $body . "\r\n.");
    $send('QUIT');
    fclose($socket);

    return strpos($r, '250') !== false ? null : "Send failed: $r";
}

// Build admin notification email
$adminText  = "NEW WEBSITE ENQUIRY\n\n";
$adminText .= "Name:    $name\n";
$adminText .= "Company: " . ($company ?: 'N/A') . "\n";
$adminText .= "Email:   $email\n";
$adminText .= "Phone:   $phone\n";
$adminText .= "Service: $service\n";
$adminText .= "Date:    " . date('d/m/Y h:i A') . "\n\n";
$adminText .= "Message:\n$message\n";

$adminHtml = "
<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>
  <h2 style='color:#00204f;border-bottom:2px solid #00204f;padding-bottom:8px;'>New Website Enquiry</h2>
  <table style='width:100%;border-collapse:collapse;'>
    <tr><td style='padding:8px;font-weight:bold;color:#555;width:120px;'>Name:</td><td style='padding:8px;'>$name</td></tr>
    <tr style='background:#f5f5f5;'><td style='padding:8px;font-weight:bold;color:#555;'>Company:</td><td style='padding:8px;'>" . ($company ?: 'N/A') . "</td></tr>
    <tr><td style='padding:8px;font-weight:bold;color:#555;'>Email:</td><td style='padding:8px;'><a href='mailto:$email'>$email</a></td></tr>
    <tr style='background:#f5f5f5;'><td style='padding:8px;font-weight:bold;color:#555;'>Phone:</td><td style='padding:8px;'>$phone</td></tr>
    <tr><td style='padding:8px;font-weight:bold;color:#555;'>Service:</td><td style='padding:8px;'>$service</td></tr>
    <tr style='background:#f5f5f5;'><td style='padding:8px;font-weight:bold;color:#555;'>Date:</td><td style='padding:8px;'>" . date('d/m/Y h:i A') . "</td></tr>
  </table>
  <h3 style='color:#00204f;margin-top:20px;'>Message:</h3>
  <div style='background:#f9f9f9;padding:16px;border-left:4px solid #00204f;border-radius:4px;'>
    " . nl2br(htmlspecialchars($message)) . "
  </div>
  <p style='margin-top:20px;font-size:12px;color:#999;'>Sent from structuresewerage.com contact form</p>
</div>";

$err = smtp_send(TO_EMAIL, 'Structure Sewerage', "New Enquiry - $service from $name", $adminHtml, $adminText);

if ($err) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again or call us directly.', 'debug' => $err]);
    exit;
}

// Auto-reply to visitor
$replyText  = "Dear $name,\n\n";
$replyText .= "Thank you for your inquiry regarding \"$service\".\n\n";
$replyText .= "Our engineering team will review your requirements and respond within 2 business hours.\n\n";
$replyText .= "For urgent matters, please call: +60 16-285 6266\n\n";
$replyText .= "Best regards,\nStructure Sewerage\nPrecision Engineering & Industrial Maintenance";

$replyHtml = "
<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>
  <h2 style='color:#00204f;'>Thank You for Your Inquiry</h2>
  <p>Dear $name,</p>
  <p>Thank you for your inquiry regarding <strong>$service</strong>.</p>
  <p>Our engineering team will review your requirements and respond within <strong>2 business hours</strong> during working hours.</p>
  <p>For urgent matters, please call our 24/7 hotline: <strong>+60 16-285 6266</strong></p>
  <hr style='border:1px solid #eee;margin:20px 0;'/>
  <p style='color:#555;font-size:14px;'><strong>Structure Sewerage</strong><br/>Precision Engineering &amp; Industrial Maintenance<br/>structuresewerage.com</p>
</div>";

smtp_send($email, $name, 'Thank You for Contacting Structure Sewerage', $replyHtml, $replyText);

echo json_encode(['success' => true]);
