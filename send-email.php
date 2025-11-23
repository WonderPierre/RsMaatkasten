<?php
/**
 * Contactformulier Email Handler met PHPMailer
 * Werkt zowel lokaal als in productie
 */

// Laad configuratie
$config = require_once 'email-config.php';

// Laad PHPMailer (via Composer autoload of handmatig)
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    // Composer autoload
    require_once __DIR__ . '/vendor/autoload.php';
} else {
    // Handmatige PHPMailer installatie
    require_once __DIR__ . '/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/PHPMailer/src/SMTP.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Headers voor JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Alleen POST requests toestaan
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Alleen POST requests toegestaan']);
    exit;
}

// Ontvang JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Valideer JSON parsing
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ongeldige JSON data']);
    exit;
}

// Valideer verplichte velden
if (empty($data['naam']) || empty($data['email']) || empty($data['bericht'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Naam, e-mail en bericht zijn verplicht']);
    exit;
}

// Sanitize input
$naam = htmlspecialchars(strip_tags(trim($data['naam'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$telefoon = !empty($data['telefoon']) ? htmlspecialchars(strip_tags(trim($data['telefoon']))) : 'Niet opgegeven';
$bericht = htmlspecialchars(strip_tags(trim($data['bericht'])));

// Valideer e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ongeldig e-mailadres']);
    exit;
}

try {
    $mail = new PHPMailer(true);
    
    // SMTP instellingen
    $mail->isSMTP();
    $mail->Host = $config['smtp']['host'];
    $mail->SMTPAuth = $config['smtp']['auth'];
    
    if ($config['smtp']['auth']) {
        $mail->Username = $config['smtp']['username'];
        $mail->Password = $config['smtp']['password'];
    }
    
    // Encryption
    if (!empty($config['smtp']['encryption'])) {
        if ($config['smtp']['encryption'] === 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
    }
    
    $mail->Port = $config['smtp']['port'];
    $mail->CharSet = 'UTF-8';
    
    // Debug mode (alleen lokaal)
    if ($config['debug']) {
        $mail->SMTPDebug = 2; // 0 = off, 1 = client, 2 = client and server
        $mail->Debugoutput = function($str, $level) {
            error_log("PHPMailer: $str");
        };
    }
    
    // Afzender
    $mail->setFrom($config['from']['email'], $config['from']['name']);
    $mail->addReplyTo($email, $naam);
    
    // Ontvanger
    $mail->addAddress($config['to']);
    
    // E-mail inhoud
    $mail->isHTML(true);
    $mail->Subject = 'Nieuw contactformulier bericht van ' . $naam;
    
    // HTML body
    $mail->Body = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8c5e3c; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #8c5e3c; display: inline-block; min-width: 100px; }
            .message-box { background-color: white; padding: 15px; border-left: 4px solid #8c5e3c; margin-top: 15px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
    </head>
    <body>
        <div class=\"container\">
            <div class=\"header\">
                <h2 style=\"margin: 0;\">Nieuw Contactformulier Bericht</h2>
            </div>
            <div class=\"content\">
                <div class=\"field\">
                    <span class=\"label\">Naam:</span> " . $naam . "
                </div>
                <div class=\"field\">
                    <span class=\"label\">E-mail:</span> <a href=\"mailto:" . $email . "\">" . $email . "</a>
                </div>
                <div class=\"field\">
                    <span class=\"label\">Telefoon:</span> " . $telefoon . "
                </div>
                <div class=\"message-box\">
                    <div class=\"label\">Bericht:</div>
                    <div style=\"margin-top: 10px;\">" . nl2br($bericht) . "</div>
                </div>
            </div>
            <div class=\"footer\">
                <p>Dit bericht is verzonden via het contactformulier op rsmaatkasten.be</p>
                <p>Je kunt direct antwoorden op: <a href=\"mailto:" . $email . "\">" . $email . "</a></p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Plain text alternatief
    $mail->AltBody = "
Nieuw contactformulier bericht van RS Maatkasten website

Naam: " . $naam . "
E-mail: " . $email . "
Telefoon: " . $telefoon . "

Bericht:
" . $bericht . "

---
Dit bericht is verzonden via het contactformulier op rsmaatkasten.be
    ";
    
    $mail->send();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    
    // Debug info (alleen lokaal of met ?debug=1)
    $debugInfo = null;
    if ($config['debug'] || isset($_GET['debug'])) {
        $debugInfo = [
            'error' => $mail->ErrorInfo,
            'exception' => $e->getMessage(),
            'smtp_host' => $config['smtp']['host'],
            'smtp_port' => $config['smtp']['port']
        ];
    }
    
    $errorMessage = 'Er is een fout opgetreden bij het verzenden.';
    if ($config['debug']) {
        $errorMessage .= ' ' . $mail->ErrorInfo;
    } else {
        $errorMessage .= ' Probeer het later opnieuw of neem telefonisch contact op via info@rsmaatkasten.be';
    }
    
    echo json_encode([
        'success' => false,
        'message' => $errorMessage,
        'debug' => $debugInfo
    ]);
}
