<?php
/**
 * E-mail Configuratie VOORBEELD
 * Kopieer dit bestand naar email-config.php en pas aan
 */

// Detecteer of we lokaal zijn
$isLocal = (
    isset($_SERVER['HTTP_HOST']) && (
        $_SERVER['HTTP_HOST'] === 'localhost' ||
        $_SERVER['HTTP_HOST'] === '127.0.0.1' ||
        strpos($_SERVER['HTTP_HOST'], '.local') !== false ||
        strpos($_SERVER['HTTP_HOST'], 'localhost:') !== false
    )
) || (
    isset($_SERVER['SERVER_NAME']) && (
        $_SERVER['SERVER_NAME'] === 'localhost' ||
        $_SERVER['SERVER_NAME'] === '127.0.0.1'
    )
);

if ($isLocal) {
    // LOKALE TEST CONFIGURATIE
    return [
        'use_phpmailer' => true,
        'smtp' => [
            'host' => 'localhost',           // MailHog: localhost
            'port' => 1025,                 // MailHog: 1025
            'username' => '',               // Leeg voor MailHog
            'password' => '',                // Leeg voor MailHog
            'encryption' => '',              // '' voor MailHog
            'auth' => false                 // false voor MailHog
        ],
        'from' => [
            'email' => 'noreply@rsmaatkasten.local',
            'name' => 'RS Maatkasten Website (Lokaal)'
        ],
        'to' => 'mabildemaris@gmail.com',
        'debug' => true
    ];
} else {
    // PRODUCTIE CONFIGURATIE
    return [
        'use_phpmailer' => true,
        'smtp' => [
            'host' => 'smtp.gmail.com',      // Je SMTP server
            'port' => 587,                   // 587 voor TLS, 465 voor SSL
            'username' => 'jouw-email@gmail.com',
            'password' => 'jouw-app-wachtwoord',
            'encryption' => 'tls',           // 'tls' of 'ssl'
            'auth' => true
        ],
        'from' => [
            'email' => 'noreply@rsmaatkasten.be',
            'name' => 'RS Maatkasten Website'
        ],
        'to' => 'mabildemaris@gmail.com',
        'debug' => false
    ];
}

