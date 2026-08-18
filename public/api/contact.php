<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    respond(413, ['ok' => false, 'error' => 'Request is too large.']);
}

require __DIR__ . '../vendor/autoload.php';

$config = [];
$localConfig = __DIR__ . '../config/contact.local.php';
if (is_file($localConfig)) {
    $loaded = require $localConfig;
    if (is_array($loaded)) $config = $loaded;
}

$getConfig = static fn(string $key, string $env, mixed $default = null): mixed =>
    getenv($env) !== false ? getenv($env) : ($config[$key] ?? $default);

$smtpHost = (string)$getConfig('smtp_host', 'SMTP_HOST', 'smtp.ionos.com');
$smtpPort = (int)$getConfig('smtp_port', 'SMTP_PORT', 587);
$smtpUsername = (string)$getConfig('smtp_username', 'SMTP_USERNAME', '');
$smtpPassword = (string)$getConfig('smtp_password', 'SMTP_PASSWORD', '');
$fromEmail = (string)$getConfig('from_email', 'CONTACT_FROM_EMAIL', $smtpUsername);
$fromName = (string)$getConfig('from_name', 'CONTACT_FROM_NAME', 'Nelson Llanes Website');
$toEmail = (string)$getConfig('to_email', 'CONTACT_TO_EMAIL', '');
$toName = (string)$getConfig('to_name', 'CONTACT_TO_NAME', 'Nelson Llanes');

if ($smtpUsername === '' || $smtpPassword === '' || $fromEmail === '' || $toEmail === '') {
    error_log('Contact form configuration is incomplete.');
    respond(503, ['ok' => false, 'error' => 'Contact form is temporarily unavailable.']);
}

$website = trim((string)($_POST['website'] ?? ''));
$started = (int)($_POST['form_started'] ?? 0);
if ($website !== '' || $started <= 0 || (int)(microtime(true) * 1000) - $started < 1800) {
    respond(400, ['ok' => false, 'error' => 'Unable to process this submission.']);
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') respond(400, ['ok' => false, 'error' => 'All fields are required.']);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(400, ['ok' => false, 'error' => 'Invalid email address.']);
if (preg_match('/[\r\n]/', $email)) respond(400, ['ok' => false, 'error' => 'Invalid email address.']);
if (mb_strlen($name) > 100 || mb_strlen($email) > 255 || mb_strlen($message) > 5000) respond(400, ['ok' => false, 'error' => 'One or more fields are too long.']);

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/nelson-contact-' . hash('sha256', $ip);
$lastRequest = is_file($rateFile) ? (int)file_get_contents($rateFile) : 0;
if (time() - $lastRequest < 30) respond(429, ['ok' => false, 'error' => 'Please wait before sending another message.']);
@file_put_contents($rateFile, (string)time(), LOCK_EX);

$safeName = trim(strip_tags($name));
$safeMessage = trim(strip_tags($message));
$body = "You received a new message from your website:\n\nName: {$safeName}\nEmail: {$email}\n\nMessage:\n{$safeMessage}\n";

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 15;
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($toEmail, $toName);
    $mail->addReplyTo($email, $safeName);
    $mail->Subject = 'New message from your portfolio';
    $mail->Body = $body;
    $mail->send();
    respond(200, ['ok' => true]);
} catch (Exception $exception) {
    error_log('Contact mail error: ' . $exception->getMessage());
    respond(500, ['ok' => false, 'error' => 'Message could not be sent.']);
}
