# Deployment Checklist

Gebruik deze checklist om ervoor te zorgen dat alles klaar is voor deployment.

## ✅ Pre-Deployment

### Bestanden Controleren
- [ ] Alle bestanden zijn aanwezig (index.html, css/, js/, images/)
- [ ] `send-email.php` is aanwezig
- [ ] `email-config.php` is geconfigureerd (niet committen!)
- [ ] `.htaccess` is aanwezig
- [ ] `composer.json` is aanwezig (voor PHPMailer)

### Configuratie Controleren
- [ ] `email-config.php` heeft correcte SMTP instellingen
- [ ] E-mailadres in `email-config.php` is correct (`to` veld)
- [ ] Contactgegevens in `index.html` zijn correct
- [ ] Telefoonnummers zijn correct geformatteerd
- [ ] Alle links werken (Instagram, e-mail, telefoon)

### Testen (Lokaal)
- [ ] Website laadt correct lokaal
- [ ] Alle afbeeldingen worden getoond
- [ ] Portfolio filters werken
- [ ] Lightbox werkt
- [ ] Mobiel menu werkt
- [ ] Contactformulier werkt (test met MailHog)
- [ ] Test e-mail ontvangen

## 🚀 Deployment Stappen

### Combell Setup
- [ ] Combell account aangemaakt
- [ ] Hosting pakket geactiveerd
- [ ] Domein geregistreerd/overgezet
- [ ] FTP gegevens ontvangen
- [ ] cPanel toegang beschikbaar

### Bestanden Uploaden
- [ ] FTP verbinding opgezet (FileZilla of cPanel)
- [ ] Alle bestanden geüpload naar `public_html`
- [ ] Bestandsstructuur is correct
- [ ] Bestandsrechten zijn correct (644 voor bestanden, 755 voor mappen)

### PHPMailer Installeren
- [ ] Composer geïnstalleerd (of handmatige PHPMailer)
- [ ] `vendor/autoload.php` bestaat (Composer) OF
- [ ] `PHPMailer/src/PHPMailer.php` bestaat (handmatig)
- [ ] PHPMailer test succesvol

### SSL Certificaat
- [ ] SSL certificaat geïnstalleerd (Let's Encrypt)
- [ ] HTTPS werkt (groen slotje in browser)
- [ ] HTTP redirect naar HTTPS (optioneel, maar aanbevolen)

### E-mail Configuratie
- [ ] `email-config.php` is geconfigureerd met SMTP
- [ ] Gmail App Wachtwoord aangemaakt (als je Gmail gebruikt)
- [ ] Test e-mail verzonden en ontvangen
- [ ] Spam folder gecontroleerd

## 🧪 Post-Deployment Testen

### Website Functionaliteit
- [ ] Website laadt op https://rsmaatkasten.be
- [ ] Alle pagina'secties zijn zichtbaar
- [ ] Alle afbeeldingen worden getoond
- [ ] CSS styling werkt correct
- [ ] JavaScript werkt (filters, lightbox, menu)

### Responsive Design
- [ ] Website werkt op desktop
- [ ] Website werkt op tablet
- [ ] Website werkt op mobiel
- [ ] Mobiel menu werkt correct

### Contactformulier
- [ ] Formulier laadt correct
- [ ] Validatie werkt (verplichte velden)
- [ ] Test bericht verzonden
- [ ] E-mail ontvangen op juiste adres
- [ ] E-mail formatting is correct
- [ ] Reply-to werkt (kan antwoorden op verzender)

### Performance
- [ ] Website laadt snel (< 3 seconden)
- [ ] Afbeeldingen laden snel
- [ ] Geen console errors in browser
- [ ] SSL certificaat is geldig

### Beveiliging
- [ ] `email-config.php` is niet direct toegankelijk
- [ ] PHP errors zijn niet zichtbaar voor bezoekers
- [ ] HTTPS is actief
- [ ] Beveiligingsheaders zijn ingesteld

## 📊 SEO & Analytics (Optioneel)

- [ ] Google Analytics geïnstalleerd (als gewenst)
- [ ] Google Search Console ingesteld
- [ ] Meta tags zijn correct
- [ ] Favicon werkt
- [ ] Sitemap aangemaakt (optioneel)

## 🔄 Backup & Monitoring

- [ ] Eerste backup gemaakt via cPanel
- [ ] Backup schema ingesteld (maandelijks minimaal)
- [ ] Monitoring ingesteld (optioneel, voor uptime)

## ✅ Finale Checklist

- [ ] Alle bovenstaande items zijn gecontroleerd
- [ ] Website is volledig functioneel
- [ ] Contactformulier werkt
- [ ] SSL is actief
- [ ] Backups zijn ingesteld
- [ ] Documentatie is bijgewerkt

## 🎉 Klaar!

Je website staat nu online en is klaar voor gebruik!

**Vergeet niet:**
- Regelmatig backups te maken
- Het contactformulier maandelijks te testen
- Nieuwe portfolio items toe te voegen
- Website performance te monitoren

---

**Laatste controle:** [Datum invullen]
**Gedeployed door:** [Naam invullen]
**Status:** ✅ Live op https://rsmaatkasten.be

