# Website Style Guide — Raspberry & Hazelnut Patisserie

This style guide translates the visual language of the two reference images into a **complete website design system**, with Tailwind CSS as the implementation foundation.

The overall direction is:

> **Elegant patisserie editorial + warm luxury + handcrafted indulgence**

It should feel like a premium European dessert brand rather than a generic bakery or modern SaaS-style food website. The visual identity relies heavily on **warm cream backgrounds, deep chocolate/burgundy typography, refined serif headlines, generous whitespace, thin rules, delicate borders, and large photography**.

---

# 1. Brand personality

### Core characteristics

| Characteristic | Expression |
|---|---|
| Elegant | Serif typography, thin borders, restrained decoration |
| Warm | Cream, beige, caramel and chocolate tones |
| Premium | Large photography, generous whitespace, precise typography |
| Romantic | Small hearts, raspberry red, delicate lines |
| Handcrafted | Textures, crumbs, nuts, imperfect food details |
| European | Editorial layout and German/French-inspired patisserie aesthetic |
| Indulgent | Rich chocolate, cream, raspberry and hazelnut imagery |
| Sophisticated | Avoid excessive gradients, shadows, rounded UI and bright colors |

### The website should **not** feel

- overly minimal/clinical
- childish
- overly pink
- like a generic ecommerce template
- like a tech startup
- overly rustic/farmhouse
- excessively decorative
- saturated or colorful

The visual language is **quiet luxury**, with the food itself providing the visual richness.

---

# 2. Visual concept

The two reference images establish a very clear visual formula:

```text
              TYPOGRAPHY
                   ↓
        LARGE EDITORIAL HEADLINE
                   ↓
        ───────  ♡  ───────
                   ↓
          SMALL DESCRIPTOR
                   ↓
       ┌─────────────────────┐
       │                     │
       │    LARGE FOOD       │
       │    PHOTOGRAPHY      │
       │                     │
       └─────────────────────┘
                   ↓
       FINE DETAILS / LABELS
                   ↓
          DELICATE CTA / COPY
```

For the website, this should translate into:

- oversized serif headlines
- centered compositions
- photography taking up substantial screen real estate
- editorial annotation
- thin lines
- small uppercase labels
- warm monochromatic color palette
- restrained UI

---

# 3. Color system

The most important part of the design system is the **warm neutral foundation**.

The images aren't using a pure white background. Almost everything is shifted toward cream, beige and warm brown.

## 3.1 Primary palette

### Cream

**`cream-50`**

```text
#F8F2EC
```

Main page background.

Use for:

- body
- hero sections
- navigation
- large content sections

---

### Warm Ivory

**`ivory-100`**

```text
#F1E7DE
```

Secondary background.

Use for:

- cards
- product sections
- alternating sections
- footer
- subtle containers

---

### Sand

**`sand-200`**

```text
#E2D2C4
```

Useful for:

- borders
- separators
- muted surfaces
- input backgrounds

---

### Almond

**`almond-300`**

```text
#C9AA91
```

Use sparingly for:

- decorative lines
- secondary accents
- subtle highlights

---

## 3.2 Chocolate palette

### Dark Chocolate

**`chocolate-950`**

```text
#32170D
```

Primary dark color.

Use for:

- body text
- dark sections
- navigation text
- icons
- strong UI elements

---

### Chocolate

**`chocolate-900`**

```text
#4B2415
```

The most important brown.

Use for:

- headings
- primary buttons
- strong labels
- borders on dark designs

---

### Cocoa

**`cocoa-700`**

```text
#6A3823
```

Secondary brown.

Use for:

- secondary text
- decorative details
- hover states

---

### Milk Chocolate

**`cocoa-500`**

```text
#9A6447
```

Use as an occasional accent.

---

## 3.3 Raspberry palette

The raspberry image introduces the second major brand color.

### Raspberry Deep

```text
#7F1F35
```

Primary raspberry.

This should probably become the **brand accent**.

Use for:

- links
- active navigation
- hearts
- small accents
- product category labels
- selected states
- occasional buttons

---

### Raspberry

```text
#A42E48
```

Secondary accent.

---

### Raspberry Soft

```text
#C77A87
```

Use for:

- subtle backgrounds
- hover states
- decorative borders

---

### Raspberry Tint

```text
#F2DEE0
```

Very subtle accent background.

---

## 3.4 Functional colors

These should remain visually integrated with the palette.

### Success

```text
#657052
```

### Warning

```text
#A77A3D
```

### Error

```text
#8C3540
```

Avoid bright Tailwind defaults such as `green-500`, `red-500`, etc.

---

## 3.5 Suggested Tailwind palette

```js
colors: {
  cream: {
    50: '#F8F2EC',
    100: '#F1E7DE',
    200: '#E8DCD2',
    300: '#DCC9BA',
  },

  almond: {
    300: '#C9AA91',
    400: '#B89276',
    500: '#9D7357',
  },

  chocolate: {
    950: '#32170D',
    900: '#4B2415',
    800: '#5A2E1C',
    700: '#6A3823',
    600: '#7C4932',
    500: '#9A6447',
  },

  raspberry: {
    950: '#541322',
    900: '#68182B',
    800: '#7F1F35',
    700: '#913047',
    600: '#A42E48',
    500: '#B94D62',
    300: '#D9A2AB',
    100: '#F2DEE0',
  },
}
```

---

# 4. Typography

Typography is **extremely important** to reproducing the reference aesthetic.

The reference uses a high-contrast editorial serif similar to:

- Didot
- Bodoni
- Cormorant
- Playfair Display
- Libre Baskerville

For the closest web implementation, I would use:

### Display

**Cormorant Garamond**

or, if you want something slightly more luxurious:

**Bodoni Moda**

### Body

**DM Sans**

or:

**Inter**

However, don't make the website feel like a normal Inter-based website. The serif should dominate the visual identity.

---

# 5. Typography hierarchy

## Display XL

Used for the major hero title.

```css
font-family: serif;
font-size: clamp(4rem, 9vw, 9rem);
font-weight: 500;
line-height: 0.85;
letter-spacing: -0.03em;
```

Example:

> HIMBEER  
> RAFFAELLO

Tailwind:

```html
<h1 class="
  font-serif
  text-6xl
  sm:text-7xl
  md:text-8xl
  lg:text-[9rem]
  font-medium
  leading-[0.82]
  tracking-[-0.03em]
">
```

---

## Display Large

```text
56–96px
```

Use for:

- page titles
- collection titles
- major editorial sections

---

## Display Medium

```text
40–64px
```

Use for:

- product names
- section headings

---

## Heading

```text
28–40px
```

---

## Body Large

```text
18–21px
line-height: 1.6
```

Ideal for introductory copy.

---

## Body

```text
16px
line-height: 1.65
```

---

## Small Editorial Label

The reference images use uppercase labels with generous letter spacing.

```text
12–14px
font-weight: 500
letter-spacing: 0.20em
text-transform: uppercase
```

Example:

```html
<span class="
  text-xs
  uppercase
  tracking-[0.2em]
  text-raspberry-800
">
  Tortenausschnitt
</span>
```

---

# 6. Typography rules

### DO

Use:

```text
SERIF
──────────────
for emotional / important content
```

and:

```text
SANS SERIF
──────────────
for functional information
```

### DON'T

Use serif for:

- navigation
- forms
- buttons
- long paragraphs
- technical information

The serif should communicate **emotion and luxury**, not utility.

---

# 7. Letter spacing

The reference images use noticeably generous tracking.

### Editorial uppercase

```text
letter-spacing: 0.18em – 0.25em
```

### Navigation

```text
letter-spacing: 0.08em
```

### Large serif headings

```text
letter-spacing: -0.02em
```

---

# 8. Layout system

The website should use a **wide editorial grid** rather than a conventional ecommerce grid.

Recommended:

```text
max-width: 1440px
```

with:

```text
padding:
mobile: 24px
tablet: 40px
desktop: 64px
```

Tailwind:

```html
<div class="
  mx-auto
  max-w-[1440px]
  px-6
  sm:px-8
  lg:px-16
">
```

---

# 9. Spacing system

Use generous spacing.

The design should breathe.

### Recommended scale

| Token | Value | Use |
|---|---:|---|
| `space-1` | 4px | micro |
| `space-2` | 8px | icon gaps |
| `space-3` | 12px | compact |
| `space-4` | 16px | normal |
| `space-6` | 24px | component |
| `space-8` | 32px | component |
| `space-12` | 48px | section |
| `space-16` | 64px | section |
| `space-20` | 80px | major |
| `space-24` | 96px | major |
| `space-32` | 128px | editorial |
| `space-40` | 160px | hero |

The most important principle:

> **When in doubt, add whitespace.**

---

# 10. Border radius

The reference images are mostly geometric and editorial.

Avoid excessive rounded cards.

### Default

```text
0px
```

### Soft UI

```text
2px
```

### CTA / inputs

```text
9999px
```

or subtle:

```text
4px
```

### Editorial callout

```text
16–24px
```

The outlined box at the bottom of the reference image can use a relatively soft radius.

---

# 11. Borders

Borders should be **thin and delicate**.

Default:

```css
border-width: 1px;
```

Colors:

```text
#DCC9BA
#C9AA91
#7F1F35
```

Never use heavy black borders.

---

# 12. Decorative rules

One of the strongest visual elements in the references is:

```text
────────────  ♡  ────────────
```

This should become a reusable component.

Example:

```html
<div class="flex items-center justify-center gap-6">
  <span class="h-px w-20 bg-raspberry-800/50"></span>

  <span class="
    font-serif
    text-2xl
    text-raspberry-800
  ">
    ♡
  </span>

  <span class="h-px w-20 bg-raspberry-800/50"></span>
</div>
```

On mobile:

```text
──── ♡ ────
```

---

# 13. Photography

Photography should be the **second most important design element after typography**.

The food images in the references have:

- warm lighting
- soft shadows
- beige backgrounds
- shallow depth of field
- tactile textures
- visible crumbs
- imperfect edges
- premium product photography
- centered compositions

---

## Photography color grading

Images should generally lean toward:

```text
Warm
↓
Cream
↓
Caramel
↓
Chocolate
↓
Raspberry
```

Avoid:

- cold white
- blue shadows
- oversaturated colors
- pure white backgrounds
- harsh studio lighting

---

# 14. Image treatment

Images should usually be displayed without borders.

Instead:

```html
<div class="overflow-hidden">
  <img
    class="
      w-full
      object-cover
      transition-transform
      duration-700
      hover:scale-[1.02]
    "
  />
</div>
```

The image itself should provide the richness.

---

# 15. Hero section

The hero should be **editorial rather than conventional marketing**.

Recommended structure:

```text
┌──────────────────────────────────────────────┐
│                                              │
│                    BRAND                     │
│                                              │
│                ─────────────                 │
│                     ♡                        │
│                ─────────────                 │
│                                              │
│              PREMIUM PATISSERIE              │
│                                              │
│          [ LARGE CAKE PHOTOGRAPH ]           │
│                                              │
│              DISCOVER MORE                   │
│                                              │
└──────────────────────────────────────────────┘
```

A hero title could be:

> SWEET  
> **MOMENTS**

with the photography underneath or partially overlapping.

---

# 16. Navigation

Navigation should be very understated.

### Desktop

```text
LOGO          TORTEN     SORTIMENT     ÜBER UNS     KONTAKT
```

Typography:

```text
11–13px
uppercase
letter-spacing: .14em
```

Colors:

```text
chocolate-900
```

Active:

```text
raspberry-800
```

---

## Navigation behavior

Transparent over hero:

```text
background: transparent
```

Scrolled:

```text
background: cream-50
border-bottom: 1px solid almond
```

Transition:

```text
300ms ease
```

Avoid a huge sticky navigation bar.

---

# 17. Logo

The logo should ideally be primarily typographic.

Recommended:

```text
SERIF
```

with a small decorative element.

Example:

```text
        ♡
   PATISSERIE
```

or:

```text
MAISON
[BRAND NAME]
```

The logo should feel like a **European confectionery label**.

---

# 18. Buttons

Buttons should be elegant and restrained.

## Primary

Dark chocolate:

```html
<button class="
  bg-chocolate-900
  text-cream-50
  px-7
  py-4
  text-xs
  uppercase
  tracking-[0.18em]
  transition
  hover:bg-chocolate-800
">
  Entdecken
</button>
```

---

## Raspberry CTA

```html
<button class="
  bg-raspberry-800
  text-cream-50
  px-7
  py-4
  text-xs
  uppercase
  tracking-[0.18em]
  transition
  hover:bg-raspberry-900
">
  Bestellung ansehen
</button>
```

---

## Secondary

```html
<button class="
  border
  border-chocolate-900
  px-7
  py-4
  text-xs
  uppercase
  tracking-[0.18em]
  text-chocolate-900
  hover:bg-chocolate-900
  hover:text-cream-50
  transition
">
  Mehr erfahren
</button>
```

---

# 19. Button philosophy

Avoid:

```text
BUY NOW!!!
```

Prefer:

```text
ENTDECKEN
BESTELLEN
MEHR ERFAHREN
SORTIMENT
ANSEHEN
```

The brand should feel confident enough **not to shout**.

---

# 20. Product cards

Product cards should not resemble typical ecommerce cards.

Instead:

```text
┌─────────────────────────────┐
│                             │
│       PRODUCT IMAGE         │
│                             │
│                             │
└─────────────────────────────┘

KOKOS · HIMBEER

Himbeer Raffaello

€ 42,00

──────────────

ENTDECKEN →
```

No giant shadows.

No excessive rounded corners.

No floating badges everywhere.

---

# 21. Product card typography

Category:

```text
10–12px
uppercase
tracking-[0.18em]
raspberry
```

Product:

```text
32–40px
serif
```

Description:

```text
15–16px
sans
```

Price:

```text
14–16px
medium
```

---

# 22. Product detail pages

Product pages should feel almost like an editorial magazine spread.

Desktop:

```text
┌─────────────────────┬────────────────────────┐
│                     │                        │
│                     │   HIMBEER              │
│      PRODUCT        │   RAFFAELLO            │
│       IMAGE         │                        │
│                     │   ───── ♡ ─────        │
│                     │                        │
│                     │   description          │
│                     │                        │
│                     │   € XX,XX               │
│                     │                        │
│                     │   [ BESTELLEN ]        │
│                     │                        │
└─────────────────────┴────────────────────────┘
```

---

# 23. Editorial ingredient diagrams

The first reference image is especially useful here.

The annotations:

```text
KOKOS-MANDEL
BISKUIT
          ───────── ●
```

can become an actual website component.

For example:

```text
                 ┌──────────────┐
                 │    CAKE      │
                 │              │
                 └──────────────┘
                       │
                       ●
                       │
KOKOS-MANDEL ──────────┘
BISKUIT
```

This would be excellent on a product detail page.

---

# 24. Ingredient section

Recommended design:

### "Was steckt drin?"

Large serif heading.

Then a large cake image with interactive annotations.

Each annotation:

```text
01

HIMBEERMOUSSE
Fruchtig · Cremig · Leicht
```

Use fine dotted lines.

Tailwind:

```html
<div class="
  border-b
  border-almond-300
  py-6
">
```

---

# 25. Section headers

Use a consistent editorial pattern:

```text
KLEINE GENUSSMOMENTE

──────────── ♡ ────────────

Unsere Kreationen
```

The hierarchy is:

1. small uppercase eyebrow
2. decorative divider
3. large serif heading
4. optional description

---

# 26. Example section

```html
<section class="py-24 lg:py-40">

  <div class="mx-auto max-w-3xl text-center">

    <p class="
      text-xs
      uppercase
      tracking-[0.22em]
      text-raspberry-800
    ">
      Unsere Kreationen
    </p>

    <div class="my-6 flex items-center justify-center gap-5">
      <span class="h-px w-16 bg-raspberry-800/40"></span>
      <span class="font-serif text-2xl text-raspberry-800">♡</span>
      <span class="h-px w-16 bg-raspberry-800/40"></span>
    </div>

    <h2 class="
      font-serif
      text-5xl
      leading-none
      text-chocolate-900
      md:text-7xl
    ">
      Mit Liebe gemacht
    </h2>

  </div>

</section>
```

---

# 27. Background strategy

Use alternating warm tones.

Recommended:

```text
Section 1
cream-50

Section 2
ivory-100

Section 3
cream-50

Section 4
chocolate-950

Section 5
cream-50
```

Don't alternate every tiny section.

Large sections should establish rhythm.

---

# 28. Dark sections

Dark chocolate sections are useful for contrast.

Example:

```text
BACKGROUND
#32170D

TEXT
#F8F2EC

ACCENT
#D9A2AB
```

A dark section could contain:

> EIN KLEINES STÜCK  
> **GLÜCK**

with a raspberry heart.

This creates a strong visual break.

---

# 29. Footer

The footer should resemble the back of a luxury packaging box.

Example:

```text
                    ♡

              BRAND NAME

        ─────────────────────

       SHOP       ÜBER UNS
       KONTAKT    INSTAGRAM
       FAQ        VERSAND

        ─────────────────────

           MADE WITH LOVE

             © 2026
```

Background:

```text
chocolate-950
```

Text:

```text
cream-50
```

Accent:

```text
raspberry-300
```

---

# 30. Icons

Icons should be:

- thin
- simple
- elegant
- mostly 1–1.5px stroke

Good icon categories:

- heart
- arrow
- shopping bag
- menu
- search
- plus
- minus
- Instagram

Avoid:

- thick filled icons
- colorful icons
- cartoon icons
- excessive iconography

---

# 31. The heart symbol

The heart is one of the strongest recurring motifs.

Use it as a **decorative signature**, not as a UI gimmick.

Good:

```text
──── ♡ ────
```

Good:

```text
♡
MIT LIEBE
```

Good:

```text
HERGESTELLT MIT ♡
```

Avoid putting hearts everywhere.

---

# 32. Lines and separators

Preferred:

```text
1px
```

with low opacity.

Examples:

```text
border-chocolate-900/20
border-raspberry-800/30
border-almond-300
```

Dotted lines can be used specifically for ingredient annotations.

---

# 33. Shadows

Very subtle.

The reference imagery itself contains soft natural shadows, but UI elements should not have strong shadows.

Preferred:

```css
box-shadow: 0 20px 60px rgba(50, 23, 13, 0.08);
```

Tailwind:

```html
shadow-[0_20px_60px_rgba(50,23,13,0.08)]
```

Avoid:

```text
shadow-lg
shadow-xl
```

on every card.

---

# 34. Forms

Forms should feel like part of a printed order form.

Input:

```html
<input class="
  w-full
  border-0
  border-b
  border-almond-300
  bg-transparent
  px-0
  py-4
  text-chocolate-900
  outline-none
  focus:border-raspberry-800
"/>
```

This is preferable to heavily rounded SaaS-style inputs.

---

# 35. Ecommerce quantity selector

Keep it extremely simple:

```text
       −      2      +
```

with a thin border.

Avoid pill-shaped quantity controls unless the rest of the UI requires them.

---

# 36. Cart

Cart drawer:

```text
┌──────────────────────────────┐
│                              │
│  DEINE AUSWAHL          ×    │
│                              │
│  Himbeer Raffaello           │
│  42,00 €                     │
│                              │
│  ────────────────────────    │
│                              │
│  Zwischensumme               │
│  42,00 €                     │
│                              │
│  [ ZUR KASSE ]               │
│                              │
└──────────────────────────────┘
```

Use cream background rather than white.

---

# 37. Responsive design

The desktop composition should **not simply shrink**.

The mobile version needs its own editorial rhythm.

---

## Mobile hero

Desktop:

```text
HIMBEER
RAFFAELLO
```

Mobile:

```text
HIMBEER
RAFFAELLO
```

still large, but approximately:

```text
56–72px
```

instead of 120px+.

---

# 38. Mobile navigation

Use:

```text
LOGO                         ☰
```

with a full-screen overlay.

The overlay can be:

```text
cream-50
```

with giant serif navigation:

```text
SORTIMENT

TORTEN

ÜBER UNS

KONTAKT
```

This would fit the visual identity extremely well.

---

# 39. Breakpoints

Use standard Tailwind breakpoints:

```text
sm: 640
md: 768
lg: 1024
xl: 1280
2xl: 1536
```

But design primarily around:

```text
mobile
tablet
desktop
```

rather than every breakpoint.

---

# 40. Container widths

Recommended:

```text
prose:
max-w-2xl

standard:
max-w-5xl

wide:
max-w-7xl

editorial:
max-w-[1440px]

full bleed:
w-full
```

---

# 41. Grid system

Use 12 columns on desktop.

```html
<div class="
  grid
  grid-cols-1
  lg:grid-cols-12
  gap-8
">
```

Example:

```text
IMAGE
8 columns

TEXT
4 columns
```

or:

```text
TEXT
5 columns

IMAGE
7 columns
```

This asymmetric editorial layout is preferable to everything being perfectly centered.

---

# 42. Asymmetry

The reference images are centered, but the annotations create asymmetry.

The website can use:

```text
60% photography
40% typography
```

or:

```text
40% typography
60% photography
```

Don't make every section:

```text
50 / 50
```

Variation will make the site feel much more editorial.

---

# 43. Motion design

Animations should be **slow and elegant**.

### Image reveal

```text
700–1000ms
ease-out
```

### Text reveal

```text
500–700ms
```

### Hover

```text
300–400ms
```

Avoid:

- bouncing
- elastic animations
- excessive parallax
- spinning
- rapid transitions

---

# 44. Image entrance animation

A good product image animation:

```text
opacity: 0 → 1

transform:
translateY(30px) → translateY(0)
```

Duration:

```text
900ms
```

---

# 45. Hover interactions

Product image:

```text
scale(1.02)
```

Button:

```text
background transition
```

Links:

```text
underline expands
```

Example:

```html
<a class="
  relative
  inline-block
  after:absolute
  after:bottom-0
  after:left-0
  after:h-px
  after:w-0
  after:bg-current
  after:transition-all
  hover:after:w-full
">
  Entdecken
</a>
```

---

# 46. Accessibility

Despite the luxury aesthetic, accessibility should remain standard.

### Minimum contrast

Body text must have sufficient contrast against:

```text
cream
ivory
```

For example:

```text
chocolate-900 on cream-50
```

is preferred.

Don't use:

```text
almond-300 text on cream-50
```

for important content.

---

# 47. Focus states

Don't remove focus indicators.

Use:

```html
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-raspberry-800
focus-visible:ring-offset-4
focus-visible:ring-offset-cream-50
```

---

# 48. Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable:

- image zoom
- reveal animations
- parallax
- large transforms

---

# 49. Tailwind design tokens

I'd establish the following semantic tokens rather than scattering arbitrary colors throughout the project.

```js
theme: {
  extend: {
    colors: {
      background: '#F8F2EC',
      surface: '#F1E7DE',

      foreground: '#32170D',
      muted: '#6A3823',

      primary: '#7F1F35',
      primaryForeground: '#F8F2EC',

      border: '#DCC9BA',

      chocolate: '#4B2415',
      raspberry: '#7F1F35',
      almond: '#C9AA91',
    },

    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      body: ['DM Sans', 'sans-serif'],
    },

    boxShadow: {
      editorial: '0 20px 60px rgba(50, 23, 13, 0.08)',
    },
  }
}
```

Then components can use semantic classes:

```html
bg-background
text-foreground
bg-surface
text-primary
border-border
```

rather than hardcoded colors everywhere.

---

# 50. Recommended Tailwind typography utilities

Create reusable component classes:

```css
@layer components {

  .eyebrow {
    @apply text-xs uppercase tracking-[0.22em] font-medium;
  }

  .display {
    @apply font-display font-medium leading-[0.88] tracking-[-0.03em];
  }

  .editorial-rule {
    @apply h-px bg-current opacity-40;
  }

  .editorial-link {
    @apply relative inline-block
      after:absolute
      after:bottom-0
      after:left-0
      after:h-px
      after:w-0
      after:bg-current
      after:transition-all
      hover:after:w-full;
  }

  .button-primary {
    @apply inline-flex items-center justify-center
      bg-chocolate
      px-7 py-4
      text-xs uppercase tracking-[0.18em]
      text-background
      transition-colors
      hover:bg-chocolate-800;
  }

}
```

---

# 51. Recommended component library

I would build the site around these components:

```text
Layout
├── Header
├── MobileMenu
├── Footer
│
├── Editorial
│   ├── Eyebrow
│   ├── DecorativeRule
│   ├── SectionHeading
│   ├── EditorialText
│   └── Quote
│
├── Product
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductHero
│   ├── IngredientDiagram
│   ├── ProductGallery
│   └── ProductPrice
│
├── Commerce
│   ├── AddToCart
│   ├── QuantitySelector
│   ├── CartDrawer
│   └── Checkout
│
├── UI
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Modal
│   └── Accordion
│
└── Decorative
    ├── Heart
    ├── Divider
    ├── DottedLeader
    └── ImageFrame
```

---

# 52. Design tokens summary

### Colors

```text
Background
#F8F2EC

Surface
#F1E7DE

Border
#DCC9BA

Chocolate
#32170D
#4B2415
#6A3823

Raspberry
#7F1F35
#A42E48

Almond
#C9AA91
```

### Typography

```text
Display
Cormorant Garamond / Bodoni Moda

Body
DM Sans / Inter
```

### Borders

```text
1px
```

### Radius

```text
0–4px normally
16–24px editorial callouts
```

### Shadows

```text
very subtle
```

### Animation

```text
300–900ms
ease-out
```

---

# 53. Overall page composition

A typical homepage should look approximately like this:

```text
┌───────────────────────────────────────────────┐
│ LOGO       SORTIMENT   ÜBER UNS   KONTAKT     │
├───────────────────────────────────────────────┤
│                                               │
│                                               │
│              KLEINE GENUSSMOMENTE             │
│                                               │
│                  ─── ♡ ───                    │
│                                               │
│             SWEET                            │
│             MOMENTS                          │
│                                               │
│         [ MASSIVE CAKE IMAGE ]                │
│                                               │
│                                               │
├───────────────────────────────────────────────┤
│                                               │
│                UNSERE TORTEN                  │
│                                               │
│            Mit Liebe geschichtet.             │
│                                               │
│      ┌────────┐   ┌────────┐   ┌────────┐    │
│      │ IMAGE  │   │ IMAGE  │   │ IMAGE  │    │
│      └────────┘   └────────┘   └────────┘    │
│                                               │
├───────────────────────────────────────────────┤
│                                               │
│              HIMBEER RAFFAELLO                │
│                                               │
│      [ LARGE IMAGE ]     DESCRIPTION          │
│                           ───── ♡ ─────        │
│                           INGREDIENTS           │
│                                               │
├───────────────────────────────────────────────┤
│                                               │
│                 UNSERE ZUTATEN                │
│                                               │
│             [ INGREDIENT DIAGRAM ]            │
│                                               │
├───────────────────────────────────────────────┤
│                                               │
│                    ♡                          │
│                                               │
│                  BRAND                        │
│                                               │
│        INSTAGRAM · KONTAKT · SHOP             │
│                                               │
└───────────────────────────────────────────────┘
```

---

# 54. Most important design rule

If I had to reduce the entire style guide to one principle:

> **Let typography, photography and whitespace do the work.**

The reference images don't need lots of UI decoration because the **cake photography is extremely tactile and visually rich**.

Therefore the website should deliberately be restrained:

```text
80% warm neutral space
15% photography
5% accent color
```

The raspberry/chocolate accents should feel precious because they aren't everywhere.

---

# 55. What I would specifically avoid

### ❌ Generic Tailwind aesthetic

```text
rounded-xl
shadow-lg
bg-white
text-gray-900
blue-600
```

This will immediately destroy the visual identity.

---

### ❌ Excessive cards

Don't put every piece of content inside:

```text
┌─────────────┐
│   CARD      │
└─────────────┘
```

Instead use whitespace and editorial grouping.

---

### ❌ Pure white

Never make the main background:

```text
#FFFFFF
```

The warm cream is fundamental to the aesthetic.

---

### ❌ Black

Avoid:

```text
#000000
```

Use:

```text
#32170D
```

instead.

---

### ❌ Bright red

Don't use:

```text
#FF0000
```

The raspberry needs to feel like **real fruit**, not a web accent.

---

### ❌ Excessive rounded UI

The product itself is soft and organic; the interface should provide contrast through **structured editorial geometry**.

---

# 56. Final art direction

The finished site should feel like:

**A luxury patisserie magazine that happens to have an ecommerce function.**

Not:

**An ecommerce store that happens to sell cakes.**

That distinction should drive virtually every implementation decision.

The strongest combination is:

> **Bodoni/Cormorant + warm cream + dark chocolate + raspberry + huge food photography + hairline rules + tiny uppercase labels + generous whitespace + subtle motion.**

That will get you very close to the visual language of the supplied references while still giving you a scalable Tailwind design system for the entire website.
