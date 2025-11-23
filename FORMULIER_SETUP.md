# Contactformulier Setup

Het contactformulier gebruikt een PHP backend om e-mails te versturen.

## Stap 1: Test of mail() werkt

1. Upload `test-mail.php` naar je server
2. Open `https://jouw-domein.nl/test-mail.php` in je browser
3. Klik op de knop om een test e-mail te versturen

**Als de test slaagt:** Gebruik `send-email.php` (werkt direct)

**Als de test faalt:** Gebruik `send-email-phpmailer.php` (zie Stap 2)

## Stap 2: Als mail() niet werkt - PHPMailer installeren

### Optie A: PHPMailer via Composer (aanbevolen)

```bash
composer require phpmailer/phpmailer
```

### Optie B: PHPMailer handmatig downloaden

1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer/releases
2. Pak uit in een map `phpmailer` in dezelfde directory als je website
3. Gebruik `send-email-phpmailer.php` in plaats van `send-email.php`

### SMTP Configuratie

Pas de SMTP instellingen aan in `send-email-phpmailer.php`:

**Voor Gmail:**
```php
'host' => 'smtp.gmail.com',
'port' => 587,
'username' => 'jouw-email@gmail.com',
'password' => 'jouw-app-wachtwoord', // App wachtwoord, niet je normale wachtwoord!
```

**Voor Outlook/Hotmail:**
```php
'host' => 'smtp-mail.outlook.com',
'port' => 587,
'username' => 'jouw-email@outlook.com',
'password' => 'jouw-wachtwoord',
```

**Voor andere providers:** Vraag je hosting provider om de SMTP instellingen

### Gmail App Wachtwoord aanmaken

1. Ga naar je Google Account instellingen
2. Beveiliging > 2-staps verificatie (moet aan staan)
3. App-wachtwoorden > Selecteer app "Mail" > Genereer
4. Gebruik dit wachtwoord in de configuratie

## Configuratie

Het e-mailadres waar naartoe wordt verstuurd staat in:
- `send-email.php` regel 44: `$to = 'mabildemaris@gmail.com';`
- `send-email-phpmailer.php` regel 50: `'to_email' => 'mabildemaris@gmail.com'`

Je kunt dit aanpassen naar elk gewenst e-mailadres.

## Beveiliging

Het script bevat:
- ✅ Input validatie en sanitization
- ✅ E-mail validatie
- ✅ XSS bescherming (htmlspecialchars)
- ✅ Alleen POST requests toegestaan
- ✅ JSON response format

## Testen

1. Vul het contactformulier in op je website
2. Klik op "Verstuur bericht"
3. Controleer of je de e-mail ontvangt op `info@rsmaatkasten.be`

## Troubleshooting

**E-mail wordt niet verzonden:**
- Controleer of PHP `mail()` functie actief is op je server
- Controleer server logs voor foutmeldingen
- Sommige hosting providers vereisen SMTP configuratie

**"405 Method Not Allowed":**
- Zorg dat het formulier een POST request doet (dit is al geconfigureerd)

**"500 Internal Server Error":**
- Controleer PHP error logs
- Zorg dat `send-email.php` in dezelfde directory staat als `index.html`

## Alternatief: SMTP configuratie

Als de standaard `mail()` functie niet werkt, kun je PHPMailer gebruiken voor SMTP. Laat het weten als je dit nodig hebt!

