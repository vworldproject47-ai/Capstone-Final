# Ryan Jackson — Personal Portfolio (Capstone)

A three-page personal portfolio for Convergent Frontier Research (CFR),
built with semantic HTML, responsive CSS, and vanilla JavaScript, and
deployed live on GitHub Pages.

## Pages

- **index.html** — Home / welcome
- **projects.html** — Current projects, with a working category filter
- **about.html** — About me + accessible contact form

## Accessibility fixes

- **Missing "skip to main content" link** — added a `.skip-link` as the
  first focusable element on every page so keyboard users can bypass
  the header/nav.
- **Low-contrast text** — the copper accent color (`#C97A3D`) only
  reaches about 3.3:1 contrast against white, so it's used only for
  borders and focus outlines (non-text elements only need 3:1). All
  readable text uses the dark ink color on the light paper background,
  which passes at roughly 12:1.
- **Missing form labels** — every input in the contact form has a
  `<label for="">` explicitly tied to its `id`, instead of relying on
  placeholder text.
- **Ungrouped radio buttons** — the "Reason for contact" radio group is
  wrapped in a `<fieldset>` with a `<legend>` so screen readers
  announce the group's purpose.
- **No visible keyboard focus state** — added a visible focus outline
  (`outline: 3px solid`) on all links, buttons, and form fields.
- **Missing `aria-current` on navigation** — the active page link in
  the nav has `aria-current="page"` so assistive tech announces which
  page the user is on.
- **Form errors indicated by color alone** — error states pair a red
  border with actual error text (`.error-text`) linked via
  `aria-describedby`, and `aria-invalid` is set/cleared on submit, so
  errors aren't communicated by color alone.




  ### WAVE results

Ran WAVE (wave.webaim.org) against the live GitHub Pages URL for all
three pages.

- **index.html:** 0 errors, 0 contrast errors, 0 alerts. AIM Score 10/10.
- **projects.html:** 0 errors, 0 contrast errors, 0 alerts. AIM Score 10/10.
- **about.html:** 0 errors, 0 contrast errors, 0 alerts. AIM Score 10/10.

All text/background color combinations meet WCAG AA (4.5:1 for normal
text, 3:1 for large text/UI elements). No fixes were needed — the
existing color system (dark ink on light paper, copper accent
restricted to borders/focus states) already satisfied AA contrast on
every page.
  


All text/background color combinations meet WCAG AA (4.5:1 for normal
text, 3:1 for large text/UI elements).

## Visual design — Gestalt principles

- **Proximity** — project cards sit in a tight grid with small,
  consistent gaps, while whole sections (Projects vs. About vs.
  Contact) are separated by much larger spacing, so related items read
  as one group at a glance.
- **Similarity** — every project card shares the same shape, border
  accent, and heading style, signaling that they're all the same
  category of content even though their text differs.

Color palette (deep indigo `#1F2A44` + warm copper `#C97A3D`) is
defined once in CSS custom properties in `style.css` and reused
unchanged across all three pages.

## Responsive breakpoints (two @media queries)

- **`@media (min-width: 700px)`** — switches the project grid from a
  single column to two columns once there's enough horizontal space;
  baseline layout for desktop/tablet widths (tested at 1200px).
- **`@media (max-width: 480px)`** — tuned for narrow phone screens
  (tested at 320px). Stacks the nav links vertically, shrinks the
  header title and body headings, tightens side padding on `main`, and
  makes buttons full-width so they're easier to tap without
  introducing horizontal scroll.

Both breakpoints were tested in Chrome DevTools' device toolbar at
320px and 1200px with no horizontal scrolling or broken layout at
either width.

## JavaScript interactions

All JavaScript lives in `script.js`, loaded on every page. Each block
checks that its elements exist before running, since not every page
has every feature.

**1. DOM manipulation — project filter (`projects.html`)**
Three filter buttons (All / Vehicles / Derivative Applications) use
`querySelectorAll` + `addEventListener('click', ...)` to show/hide
project cards by toggling the `hidden` attribute — no page reload.
`aria-pressed` is updated on the buttons so screen reader users know
which filter is active. Since the filters are real `<button>`
elements, they're keyboard-focusable and operable with Enter/Space
with no extra work.

**2. Form validation — `about.html` contact form**
- Submission is blocked (`e.preventDefault()`) if any required field
  is empty or the email fails a basic pattern check.
- Errors are shown as visible text in the DOM (`.error-text`), tied to
  each field via `aria-describedby` — never `alert()`.
- Each field has an `input` listener that clears its error the moment
  the user corrects it, rather than waiting for another submit
  attempt.

## File structure

```
/
├── index.html
├── projects.html
├── about.html
├── style.css
├── script.js
└── README.md
```
