# Hosting Advies voor RS Maatkasten Website

## Website Vereisten

Je website heeft de volgende vereisten:
- ✅ Statische HTML/CSS/JavaScript
- ✅ PHP 7.4+ (voor contactformulier)
- ✅ PHPMailer ondersteuning (Composer of handmatige installatie)
- ✅ SMTP toegang (voor e-mail verzending)
- ✅ SSL certificaat (HTTPS - verplicht voor moderne websites)
- ✅ .be domein ondersteuning
- ❌ Geen database nodig
- ❌ Geen complexe server configuratie nodig

## Aanbevolen Hosting Opties voor België

### 🥇 Optie 1: Combell (Belgisch, Aanbevolen)

**Waarom:**
- Belgisch bedrijf met Nederlandse support
- Uitstekende prijs/kwaliteit verhouding
- Goede PHP ondersteuning
- Composer beschikbaar
- SSL certificaat vaak inbegrepen
- .be domein registratie mogelijk

**Pakketten:**
- **Start Hosting** (~€3-5/maand): Perfect voor jouw website
- **Pro Hosting** (~€8-12/maand): Meer ruimte en features

**Voordelen:**
- Nederlandse/Belgische support
- Snelle servers in België/Nederland
- Eenvoudige installatie via cPanel
- Goede uptime garantie

**Nadelen:**
- Iets duurder dan internationale providers
- Beperkte storage op goedkoopste pakketten

**Website:** https://www.combell.com

---

### 🥈 Optie 2: One.com (Internationaal, Goede prijs)

**Waarom:**
- Zeer betaalbaar
- Goede PHP ondersteuning
- SSL inbegrepen
- Eenvoudige interface
- .be domeinen beschikbaar

**Pakketten:**
- **Starter** (~€2-3/maand): Voldoende voor jouw website

**Voordelen:**
- Zeer goedkoop
- Eenvoudig te gebruiken
- Goede uptime
- 24/7 support

**Nadelen:**
- Support voornamelijk in Engels
- Minder geavanceerde features
- Beperkte Composer ondersteuning (mogelijk handmatige PHPMailer installatie nodig)

**Website:** https://www.one.com

---

### 🥉 Optie 3: Hostinger (Internationaal, Budget)

**Waarom:**
- Zeer goedkoop
- Goede performance
- PHP 8+ ondersteuning
- SSL inbegrepen
- Composer beschikbaar

**Pakketten:**
- **Single Web Hosting** (~€1-2/maand): Meer dan genoeg

**Voordelen:**
- Zeer betaalbaar
- Goede performance
- Moderne PHP versies
- Composer ondersteuning

**Nadelen:**
- Support voornamelijk Engels
- Servers niet in België (maar wel in Europa)
- Interface kan overweldigend zijn

**Website:** https://www.hostinger.nl

---

### 🏆 Optie 4: Netlify / Vercel (Voor statische sites, GRATIS)

**Waarom:**
- Gratis tier beschikbaar
- Zeer snelle CDN
- Automatische SSL
- Eenvoudige deployment

**Let op:**
- PHP werkt NIET op deze platforms
- Je zou het contactformulier moeten aanpassen naar:
  - Netlify Forms (gratis)
  - Formspree (gratis tier)
  - Of een serverless functie gebruiken

**Website:** https://www.netlify.com of https://vercel.com

---

## Vergelijking Tabel

| Provider | Prijs/maand | PHP | Composer | SSL | Support | Locatie |
|----------|-------------|-----|----------|-----|---------|---------|
| **Combell** | €3-5 | ✅ | ✅ | ✅ | 🇧🇪 NL/BE | België |
| **One.com** | €2-3 | ✅ | ⚠️ | ✅ | 🇬🇧 EN | Europa |
| **Hostinger** | €1-2 | ✅ | ✅ | ✅ | 🇬🇧 EN | Europa |
| **Netlify** | Gratis | ❌ | ❌ | ✅ | 🇬🇧 EN | Global CDN |

## Mijn Aanbeveling

### Voor jouw situatie: **Combell**

**Redenen:**
1. ✅ Belgisch bedrijf met Nederlandse support (belangrijk voor lokale business)
2. ✅ Goede PHP en Composer ondersteuning (nodig voor PHPMailer)
3. ✅ Betrouwbaar en professioneel
4. ✅ .be domein registratie mogelijk
5. ✅ Goede prijs/kwaliteit verhouding
6. ✅ Eenvoudige installatie van PHPMailer

**Stappenplan:**
1. Kies **Start Hosting** pakket (~€4/maand)
2. Registreer je .be domein bij Combell (of breng over)
3. Upload je website via FTP of cPanel File Manager
4. Installeer PHPMailer via Composer of handmatig
5. Configureer `email-config.php` met je SMTP instellingen

## Alternatief: Als je budget beperkt is

**Hostinger** is een goede tweede keuze:
- Zeer betaalbaar
- Goede PHP ondersteuning
- Composer beschikbaar
- Alleen support is in Engels

## Wat je nodig hebt bij elke provider

### Minimale Vereisten:
- ✅ PHP 7.4 of hoger (8.0+ is beter)
- ✅ FTP toegang of File Manager
- ✅ SSL certificaat (meestal gratis via Let's Encrypt)
- ✅ SMTP toegang (voor PHPMailer)
- ✅ Minimaal 1GB storage (jouw site is klein)
- ✅ Minimaal 10GB bandwidth (meer dan genoeg)

### Nice to Have:
- ✅ Composer beschikbaar (voor PHPMailer installatie)
- ✅ cPanel of Plesk (eenvoudiger beheer)
- ✅ Automatische backups
- ✅ .be domein registratie/transfer

## Installatie Checklist

Na het kiezen van een provider:

- [ ] Domein registreren/overzetten
- [ ] Hosting pakket activeren
- [ ] SSL certificaat installeren (meestal automatisch)
- [ ] Website uploaden via FTP
- [ ] PHPMailer installeren (Composer of handmatig)
- [ ] `email-config.php` configureren met SMTP
- [ ] Test het contactformulier
- [ ] Controleer of alles werkt

## Kosten Overzicht

**Jaarlijkse kosten (ongeveer):**
- Hosting: €36-60/jaar (€3-5/maand)
- Domein .be: €10-15/jaar
- **Totaal: €46-75/jaar**

**Eerste jaar (vaak korting):**
- Veel providers geven 50% korting eerste jaar
- **Totaal eerste jaar: ~€30-40**

## Tips

1. **Kies een pakket met automatische backups** - Dit bespaart veel hoofdpijn
2. **SSL is verplicht** - Moderne browsers waarschuwen zonder HTTPS
3. **Test eerst lokaal** - Gebruik MailHog om alles te testen voordat je online gaat
4. **Start klein** - Je kunt altijd upgraden als je meer nodig hebt
5. **Lees de voorwaarden** - Sommige providers hebben beperkingen op e-mail verzending

## Support

Als je hulp nodig hebt bij:
- Het kiezen van een provider
- Het uploaden van je website
- Het configureren van PHPMailer
- Het instellen van SMTP

Laat het weten en ik help je verder!

---

**Laatste update:** Deze informatie is algemeen advies. Prijzen en features kunnen veranderen. Controleer altijd de actuele informatie op de website van de provider.

