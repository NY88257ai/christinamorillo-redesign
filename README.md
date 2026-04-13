# C:\hristina Morillo — Website Redesign

**Theme:** Terminal / Editorial Dark  
**Fonts:** Space Mono + DM Serif Display (loaded from Google Fonts)  
**Accent:** #c8f55a (acid green)

---

## File Structure

```
christinamorillo/
├── index.html              ← Homepage (hero, about, blog preview, podcast, footer)
├── blog.html               ← Blog listing page with tag filter
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles (responsive, animations, dark theme)
│   └── js/
│       └── main.js         ← Nav toggle, scroll animations, blog filter, subscribe form
└── README.md
```

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — hero with stats panel, about/bio, blog preview, podcast section, footer |
| `blog.html` | Full blog listing with filterable tags (All / Strategy / Leadership / Books) |

---

## Customization

### Colors
All colors use CSS custom properties defined at the top of `style.css`:
```css
:root {
  --accent: #c8f55a;   /* Swap this to change the entire accent color */
  --bg:     #0a0a0a;   /* Page background */
  --text:   #e8e4d9;   /* Primary text */
}
```

### Adding Blog Posts
In `blog.html`, copy a `.blog-item` block and update:
- `href` — link to the full article
- `data-tags` — space-separated tags: `"strategy"`, `"leadership"`, `"books"`
- `.blog-item-date` — publication date
- `.blog-item-tag` — display tag label
- `.blog-item-title` — article title
- `.blog-item-excerpt` — short description

### Subscribe Form
The form in `main.js` is currently stubbed. Replace the handler body with your email service:
```js
// Mailchimp, ConvertKit, Buttondown, etc.
fetch('YOUR_ENDPOINT', { method: 'POST', body: JSON.stringify({ email }) })
```

### Images
Add a `images/` folder and reference photos via `<img src="images/photo.jpg" />`.  
Recommended: a professional headshot in the hero or about section.

---

## Deployment

### GitHub Pages
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → set source to `main` branch, root `/`
3. Site will be live at `https://yourusername.github.io/reponame`

### Netlify / Vercel
Drag and drop the folder into Netlify Drop, or connect the repo for auto-deploy.

### Custom Domain
Add a `CNAME` file in the root with your domain:
```
christinamorillo.com
```

---

## Fonts
Loaded from Google Fonts (requires internet connection):
- **Space Mono** — navigation, labels, monospaced elements
- **DM Serif Display** — headlines, bio body text, post titles

To use locally (offline), download from fonts.google.com and update the `@import` in `style.css`.

---

© 2025 christinamorillo.com
