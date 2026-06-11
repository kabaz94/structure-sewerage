<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
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

$to      = 'info@structuresewerage.com';
$from    = 'info@structuresewerage.com';
$subject = "New Enquiry - $service from $name";
$date    = date('d/m/Y h:i A');

$textBody  = "NEW WEBSITE ENQUIRY\n";
$textBody .= str_repeat("=", 40) . "\n";
$textBody .= "Name:    $name\n";
$textBody .= "Company: " . ($company ?: 'N/A') . "\n";
$textBody .= "Email:   $email\n";
$textBody .= "Phone:   $phone\n";
$textBody .= "Service: $service\n";
$textBody .= "Date:    $date\n\n";
$textBody .= "Message:\n$message\n";

$htmlBody = "
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

// Admin notification — From is the visitor's email so GoDaddy accepts it as inbound
$adminParams  = '-f' . $email;
$adminHeaders  = "From: $name <$email>\r\n";
$adminHeaders .= "Reply-To: $name <$email>\r\n";
$adminHeaders .= "MIME-Version: 1.0\r\n";
$adminHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
$adminHeaders .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

$sent = mail($to, $subject, $htmlBody, $adminHeaders, $adminParams);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please call us directly.']);
    exit;
}

// Auto-reply to visitor
$replySubject = 'Thank You for Contacting Structure Sewerage';
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

$replyHeaders  = "From: Structure Sewerage <$from>\r\n";
$replyHeaders .= "MIME-Version: 1.0\r\n";
$replyHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

mail($email, $replySubject, $replyHtml, $replyHeaders, $additionalParams);

echo json_encode(['success' => true]);
