# The JJ's — Wedding Invitation Website

A static, responsive wedding invitation website created for **John Michael Oliba & Jane Namubiru** (*Saturday, 29th August 2026*).

## Features

- **Personalized Guest Experience (`?guest=`):** Automatically greets invited guests by name across the hero banner, introductory section, formal invitation card, and pre-filled WhatsApp RSVP messages when opened via a personalized link.
- **Built-in Guest Link Generator:** Includes a discreet **Personalize invite link** tool in the footer to generate and copy custom URLs for individual guests or families.
- **Live Wedding Countdown:** Real-time countdown timer (Days, Hours, Minutes, Seconds) set to **Saturday, 29th August 2026 at 1:00 PM EAT (UTC+3)**.
- **Event Schedule & Map Integration:** Direct Google Maps links for both the Church Service (*Watoto Church Bweyogerere*) and the Reception (*PDN opposite Watoto Bweyogerere*).
- **Calendar Sync:** One-click downloadable `.ics` calendar file (**Add to Calendar**) and direct **Google Calendar** event creation.
- **Interactive Digital Invitation Card:** Formal ivory-and-gold invitation card with a click-to-enlarge full-screen lightbox view.
- **One-Tap WhatsApp RSVP:** Direct WhatsApp confirmation links for the RSVP committee (**Ogara Collin**, **Glenn Jonathan Ekalu**, and **Stella Ruth Apeduno**).

## Project Structure

```text
├── index.html   # Main HTML structure and content
├── styles.css   # Responsive layout, typography, glassmorphism, and card styling
├── script.js    # Guest personalization, countdown timer, .ics generator, and modals
├── couple.jpg   # Hero background photograph (add your high-resolution photo here)
└── README.md    # Project documentation
```

*(Note: If you are using the single-file bundle, all styles and scripts are self-contained inside `index.html`.)*

## Setup & Customization

1. **Add Your Hero Photo:** Place your couple's background photograph in the root directory as `couple.jpg` (or update the `background-image` URL in `styles.css` / `index.html`).
2. **Preview Locally:** Open `index.html` directly in any modern web browser—no build tools or server dependencies are required.
3. **Create Personalized Links:**
   - Append `?guest=Guest%20Name` to your hosted URL, for example:
     `https://your-domain.com/?guest=Mr.%20Aloysius%20Tumwekwase%20Gonzaga`
   - Or click **Personalize invite link** in the website footer to generate and copy links visually.

## Deployment

Because this is a pure static website (HTML, CSS, and vanilla JavaScript), you can host it for free on any static web host:

- **GitHub Pages:** Push the files to a GitHub repository and enable **Settings > Pages**.
- **Netlify / Vercel:** Drag and drop the project folder directly into the dashboard for instant HTTPS deployment.
