<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { http_response_code(400); echo json_encode(['error' => 'Invalid request']); exit; }
if (!empty($input['honeypot'])) { echo json_encode(['success' => true]); exit; }

$name    = trim($input['fullName']    ?? '');
$company = trim($input['companyName'] ?? '');
$email   = trim($input['email']       ?? '');
$phone   = trim($input['phone']       ?? '');
$service = trim($input['service']     ?? '');
$message = trim($input['message']     ?? '');

if (!$name || !$email || !$phone || !$service) {
    http_response_code(400); echo json_encode(['error' => 'Missing required fields']); exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); echo json_encode(['error' => 'Invalid email']); exit;
}

// Rate limiting
$rateFile = sys_get_temp_dir() . '/mailer_' . md5($_SERVER['REMOTE_ADDR'] ?? 'x');
if (file_exists($rateFile) && (time() - filemtime($rateFile)) < 60) {
    if ((int)file_get_contents($rateFile) >= 5) {
        http_response_code(429); echo json_encode(['error' => 'Too many requests']); exit;
    }
    file_put_contents($rateFile, (int)file_get_contents($rateFile) + 1);
} else {
    file_put_contents($rateFile, '1');
}

// Send via local Exim SMTP on localhost:587 with cPanel credentials
function smtp_send_local($from, $fromName, $to, $toName, $subject, $htmlBody) {
    $smtpUser = 'info@structuresewerage.com';
    $smtpPass = 'Passgodaddy*8';

    $sock = @fsockopen('127.0.0.1', 587, $errno, $errstr, 10);
    if (!$sock) return "Connect failed: $errstr ($errno)";

    $read = function() use ($sock) {
        $out = '';
        while ($line = fgets($sock, 515)) {
            $out .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $out;
    };
    $cmd = function($c) use ($sock, $read) {
        fputs($sock, $c . "\r\n");
        return $read();
    };

    $read(); // banner
    $cmd('EHLO localhost');

    $cmd("MAIL FROM:<$smtpUser>");
    $cmd("RCPT TO:<$to>");
    $cmd('DATA');

    $boundary = md5(uniqid());
    $msg  = "From: $fromName <$smtpUser>\r\n";
    $msg .= "To: $toName <$to>\r\n";
    $msg .= "Reply-To: $fromName <$from>\r\n";
    $msg .= "Subject: $subject\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/html; charset=UTF-8\r\n";
    $msg .= "X-Mailer: PHP/StructureSewerage\r\n";
    $msg .= "\r\n";
    $msg .= $htmlBody . "\r\n";
    $msg .= ".";

    $r = $cmd($msg);
    $cmd('QUIT');
    fclose($sock);

    return (strpos($r, '250') !== false) ? null : "Send failed: $r";
}

$date = date('d/m/Y h:i A');

// Admin notification email body
$adminHtml = "
<!DOCTYPE html><html><body style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;'>
<h2 style='color:#00204f;border-bottom:2px solid #00204f;padding-bottom:8px;'>New Website Enquiry</h2>
<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>
  <tr><td style='padding:8px 12px;font-weight:bold;color:#444;background:#f0f4f8;width:110px;'>Name</td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>$name</td></tr>
  <tr><td style='padding:8px 12px;font-weight:bold;color:#444;background:#f0f4f8;'>Company</td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>" . ($company ?: 'N/A') . "</td></tr>
  <tr><td style='padding:8px 12px;font-weight:bold;color:#444;background:#f0f4f8;'>Email</td><td style='padding:8px 12px;border-bottom:1px solid #eee;'><a href='mailto:$email'>$email</a></td></tr>
  <tr><td style='padding:8px 12px;font-weight:bold;color:#444;background:#f0f4f8;'>Phone</td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>$phone</td></tr>
  <tr><td style='padding:8px 12px;font-weight:bold;color:#444;background:#f0f4f8;'>Service</td><td style='padding:8px 12px;border-bottom:1px solid #eee;'>$service</td></tr>
  <tr><td style='padding:8px 12px;font-weight:bold;color:#444;background:#f0f4f8;'>Date</td><td style='padding:8px 12px;'>$date</td></tr>
</table>
<h3 style='color:#00204f;'>Message</h3>
<div style='background:#f9f9f9;padding:16px;border-left:4px solid #00204f;border-radius:4px;line-height:1.6;'>" . nl2br(htmlspecialchars($message)) . "</div>
<p style='margin-top:24px;font-size:11px;color:#aaa;'>Sent from structuresewerage.com contact form</p>
</body></html>";

// Send admin notification
$err = smtp_send_local($email, $name, 'info@structuresewerage.com', 'Structure Sewerage', "New Enquiry - $service from $name", $adminHtml);
if ($err) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send. Please call us directly.', 'debug' => $err]);
    exit;
}

// Auto-reply to visitor
$replyHtml = "
<!DOCTYPE html><html><body style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;'>
<h2 style='color:#00204f;'>Thank You for Your Inquiry</h2>
<p>Dear $name,</p>
<p>Thank you for your inquiry regarding <strong>$service</strong>.</p>
<p>Our engineering team will review your requirements and respond within <strong>2 business hours</strong> during working hours.</p>
<p>For urgent matters, please call our 24/7 hotline: <strong>+60 16-285 6266</strong></p>
<hr style='border:1px solid #eee;margin:20px 0;'/>
<p style='color:#555;font-size:13px;'><strong>Structure Sewerage</strong><br/>Precision Engineering &amp; Industrial Maintenance<br/>structuresewerage.com</p>
</body></html>";

smtp_send_local('info@structuresewerage.com', 'Structure Sewerage', $email, $name, 'Thank You for Contacting Structure Sewerage', $replyHtml);

echo json_encode(['success' => true]);
