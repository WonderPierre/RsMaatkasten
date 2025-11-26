<?php
/**
 * Contact Form Email Handler for Easyhost
 * Uses native PHP mail() function for maximum compatibility
 */

// Headers for JSON response
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Alleen POST requests toegestaan']);
    exit;
}

// Receive JSON data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate JSON parsing
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ongeldige JSON data']);
    exit;
}

// Validate required fields
if (empty($data['naam']) || empty($data['email']) || empty($data['bericht'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Alle velden zijn verplicht']);
    exit;
}

// Sanitize inputs
$naam = htmlspecialchars(strip_tags(trim($data['naam'])), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$telefoon = isset($data['telefoon']) ? htmlspecialchars(strip_tags(trim($data['telefoon'])), ENT_QUOTES, 'UTF-8') : '';
$bericht = htmlspecialchars(strip_tags(trim($data['bericht'])), ENT_QUOTES, 'UTF-8');

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ongeldig emailadres']);
    exit;
}

// Email configuration
$to = 'info@rsmaatkasten.nl'; // Update this to your actual email
$subject = 'Nieuw contactbericht van ' . $naam;

// Email body
$message = "Nieuw contactbericht van de website\n\n";
$message .= "Naam: " . $naam . "\n";
$message .= "Email: " . $email . "\n";
if (!empty($telefoon)) {
    $message .= "Telefoon: " . $telefoon . "\n";
}
$message .= "\nBericht:\n" . $bericht . "\n";

// Email headers
$headers = array();
$headers[] = 'From: noreply@rsmaatkasten.nl';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

// Convert headers array to string
$headers_string = implode("\r\n", $headers);

// Send email
try {
    $success = mail($to, $subject, $message, $headers_string);
    
    if ($success) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Er is een fout opgetreden. Probeer het later opnieuw.'
    ]);
}
