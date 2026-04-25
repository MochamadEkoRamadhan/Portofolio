# 🎨 CSS DESIGN SYSTEM - QUICK REFERENCE

## Color Palette

```css
PRIMARY   : #667eea (Indigo)
SECONDARY : #764ba2 (Purple)
GRADIENT  : linear-gradient(135deg, #667eea 0%, #764ba2 100%)

BG_LIGHT  : #f8f9fa (Light Gray)
TEXT_DARK : #333333 (Dark)
WHITE     : #ffffff

SHADOW    : 0 5px 20px rgba(0, 0, 0, 0.1)
SHADOW_MD : 0 10px 30px rgba(102, 126, 234, 0.2)
```

---

## Responsive Breakpoints

```css
DESKTOP  : > 1200px (full features)
TABLET   : 768px - 1200px (adjusted layout)
MOBILE   : < 768px (hamburger menu, 1 column)
SMALL    : < 480px (compact spacing)
```

---

## Key CSS Classes

### Navbar
```css
.navbar              /* Fixed navbar */
.nav-container       /* Max-width container */
.logo                /* Gradient logo */
.nav-links           /* Navigation list */
.hamburger           /* Mobile menu icon */
.hamburger.active    /* Menu open state */
```

### Hero Section
```css
.hero                /* Main container */
.hero-background     /* SVG background */
.hero-content        /* 2 column grid */
.hero-text           /* Left column */
.hero-buttons        /* CTA buttons */
.hero-image          /* Right column */
.image-wrapper       /* Image container */
.scroll-indicator    /* Bottom indicator */
```

### About Section
```css
.about-section       /* Main container */
.about-content       /* 2 column grid */
.about-image         /* Image column */
.image-frame         /* Image wrapper */
.skills-section      /* Skills container */
.skills-grid         /* 3 column grid */
.skill-card          /* Individual skill */
.skill-icon          /* Icon in skill */
.experience          /* Experience section */
.experience-item     /* Timeline item */
```

### Projects Section
```css
.projects-section    /* Main container */
.project-grid        /* Responsive grid */
.project-card        /* Individual card */
.project-image       /* Image container */
.project-overlay     /* Hover overlay */
.btn-view            /* View button */
.project-info        /* Text info */
```

### Modal
```css
.modal               /* Modal overlay */
.modal-content       /* Modal container */
.modal-card          /* Grid layout */
.modal-left          /* Image side */
.modal-right         /* Text side */
.slider              /* Image slider */
.slides              /* Slides container */
.slides img.active   /* Active slide */
```

### Contact Section
```css
#contact             /* Main container */
.contact-cards       /* Grid layout */
.contact-card        /* Individual card */
```

---

## Important Animations

```css
@keyframes fadeInUp
/* Fade in + move up 30px */

@keyframes fadeInRight  
/* Fade in + move right 30px */

@keyframes bounce
/* Vertical bounce animation */

@keyframes shimmer
/* Shine effect on images */
```

---

## Button Styles

### Primary Button (White)
```css
.btn.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

### Secondary Button (Transparent)
```css
.btn.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}
```

### Nav Button
```css
.btn-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
```

---

## Hover Effects

### Card Hover
```css
transform: translateY(-8px);
box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
```

### Button Hover
```css
transform: translateY(-3px);
box-shadow: enhanced;
```

### Image Hover
```css
transform: scale(1.1);
```

---

## Spacing System

```
xs : 0.25rem (4px)
sm : 0.5rem  (8px)
md : 1rem    (16px)
lg : 1.5rem  (24px)
xl : 2rem    (32px)
2xl: 3rem    (48px)
```

---

## Grid Layouts

### About Section
```css
display: grid;
grid-template-columns: 1fr 1fr;  /* Desktop */
gap: 4rem;

/* Mobile */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 2rem;
}
```

### Skills Grid
```css
grid-template-columns: repeat(3, 1fr);  /* Desktop */
gap: 1.5rem;

/* Mobile */
@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

### Project Grid
```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;
```

---

## Typography

```css
Font Family: 'Segoe UI', Tahoma, Geneva, sans-serif

Sizes:
- h1 (Hero): 3.5rem desktop, 2rem mobile
- h2 (Section): 2.5rem desktop, 2rem mobile
- h3 (Subheading): 1.5rem
- p (Body): 1.05rem
- small: 0.95rem

Line Height: 1.8 (body), 1.2 (headings)
Letter Spacing: default (natural)
```

---

## Customization Guide

### Change Primary Color
Find & replace:
```
#667eea  → your color
```

### Change Gradient
Find & replace:
```
linear-gradient(135deg, #667eea 0%, #764ba2 100%)
→ your gradient
```

### Change Font
Find:
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```
Replace with your font.

### Adjust Spacing
Modify padding/margin values in sections.

---

## Performance Tips

1. **Colors** - Using CSS variables would optimize further
2. **Fonts** - Currently using system fonts (fast)
3. **Images** - Optimize before deployment
4. **Animations** - Hardware accelerated (transform & opacity)

---

## Browser Compatibility

```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Chrome
✅ Mobile Safari
```

---

## CSS File Size

- Current: ~918 lines
- Compressed (minified): ~15KB
- Gzipped: ~5KB (very fast!)

---

## Modifying Layout

### Make Hero Single Column
```css
.hero-content {
  grid-template-columns: 1fr;  /* Change from 1fr 1fr */
}
```

### Make Projects 5 Columns
```css
.project-grid {
  grid-template-columns: repeat(5, 1fr);  /* Change from auto-fit */
}
```

### Remove Animations
```css
* {
  animation: none !important;
  transition: none !important;
}
```

---

## Debugging Tips

1. **Open DevTools** (F12)
2. **Inspect Element** to see current styles
3. **Edit styles live** in DevTools to test
4. **Check computed styles** for actual values
5. **Mobile view** to test responsive

---

## CSS Best Practices (Followed)

✅ Mobile-first approach
✅ Semantic structure
✅ Comments for sections
✅ Consistent naming
✅ No inline styles
✅ Organized by sections
✅ Responsive media queries
✅ Smooth transitions
✅ Hardware acceleration

---

## Common Customizations

### Change Button Color
```css
.btn-primary {
  background: YOUR_COLOR;
}
```

### Change Card Hover
```css
.project-card:hover {
  transform: translateY(-12px);  /* increase from -8px */
  box-shadow: YOUR_SHADOW;
}
```

### Change Section Padding
```css
.about-section {
  padding: 8rem 0;  /* change from 6rem */
}
```

### Change Border Radius
```css
.project-card {
  border-radius: 20px;  /* change from 15px */
}
```

---

**This is your CSS quick reference!** 📚

Check `style.css` for detailed implementation.
