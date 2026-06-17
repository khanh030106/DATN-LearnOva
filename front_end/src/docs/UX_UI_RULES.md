# LearnOva UX/UI Rules

This file documents the current frontend design language in `front_end/src`. Use it when creating new pages or components so the UI continues to feel like the existing LearnOva product. These rules are based on the current React components and CSS files, especially `index.css`, `page/home/**`, `page/login/**`, `component/header/main_header/**`, and `component/footer/**`.

## 1. Project Visual Identity

LearnOva currently feels like a warm, polished online learning platform. The dominant mood is premium education: large photographic hero areas, gold accents, soft ivory backgrounds, serif-like headings in key moments, white cards, subtle shadows, and gentle hover motion.

The most important existing visual references are:

- `page/home/banner/Banner.jsx` and `Banner.css`: full-screen photographic hero with dark navy overlay, white text, gold emphasis, pill CTA, and fade-up text animation.
- `page/login/AuthPage.css`: split login screen with image backgrounds, dark overlays, glass panel, gold CTA, and cream text.
- `page/home/courses/components/CourseCard.css`: white course cards with warm border, image top, strong title, rating row, price, and icon button.
- `page/home/Role/Roles.css`, `page/home/path/Path.css`, `page/home/engagements/Engagements.css`, `page/home/newsletter/Newsletter.css`: warm cards, rounded corners, gold/orange headings, slate/gray body text, and hover lift.
- `component/footer/footer.css`: ivory/gold footer with structured columns, gold link bullets, subscription input, and circular social buttons.

Keep the current vibe: warm, academic, optimistic, premium, image-led, and slightly editorial. Do not introduce a cold SaaS dashboard style or a totally new design system.

## 2. Current Frontend Structure

The frontend uses React with Vite-style entry files:

- `main.jsx` mounts the app.
- `route/AppRoutes.jsx` defines routes.
- `layout/home/HomeLayout.jsx` wraps home pages with `Footer`.
- Shared components live under `component/`.
- Page sections live under `page/home/<section>/`.
- Login page components live under `page/login/conponents/` (note the existing misspelling: `conponents`).
- CSS is colocated with the feature or component. Most components import their own `.css` file.

Use the existing pattern: create a folder for a page section, put `Component.jsx` and `Component.css` together, and import the CSS directly from the component.

## 3. Main Color Palette

### Global Variables

`index.css` defines these variables:

```css
:root {
  --color-primary: #1a2e6e;
  --color-primary-dark: #0f1e4a;
  --color-text: #1a1a2e;
  --color-text-muted: #5a6a9a;
  --color-border: #e8e8e8;
  --color-bg: #ffffff;
  --font-sans: poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-sm: 0.8rem;
  --font-size-base: 1rem;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --max-width: 1280px;
  --header-height: 68px;
  --radius-pill: 999px;
  --radius-md: 8px;
}
```

These tokens exist, but many current components still use direct hex values. Prefer using existing tokens where they match, but preserve the actual shipped colors below when matching current pages.

### Dominant UI Colors

- Gold primary accent: `#E8BE74`, `#e8be74`
- Bright orange/gold headings and CTA accents: `#ffaa16`, `#ffad19`, `#ffa522`, `#ffa107`, `#ffa300`, `#f69800`, `#fe9d00`, `#ffb000`, `#f2b52d`, `#f9a51d`
- Dark navy overlay/base: `rgba(10, 20, 50, 0.65)`, `rgba(10, 20, 50, 0.55)`, `#061733`, `#00206d`, `#00236f`, `#1a2e6e`, `#0f1e4a`
- Cream and ivory surfaces: `#fffaf0`, `#fffdf8`, `#fffcea`, `#fff4df`, `rgba(255, 250, 241, 0.92)`, `rgba(255, 251, 243, 0.94)`
- White surfaces and text: `#ffffff`, `#F8F6F2`
- Dark text: `#1f2937`, `#1e293b`, `#111827`, `#222222`, `#292929`, `#1B140C`
- Muted text: `#64748b`, `#6b7280`, `#60708c`, `#7a8aa6`, `#8492ad`, `#8a7650`, `#7a6b52`, `#9ca3af`
- Warm borders: `rgba(232, 190, 116, 0.22)`, `rgba(232, 190, 116, 0.28)`, `rgba(232, 190, 116, 0.32)`, `#fae4aa`, `#ffc4414f`, `#ffca5278`, `#ffd34f`, `rgb(255 227 189)`, `#ffe5b8`
- Error red: `#ff3434` in `AuthPage.css`.

### Standardization Note

The global variables use navy as primary, but the current home and login UI mostly use gold/orange as the visible brand accent. For new marketing, learning, auth, and home sections, use warm gold/orange as the dominant accent and keep navy for overlays, dark text, or secondary emphasis.

## 4. Typography Rules

Base typography comes from `index.css`:

- `body` uses `font-family: var(--font-sans)`, currently `poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Body line-height is `1.6`.
- Buttons inherit the current font.

Current components should use the shared Poppins stack through `var(--font-sans)` or the exact Chart.js family string where CSS variables are not available.

Rules for future work:

- Use `var(--font-sans)` or inherited font for normal UI, forms, body copy, cards, and controls.
- Use the shared Poppins stack for hero/editorial moments, instructor/profile presentation, and normal UI.
- If matching home section headings, use large, bold orange/gold headings around `38px` to `45px`, or responsive `clamp(2rem, 3vw, 2.8rem)`.
- Body text should usually be `15px` to `19px`, line-height `1.6` to `1.8`, and muted gray/slate/warm-brown.
- Hero titles can use `clamp(2.4rem, 5vw, 4rem)`, `font-weight: 700`, `line-height: 1.25`, white text, and text-shadow.
- CTA/card titles often use strong weights: `700`, `800`, or `900`.
- Uppercase micro labels use small font sizes with letter spacing, for example `0.66rem`, `font-weight: 800`, `text-transform: uppercase`, `letter-spacing: 0.18em` in `.features-badge-label`.

Avoid introducing a new font stack unless the project is explicitly updated to load it.

## 5. Layout Rules

### Page Widths

Use the existing max widths:

- Main wide content: `max-width: 1280px`, seen in `.header-container`, `.features-container`, `.final-cta-container`, `.footer-container`.
- Medium content: `max-width: 1200px`, seen in `.roles-section`, `.learning-container`.
- Narrow centered content: `max-width: 820px` to `900px`, seen in FAQ, instructor headers, newsletter content.
- Testimonials header uses `max-width: 1120px`.

### Home Page

`Home.jsx` renders:

1. `Banner`
2. `.home-content`
3. `Role`
4. `Course`
5. `Path`
6. `Instructors`
7. `Testimonials`
8. `Engagements`
9. `Features`
10. `Newsletter`

`Home.css` currently uses:

```css
.home-content {
  padding: 0 150px;
}
```

For new home sections, keep them visually aligned with this centered, generous spacing. If adding responsive rules, make the padding collapse to `20px` or `16px` on smaller screens, matching existing mobile section padding.

### Section Patterns

Use these dominant section structures:

- `<section className="feature-section">` plus an inner container.
- Header block with title and subtitle, centered or split depending on content.
- Grid or flex layout for repeated cards.
- Cards should have enough bottom padding in grid containers when they lift on hover. Existing grids add `overflow: visible` and `padding-bottom` to prevent clipped shadows.

Examples:

- `.course-section__header` uses `display: flex`, `justify-content: space-between`, `gap: 24px`.
- `.course-section__grid` uses `grid-template-columns: repeat(4, minmax(0, 1fr))`, gap `28px`.
- `.roles-grid` uses 3 columns, gap `32px`.
- `.learning-grid` uses 2 columns, gap `30px`.
- `.instructors-section__grid` uses 4 columns, gap `48px`.
- `.footer-grid` uses `grid-template-columns: 1.25fr 1fr 1fr 1.35fr`.

## 6. Spacing System

Global spacing tokens exist in `index.css`, but current CSS uses direct values. Match the direct values when continuing existing pages.

Common spacing values:

- Page/container side padding: `24px`; mobile: `16px` or `20px`.
- Section vertical padding: `48px`, `64px`, `72px`, `80px`, `96px`.
- Small card padding: `22px`, `26px`, `32px`.
- Large card padding: `40px`, `42px`, `54px`, `56px`.
- Header/content gaps: `22px`, `24px`, `28px`, `30px`, `32px`, `34px`, `48px`, `56px`, `70px`, `80px`, `90px`.
- Form input heights: `45px`, `46px`, `50px`, `52px`, `53px`, `54px`.
- Icon boxes: `42px`, `48px`, `54px`, `56px`, `70px`.

Use generous vertical spacing. This project should not feel cramped.

## 7. Border Radius Rules

Existing radii:

- Pills: `999px`, used for hero CTA, header search, nav underline, final CTA buttons, avatar circles, footer title underline.
- Small controls: `7px`, `8px`, `9px`, `10px`.
- Icon tiles: `10px`, `14px`, `16px`, `20px`.
- Cards: `10px`, `14px`, `15px`, `18px`, `20px`, `22px`.
- Large CTA panels: `28px`, `40px`.
- Circular avatars/icons/social: `50%`.

Rules:

- Use `999px` for pill buttons and rounded search bars.
- Use `8px` to `10px` for inputs and compact buttons.
- Use `14px` to `22px` for standard cards.
- Use `28px` to `40px` only for large feature or CTA panels.
- Course cards currently use a tighter `10px`; do not make them overly rounded.

## 8. Shadow And Elevation Rules

Use soft shadows with low opacity. Existing shadows include:

- Course cards: `0 10px 20px rgb(15 23 42 / 13%)`; hover `0 14px 30px rgba(15, 23, 42, 0.16)`.
- Role cards: `0 15px 45px rgb(0 0 0 / 7%)`; hover `0 20px 60px rgba(0, 0, 0, 0.08)`.
- Learning cards hover: `0 20px 40px rgba(0, 0, 0, 0.08)`.
- Feature media: `0 30px 70px rgba(120, 86, 24, 0.16)`.
- Feature badge: `0 24px 50px rgba(120, 86, 24, 0.14)`.
- FAQ item: `0 14px 34px rgba(120, 86, 24, 0.06)`.
- Newsletter card: `0 22px 60px rgba(15, 23, 42, 0.07)`.
- Login glass panel: `0 24px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)`.

Rules:

- Use warm shadow colors like `rgba(120, 86, 24, ...)` on ivory/gold sections.
- Use slate/black shadows like `rgba(15, 23, 42, ...)` on neutral white cards.
- Hover states usually increase shadow slightly and lift the element.
- Do not use harsh black shadows except on dark image/glass overlays like login.

## 9. Button Styles

### Primary Buttons

Common primary buttons are warm gold/orange:

- Hero: `.home-banner__btn-primary` uses `background: #E8BE74`, `color: #292929`, `border-radius: 999px`, `padding: 14px 36px`.
- Login: `.btn-login` uses `background: linear-gradient(135deg, #E8BE74, #D9A95F)`, `color: #1B140C`, height `53px`, radius `9px`.
- Newsletter: `.newsletter-button` uses `linear-gradient(135deg, #ffb000, #f2b52d)`, white text, height `46px`, radius `8px`.
- Learning path: `.learning-btn` uses `background: #ffa522`, white text, full width, radius `14px`.

Primary button rules:

- Use bold text, usually `font-weight: 700` or `800`.
- Use gold/orange backgrounds or gradients.
- Use white text on brighter orange, dark text on softer gold.
- Hover typically uses `transform: translateY(-2px)` and/or slightly darker background.
- Use `border: none` unless the button is an outline variant.

### Secondary Buttons

Examples:

- `.final-cta-secondary`: transparent background, white border, white text, pill radius.
- `.role-btn`: transparent text button with icon and gap animation.
- `.course-card__cart`: square icon button with warm hover fill.

Secondary button rules:

- Prefer icon+text for navigational actions.
- Use transparent backgrounds for text actions.
- Use outline pills for secondary CTA on solid backgrounds.
- Icon-only buttons should be square, centered, and around `42px` to `45px`.

## 10. Input And Form Styles

### Header Search

`Header.css`:

- `.header-search`: width `230px`, height `42px`, `border-radius: 999px`, transparent white background, gold border, blur.
- `.header-search-input`: transparent, white text, placeholder `rgba(255, 255, 255, 0.72)`.

Use this style only on dark/image headers.

### Login Forms

`AuthPage.css`:

- `.login` is a glass card with `background: rgba(255, 255, 255, 0.10)`, `backdrop-filter: blur(18px)`, border `rgba(255, 255, 255, 0.16)`.
- `.form-field-input` uses height `50px`, radius `8px`, translucent white background, white text.
- Icons inside login fields use gold `.mail-icon { color: #E8BE74; }`.
- Error text uses `.login-error { color: #ff3434; font-size: 14px; font-weight: 500; }`.

Use login form styling only on dark image backgrounds.

### Light Forms

Newsletter and footer forms:

- White form shells.
- Thin warm/neutral borders.
- Radius `7px` to `10px`.
- Placeholder `#9ca3af`.
- Gold/orange submit buttons.
- Mobile forms stack vertically.

## 11. Card Styles

Dominant card patterns:

- White card with warm border and shadow: `.course-card`, `.testimonial-card`.
- Warm ivory card with gold border: `.learning-card`, `.faq-item`.
- Transparent warm tint: `.role-card` uses `background: #ff7d000a` and `border: 1px solid #ffca5278`.
- Glass panel: `.login`.
- Large decorated CTA card: `.newsletter-card`, `.final-cta-card`.

Card rules:

- Use images at the top for content cards when relevant, as in `.course-card__image`.
- Use hover lift for interactive cards: `translateY(-4px)` to `translateY(-10px)`.
- Preserve grid `overflow: visible` and bottom padding when cards animate upward.
- Keep card text hierarchy strong: title dark and bold, metadata muted, price/accent gold.
- Borders should be subtle and warm rather than gray-heavy.

## 12. Header And Navbar Rules

The main header is defined in `component/header/main_header/Header.jsx` and `Header.css`.

Structure:

- `.main-header`
- `.header-container`
- `.logo`
- `.nav-menu`
- `.nav-list`
- `.nav-menu-link`
- `.header-search`
- `.header-section`
- `.header-action-cart`
- `.header-action-login`

Rules:

- Header is `position: sticky`, `top: 0`, `z-index: 1000`.
- It is currently designed to sit over the home banner image through `.home-banner__header`.
- Header background is transparent; use white nav text over dark hero overlays.
- Active nav links use gold `#e8be74` and an underline via `::after`.
- Nav link hover expands underline width from `0` to `100%`.
- Header logo uses `LogoText.png` at height `42px`.
- Mobile behavior wraps content at `860px`; search moves below with `order: 4`.
- Use `NavLink` active class pattern from `NavMenu.jsx`:

```jsx
className={({ isActive }) =>
  `nav-menu-link ${isActive ? "nav-menu-link-active" : ""}`
}
```

If adding a header for a light page, either adapt this carefully or create a modifier class; do not silently change `.main-header` globally because it is tuned for the dark hero.

## 13. Footer Rules

The footer lives in `component/footer/footer.jsx` and `footer.css`.

Rules:

- Use an ivory/gold background:
  `radial-gradient(circle at 92% 90%, rgba(232, 190, 116, 0.26), transparent 24%)`,
  plus `linear-gradient(180deg, #fffaf0 0%, #fdfbf7 55%, #ffffff 100%)`.
- Use `max-width: 1280px`, side padding `24px`.
- Use a 4-column grid on desktop: `1.25fr 1fr 1fr 1.35fr`.
- Collapse to 2 columns at `992px`, 1 column at `640px`.
- Footer section titles are uppercase, small, letter-spaced, and have a gold underline.
- Footer links use a small gold dot before the text and translate right on hover.
- Footer subscription input is a white rounded inline form with gold gradient button.
- Social buttons are circular, gold outline, and invert to gold background with white icon on hover.

## 14. Section Layout Rules

### Hero Sections

Follow `Banner.css` and `AuthPage.css`:

- Use real images from `assets` or suitable image URLs.
- Add dark overlay gradients for legibility.
- Use white/cream text over images.
- Use gold `<em>` or span highlights.
- Prefer centered content for the home hero; split 50/50 image/form only for auth-like pages.
- Add bottom fade to white when the hero transitions into white content, as `.home-banner__bottom-fade`.

### Standard Content Sections

- Centered header with orange/gold title and muted subtitle.
- Grid below the header.
- White or ivory background.
- Generous margins between header and content: `40px` to `90px`.

### CTA Sections

Use either:

- Solid orange panel like `.final-cta-card`, with white text and pill buttons.
- Soft ivory decorated card like `.newsletter-card`, with warm radial gradients and a centered form.

## 15. Icon Usage Rules

Installed icon libraries in `package.json`:

- `lucide-react`
- `react-icons`
- `@fortawesome/react-fontawesome`

Current usage:

- Header: `Search`, `ShoppingCart` from `lucide-react`.
- Home roles/path/features/FAQ/newsletter/login: mostly `lucide-react`.
- Course card: `BiCart` from `react-icons/bi`, `MdAttachMoney` from `react-icons/md`.
- Footer: FontAwesome brand/social icons.
- Login social buttons use SVG assets: `assets/login/Ggoogle.svg`, `assets/login/Facebook.svg`.

Rules:

- Prefer `lucide-react` for new UI icons because most current sections use it.
- Use `react-icons` only when matching an existing course/card icon style.
- Use FontAwesome only in footer/social contexts unless a new section already follows that pattern.
- Icon boxes should be centered flex containers with equal width/height.
- Gold/orange icons on white or ivory backgrounds are the default.

## 16. Animation And Transition Rules

The current UI uses light CSS-only animation:

- Hero text fade-up in `Banner.css`: `bannerTextFadeUp 600ms ease-out forwards` with staggered delays of `0ms`, `150ms`, `300ms`.
- Hover lifts: `translateY(-2px)`, `-4px`, `-6px`, `-8px`, `-10px`.
- Image hover zoom: `.features-image` scales to `1.08`.
- Feature media hover rotates `1.5deg`.
- FAQ opens with `max-height 0.28s ease` and rotates `ChevronDown` `180deg`.
- Testimonials marquee scrolls continuously with `animation: testimonials-scroll 50s linear infinite`, pausing on hover.

Rules:

- Keep animations CSS-only unless a future feature already uses another animation library.
- Animate only `opacity`, `transform`, `box-shadow`, `background`, `border-color`, and `max-height` for FAQ-like reveals.
- Use transition durations around `0.2s`, `0.25s`, `0.3s`, `0.35s`, `0.4s`, or `0.5s`.
- Avoid heavy page-wide motion. The existing feel is smooth and restrained.

## 17. Responsive Design Rules

Existing breakpoints:

- `1200px`: reduce 4-column grids to 2 columns for course/instructor sections.
- `1024px`: reduce header/search sizing and feature card gap.
- `992px`: collapse roles/learning/footer grids.
- `860px`: header wraps; testimonials layout adjusts.
- `768px`: home sections become single-column or reduce heading sizes.
- `640px`: most cards/forms/footers use tighter padding and single-column layouts.
- `520px`: header logo/action sizing adjusts.

Responsive rules:

- Desktop grids can be 4, 3, or 2 columns depending on content.
- Tablet should reduce to 2 columns when cards are compact, or 1 column when cards are wide.
- Mobile should generally be 1 column.
- Mobile side padding should be `16px` or `20px`.
- Forms should stack vertically on mobile, as `.newsletter-form` does at `640px`.
- Keep text readable. Existing mobile headings usually reduce from `40px+` to about `32px` to `34px`.
- Watch `.home-content { padding: 0 150px; }`; new mobile rules may need to compensate if a page starts overflowing.

## 18. Component Naming Conventions

Current component naming:

- React component files use PascalCase: `Banner.jsx`, `Course.jsx`, `CourseCard.jsx`, `LoginForm.jsx`, `SocialLogin.jsx`.
- Some folder names are lowercase (`banner`, `courses`, `features`) and one existing folder is capitalized (`Role`).
- Header/footer shared components live under `component/`, not `components/`.
- Page-specific nested components live in a `components` folder, except login currently uses the misspelled `conponents`.
- Data arrays are often local constants inside the component file: `courses`, `roles`, `paths`, `faqs`, `SLIDES`.

Rules:

- Name new React components in PascalCase.
- Keep section components close to their CSS file.
- Use local data arrays for static section content unless the feature needs API data.
- When adding to login, keep the existing `page/login/conponents` path unless doing an explicit cleanup task.
- Do not rename existing folders/files as part of UI work unless requested.

## 19. CSS Naming Conventions

The project mixes BEM-like and simple scoped class names.

Dominant patterns:

- BEM-like section classes:
  `.home-banner__title`, `.course-section__grid`, `.course-card__footer`, `.instructor-card__avatar-wrapper`
- Simple section-prefixed classes:
  `.roles-section`, `.roles-grid`, `.role-card`, `.learning-card`, `.faq-item`, `.newsletter-card`
- State modifier classes:
  `.nav-menu-link-active`, `.faq-icon-open`, `.faq-content-open`, `.faq-item-open`

Rules:

- Prefix class names with the section/component name.
- Use BEM-like `block__element` when a component has many nested parts.
- Use `-open`, `-active`, or similar suffixes for state classes.
- Avoid generic class names like `.title`, `.button`, `.card` without a section prefix.
- Keep CSS colocated and imported by the component.
- Do not add a global UI framework or utility class system.

## 20. Do And Don't Examples

### Do

- Do use warm gold headings like `#ffaa16`, `#ffad19`, `#f69800`, or `#E8BE74`.
- Do use muted body colors like `#64748b`, `#6b7280`, `#8a7650`, and `#60708c`.
- Do use white/ivory surfaces with warm borders.
- Do use `max-width: 1280px` for wide containers and `padding: 0 24px`.
- Do use hover lifts with `transform: translateY(-2px)` to `translateY(-10px)`.
- Do use `lucide-react` icons for most new controls.
- Do create mobile breakpoints at the existing sizes.
- Do keep new CSS class names section-prefixed.

### Don't

- Don't introduce Material UI, Bootstrap, Tailwind, or another UI library; none is used for styling.
- Don't redesign the visual identity around blue/purple gradients or cold dashboard colors.
- Don't remove the warm/gold education vibe.
- Don't replace page-local CSS with an unrelated architecture unless explicitly requested.
- Don't create generic unscoped CSS class names.
- Don't change existing UI files when the task is only to add a page/component, unless required.
- Don't add heavy JavaScript animation for simple hover or reveal effects.
- Don't use harsh shadows or large black borders on light sections.

## 21. Reusable UI Patterns From Current Project

### Full Image Hero

Files: `page/home/banner/Banner.jsx`, `page/home/banner/Banner.css`

Pattern:

- `<section>` with absolute background image.
- Dark gradient overlay.
- Bottom white fade.
- Centered content.
- Gold emphasized word inside `<em>`.
- Pill primary CTA.
- Staggered CSS fade-up animation.

### Split Auth Page

Files: `page/login/AuthPage.jsx`, `page/login/AuthPage.css`, `page/login/components/AuthBanner.jsx`, `LoginForm.jsx`, `SocialLogin.jsx`

Pattern:

- `.login-page` flex row, each side `width: 50%`, height `100vh`.
- Left side image banner with dark overlay and cream/gold text.
- Right side image background with dark overlay and glass form panel.
- Translucent inputs with icons.
- Gold gradient submit button.

### Course Card

Files: `page/home/courses/components/CourseCard.jsx`, `CourseCard.css`

Pattern:

- `article.course-card`.
- Top image with fixed height `204px`.
- Body with title, teacher, rating, reviews, footer.
- Price in gold/brown.
- Icon cart button.
- Hover lift and stronger shadow.

### Role Card

Files: `page/home/Role/Role.jsx`, `Roles.css`

Pattern:

- Warm tinted card.
- Icon tile.
- Dark navy title.
- Muted body text.
- Transparent text button with arrow icon.
- Hover increases button gap and lifts card.

### Learning Path Card

Files: `page/home/path/Path.jsx`, `Path.css`

Pattern:

- Ivory card with gold border.
- Header row with large icon tile and duration label.
- Vertical steps with circular number badges.
- Full-width orange CTA.

### FAQ Accordion

Files: `page/home/engagements/Engagements.jsx`, `Engagements.css`

Pattern:

- Warm card item.
- Full-width transparent button.
- Question left, chevron right.
- Open state toggles `faq-icon-open` and `faq-content-open`.
- Answer reveals through `max-height`.

### Newsletter Card

Files: `page/home/newsletter/Newsletter.jsx`, `Newsletter.css`

Pattern:

- Centered decorated card.
- Ivory/white gradient with warm radial accents.
- Circular gold icon.
- Large dark heading with gold span.
- Inline email form that stacks on mobile.

## 22. Checklist Before Creating A New Page Or Component

- Confirm whether the page belongs under `page/home`, `page/login`, or a new page folder.
- Check for an existing similar component before creating a new pattern.
- Use colocated CSS and import it from the component.
- Use section-prefixed class names.
- Match the warm gold/ivory/white/slate palette.
- Use `lucide-react` icons unless matching a footer or course-card pattern.
- Use the existing container widths: `1280px`, `1200px`, or `820px` to `900px`.
- Add responsive rules for `1200px`, `992px`, `860px`, `768px`, `640px`, or `520px` as relevant.
- Add hover states for interactive cards/buttons.
- Keep animations subtle and CSS-only.
- Avoid changing shared header/footer styles unless the change is intended to affect every page.
- Verify mobile layout does not overflow, especially because `.home-content` currently has `padding: 0 150px`.
- Do not install new UI libraries.

## 23. Standardization Opportunities

These are not required changes, but future agents should be aware of them:

- The global `:root` tokens in `index.css` do not fully represent the dominant warm gold UI. A future design-token cleanup could add gold, ivory, muted slate, and warm shadow variables.
- Font usage has been standardized on `--font-sans`: `poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Some comments in CSS show encoding issues. Avoid copying those comments into new files.
- Folder naming is inconsistent (`component`, `components`, `conponents`, `Role`). Follow the nearby local convention instead of broad renaming.
- Several CSS files repeat `* { box-sizing: border-box; }` even though `index.css` already defines it. New component CSS does not need to repeat it.
