# Deployment Instructies voor Combell

Deze gids helpt je om de RS Maatkasten website online te zetten op Combell hosting.

## 📋 Voorbereiding

### Vereiste Bestanden
Zorg dat je de volgende bestanden hebt:
- ✅ Alle website bestanden (index.html, css/, js/, images/)
- ✅ `send-email.php`
- ✅ `email-config.php` (geconfigureerd)
- ✅ `composer.json`
- ✅ `.htaccess`

### Wat je nodig hebt van Combell
- ✅ FTP toegang (hostname, username, password)
- ✅ cPanel toegang (of Plesk)
- ✅ Domein naam (rsmaatkasten.be)
- ✅ PHP versie 7.4 of hoger (8.0+ aanbevolen)

## 🚀 Stap-voor-stap Deployment

### Stap 1: Combell Account Opzetten

1. Ga naar [www.combell.com](https://www.combell.com)
2. Kies **Start Hosting** pakket (~€4/maand)
3. Registreer of breng je .be domein over
4. Activeer je hosting account
5. Noteer je FTP gegevens (je krijgt deze via e-mail)

### Stap 2: FTP Verbinding Opzetten

**Optie A: Via FileZilla (aanbevolen)**
1. Download FileZilla: https://filezilla-project.org
2. Open FileZilla
3. Klik op "Site Manager" (Ctrl+S)
4. Voeg nieuwe site toe:
   - **Host:** `ftp.rsmaatkasten.be` (of wat Combell je geeft)
   - **Protocol:** FTP
   - **Encryption:** Use explicit FTP over TLS
   - **Logon Type:** Normal
   - **User:** Je Combell FTP username
   - **Password:** Je Combell FTP password
5. Klik "Connect"

**Optie B: Via cPanel File Manager**
1. Log in op cPanel
2. Ga naar "File Manager"
3. Navigeer naar `public_html` of `www` map

### Stap 3: Bestanden Uploaden

1. **Upload alle bestanden** naar de `public_html` (of `www`) map:
   ```
   public_html/
   ├── index.html
   ├── send-email.php
   ├── email-config.php
   ├── composer.json
   ├── .htaccess
   ├── css/
   ├── js/
   └── images/
   ```

2. **Zorg dat de structuur klopt:**
   - `index.html` moet in de root staan
   - Alle mappen (css, js, images) moeten op hetzelfde niveau staan

### Stap 4: PHPMailer Installeren

**Optie A: Via Composer (aanbevolen)**

1. Log in op cPanel
2. Ga naar "Terminal" of "SSH Access"
3. Navigeer naar je website directory:
   ```bash
   cd public_html
   ```
4. Installeer Composer (als het nog niet geïnstalleerd is):
   ```bash
   curl -sS https://getcomposer.org/installer | php
   ```
5. Installeer PHPMailer:
   ```bash
   php composer.phar install
   ```
   Of als Composer globaal is:
   ```bash
   composer install
   ```

**Optie B: Handmatig (als Composer niet werkt)**

1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer/releases
2. Pak uit in een map `PHPMailer` in je root directory
3. De structuur moet zijn: `public_html/PHPMailer/src/PHPMailer.php`

### Stap 5: E-mail Configuratie

1. **Open `email-config.php` via cPanel File Manager**
2. **Pas de productie configuratie aan:**

```php
'smtp' => [
    // Optie 1: Gmail (aanbevolen)
    'host' => 'smtp.gmail.com',
    'port' => 587,
    'username' => 'jouw-email@gmail.com',
    'password' => 'jouw-gmail-app-wachtwoord',
    'encryption' => 'tls',
    'auth' => true
],
'to' => 'info@rsmaatkasten.be',  // Het e-mailadres waar je berichten wilt ontvangen
```

3. **Voor Gmail App Wachtwoord:**
   - Ga naar Google Account > Beveiliging
   - Zet 2-staps verificatie aan
   - Maak App Wachtwoord aan voor "Mail"
   - Gebruik dit wachtwoord (niet je normale wachtwoord!)

4. **Sla het bestand op**

### Stap 6: SSL Certificaat Installeren

1. Log in op cPanel
2. Ga naar "SSL/TLS Status"
3. Selecteer je domein
4. Klik "Run AutoSSL" of installeer Let's Encrypt certificaat
5. Wacht tot het certificaat actief is (kan enkele minuten duren)

### Stap 7: Test de Website

1. **Open je website:** https://rsmaatkasten.be
2. **Controleer:**
   - ✅ Website laadt correct
   - ✅ Alle afbeeldingen worden getoond
   - ✅ CSS styling werkt
   - ✅ JavaScript werkt (portfolio filters, lightbox, etc.)

3. **Test het contactformulier:**
   - Vul het formulier in
   - Verstuur een test bericht
   - Controleer of je de e-mail ontvangt
   - Controleer spam folder als je niets ontvangt

### Stap 8: Bestandsrechten Controleren

Zorg dat de volgende rechten correct zijn:
- Bestanden: `644`
- Mappen: `755`
- `.htaccess`: `644`

In cPanel File Manager: Rechtsklik op bestand > "Change Permissions"

## 🔧 Troubleshooting

### Website laadt niet
- ✅ Controleer of `index.html` in de juiste map staat (`public_html`)
- ✅ Controleer bestandsrechten
- ✅ Controleer of PHP actief is

### Contactformulier werkt niet
- ✅ Controleer of `send-email.php` bestaat en juiste rechten heeft
- ✅ Controleer PHP error logs in cPanel
- ✅ Test met `?debug=1` aan het einde van de URL (alleen lokaal)
- ✅ Controleer SMTP instellingen in `email-config.php`

### PHPMailer niet gevonden
- ✅ Controleer of `vendor/autoload.php` bestaat (Composer)
- ✅ Of controleer of `PHPMailer/src/PHPMailer.php` bestaat (handmatig)
- ✅ Controleer bestandspaden in `send-email.php`

### E-mails komen niet aan
- ✅ Controleer spam folder
- ✅ Test SMTP instellingen (gebruik Gmail SMTP voor betrouwbaarheid)
- ✅ Controleer of Gmail App Wachtwoord correct is
- ✅ Controleer PHP error logs

### SSL Certificaat werkt niet
- ✅ Wacht 10-15 minuten na installatie
- ✅ Controleer of je HTTPS gebruikt (niet HTTP)
- ✅ Clear browser cache

## 📞 Combell Support

Als je problemen hebt:
- **Live Chat:** Via Combell website
- **Telefoon:** Check Combell website voor nummer
- **Support Ticket:** Via cPanel

## ✅ Post-Deployment Checklist

- [ ] Website laadt correct op https://rsmaatkasten.be
- [ ] SSL certificaat is actief (groen slotje in browser)
- [ ] Alle afbeeldingen worden getoond
- [ ] Portfolio filters werken
- [ ] Lightbox werkt
- [ ] Contactformulier werkt
- [ ] Test e-mail ontvangen
- [ ] Mobiele weergave werkt correct
- [ ] Google Analytics geïnstalleerd (optioneel)
- [ ] Google Search Console ingesteld (optioneel)

## 🔒 Beveiliging

- ✅ `email-config.php` is beveiligd via `.htaccess`
- ✅ PHP errors zijn uitgeschakeld voor bezoekers
- ✅ Beveiligingsheaders zijn ingesteld
- ✅ Bestandsrechten zijn correct

## 📈 Performance Tips

- ✅ Afbeeldingen zijn geoptimaliseerd
- ✅ Browser caching is ingesteld via `.htaccess`
- ✅ GZIP compressie is actief
- ✅ Overweeg CDN voor snellere laadtijden (optioneel)

## 🎉 Klaar!

Je website staat nu online! Vergeet niet om:
- Regelmatig backups te maken
- Updates te monitoren
- Contactformulier te testen
- Website performance te controleren

---

**Laatste update:** Deze instructies zijn specifiek voor Combell hosting. Voor andere providers kunnen stappen verschillen.

