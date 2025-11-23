# RS Maatkasten Website

Een professionele website voor RS Maatkasten, gebouwd met moderne web technologieën. Klaar voor deployment op Combell hosting.

## 📋 Functionaliteiten

- ✅ Responsief ontwerp voor alle schermformaten
- ✅ Moderne, professionele uitstraling
- ✅ Portfolio galerij met lightbox en filters
- ✅ Contactformulier met PHPMailer
- ✅ Smooth scroll navigatie
- ✅ Mobiel menu
- ✅ Geoptimaliseerd voor SEO
- ✅ SSL-ready en beveiligd

## 🚀 Deployment op Combell

**Voor volledige deployment instructies, zie:** [`DEPLOYMENT_COMBELL.md`](DEPLOYMENT_COMBELL.md)

### Snelle Start

1. **Upload bestanden** naar `public_html` via FTP of cPanel
2. **Installeer PHPMailer** via Composer of handmatig
3. **Configureer** `email-config.php` met je SMTP instellingen
4. **Activeer SSL** certificaat in cPanel
5. **Test** het contactformulier

### Vereisten

- PHP 7.4+ (8.0+ aanbevolen)
- Composer (voor PHPMailer) of handmatige installatie
- SMTP toegang (Gmail, Combell mail, of andere provider)
- SSL certificaat (meestal gratis via Let's Encrypt)

### Aanpassen van de Content

#### Logo
1. Vervang `images/logo.png` met je eigen logo
2. Pas de afmetingen aan in `css/styles.css` indien nodig

#### Hero Afbeelding
1. Vervang `images/hero-bg.jpg` met je eigen hero afbeelding
2. Pas de overlay aan in `css/styles.css` indien gewenst

#### Portfolio
1. Voeg je projectfoto's toe in de `images/portfolio/` map
2. Voeg portfolio items toe in `index.html` volgens het bestaande formaat

#### Contact Informatie
1. Pas de contactgegevens aan in `index.html`
2. Configureer het contactformulier:
   - **Lokaal testen:** Zie `LOCALE_TEST_INSTRUCTIES.md`
   - **Productie (Combell):** Zie `DEPLOYMENT_COMBELL.md`
   - Configureer `email-config.php` met je SMTP instellingen

## 📱 Responsive Design

De website is volledig responsief en werkt op alle apparaten:
- Desktop (1200px en groter)
- Tablet (768px - 1199px)
- Mobiel (tot 767px)

## 🎨 Aanpassen van Kleuren

De belangrijkste kleuren kunnen worden aangepast in `css/styles.css`:

```css
:root {
    --color-primary: #b5895a;
    --color-primary-dark: #8c5e3c;
    --color-text: #333333;
    --color-background: #f5f5f5;
    --color-white: #ffffff;
    --color-cta: #a94442;
    --color-cta-hover: #923b39;
}
```

## 📦 Bestandsstructuur

```
rs-maatkasten/
├── index.html              # Hoofdpagina
├── send-email.php          # Contactformulier handler (PHPMailer)
├── email-config.php        # E-mail configuratie (NIET committen!)
├── email-config.example.php # Voorbeeld configuratie
├── composer.json            # PHPMailer dependency
├── .htaccess               # Apache configuratie (beveiliging, caching)
├── css/
│   └── styles.css          # Alle styling
├── js/
│   └── main.js             # JavaScript functionaliteit
├── images/
│   ├── icons/              # SVG iconen
│   ├── portfolio/          # Portfolio afbeeldingen
│   └── overMij/            # Over mij afbeeldingen
├── DEPLOYMENT_COMBELL.md    # Deployment instructies
├── LOCALE_TEST_INSTRUCTIES.md # Lokale test instructies
└── README.md               # Dit bestand
```

**Belangrijk:** `email-config.php` staat in `.gitignore` en bevat gevoelige informatie!

## 🔧 Onderhoud

### Aanbevolen Updates

- ✅ Houd de portfolio sectie up-to-date met nieuwe projecten
- ✅ Controleer regelmatig of contactgegevens nog actueel zijn
- ✅ Test het contactformulier maandelijks
- ✅ Optimaliseer nieuwe afbeeldingen voor web gebruik
- ✅ Maak regelmatig backups via cPanel

### Performance Tips

- ✅ Afbeeldingen zijn al geoptimaliseerd
- ✅ Browser caching is ingesteld via `.htaccess`
- ✅ GZIP compressie is actief
- ✅ Beveiligingsheaders zijn geconfigureerd

### Beveiliging

- ✅ `email-config.php` is beveiligd tegen directe toegang
- ✅ PHP errors zijn uitgeschakeld voor bezoekers
- ✅ Input validatie en sanitization in `send-email.php`
- ✅ XSS bescherming geïmplementeerd

## 📚 Documentatie

- **Deployment:** [`DEPLOYMENT_COMBELL.md`](DEPLOYMENT_COMBELL.md) - Stap-voor-stap instructies voor Combell
- **Lokaal Testen:** [`LOCALE_TEST_INSTRUCTIES.md`](LOCALE_TEST_INSTRUCTIES.md) - Testen met MailHog/Mailtrap
- **Hosting Advies:** [`HOSTING_ADVIES.md`](HOSTING_ADVIES.md) - Vergelijking hosting providers

## 🐛 Troubleshooting

**Contactformulier werkt niet?**
- Controleer `email-config.php` SMTP instellingen
- Test met Gmail SMTP voor betrouwbaarheid
- Controleer PHP error logs in cPanel
- Zie `DEPLOYMENT_COMBELL.md` voor details

**Website laadt niet?**
- Controleer of `index.html` in `public_html` staat
- Controleer bestandsrechten (644 voor bestanden, 755 voor mappen)
- Controleer SSL certificaat status

## 📝 Licentie

Deze website is gemaakt voor RS Maatkasten. Alle rechten voorbehouden.

---

**Status:** ✅ Klaar voor productie deployment op Combell 