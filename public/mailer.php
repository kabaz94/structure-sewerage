<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

// Honeypot check — silently succeed for bots
if (!empty($input['honeypot'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Extract fields
$name    = isset($input['fullName'])    ? trim($input['fullName'])    : '';
$company = isset($input['companyName']) ? trim($input['companyName']) : '';
$email   = isset($input['email'])       ? trim($input['email'])       : '';
$phone   = isset($input['phone'])       ? trim($input['phone'])       : '';
$service = isset($input['service'])     ? trim($input['service'])     : '';
$message = isset($input['message'])     ? trim($input['message'])     : '';

// Validate required fields
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

// Rate limiting — simple file-based
$rateFile = sys_get_temp_dir() . '/mailer_rate_' . md5($_SERVER['REMOTE_ADDR']);
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

// Build email
$to       = 'info@structuresewerage.com';
$subject  = "Enquiry - $service";

$body  = "==============================\n";
$body .= "NEW WEBSITE ENQUIRY\n";
$body .= "==============================\n\n";
$body .= "Name:       $name\n";
$body .= "Company:    " . ($company ?: 'N/A') . "\n";
$body .= "Email:      $email\n";
$body .= "Phone:      $phone\n";
$body .= "Service:    $service\n";
$body .= "Date:       " . date('d/m/Y h:i A') . "\n\n";
$body .= "Message:\n";
$body .= "-----------------------------\n";
$body .= $message . "\n";
$body .= "-----------------------------\n";

$headers  = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    // Send auto-reply to visitor
    $autoSubject = "Thank You for Contacting Structure Sewerage";
    $autoBody  = "Dear $name,\n\n";
    $autoBody .= "Thank you for your inquiry regarding \"$service\".\n\n";
    $autoBody .= "Our engineering team will review your requirements and respond within 2 business hours during working hours.\n\n";
    $autoBody .= "For urgent matters, please call our 24/7 hotline: +60 16-285 6266\n\n";
    $autoBody .= "Best regards,\n";
    $autoBody .= "Structure Sewerage\n";
    $autoBody .= "Precision Engineering & Industrial Maintenance\n";

    $autoHeaders  = "From: Structure Sewerage <info@structuresewerage.com>\r\n";
    $autoHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $autoSubject, $autoBody, $autoHeaders);

    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
}
