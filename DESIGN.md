---
name: Tushar Kanjariya Portfolio
description: A quiet systems studio for an experienced full-stack developer and technical writer.
colors:
  neutral-canvas: "#f4f3ef"
  clear-white: "#ffffff"
  carbon-ink: "#11110f"
  utility-gray: "#696962"
  structural-line: "#11110f29"
  systems-blue: "#2f5bff"
  blue-surface-text: "#eef1ff"
  signal-lime: "#d9ff57"
  form-error: "#ffb4aa"
  portrait-neutral: "#d9dad7"
  archive-lilac: "#d9d0ff"
  archive-sky: "#b9dcff"
  archive-mint: "#c6f5dd"
typography:
  display:
    fontFamily: "Hanken Grotesk, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Hanken Grotesk, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(3rem, 5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 0.97
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Hanken Grotesk, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.875rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Hanken Grotesk, Segoe UI, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, Segoe UI, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
  accent:
    fontFamily: "Source Serif 4, Georgia, Times New Roman, serif"
    fontWeight: 400
rounded:
  square: "0px"
  feature: "18px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  xxxl: "64px"
  display-gap: "96px"
  section-airy: "clamp(112px, 10vw, 144px)"
  section-standard: "clamp(88px, 8vw, 120px)"
  section-compact: "clamp(64px, 6vw, 96px)"
components:
  button-primary:
    backgroundColor: "{colors.carbon-ink}"
    textColor: "{colors.clear-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.systems-blue}"
    textColor: "{colors.clear-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.neutral-canvas}"
    textColor: "{colors.carbon-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  credential-card:
    backgroundColor: "{colors.clear-white}"
    textColor: "{colors.carbon-ink}"
    rounded: "{rounded.feature}"
    padding: "32px"
  writing-card:
    backgroundColor: "{colors.neutral-canvas}"
    textColor: "{colors.carbon-ink}"
    rounded: "{rounded.square}"
    padding: "32px"
  input-dark:
    backgroundColor: "{colors.carbon-ink}"
    textColor: "{colors.clear-white}"
    rounded: "{rounded.square}"
    padding: "8px 0 16px"
---

# Design System: Tushar Kanjariya Portfolio

## Overview

**Creative North Star: "The Quiet Systems Studio"**

The system presents senior engineering ability through calm precision. Expansive spacing, decisive typography, strong alignment, and a limited palette allow experience and proof to lead. The composition is quiet at rest and becomes responsive only when the visitor interacts.

The visual direction follows the Quiet Systems Studio while borrowing the structural discipline of the Precise Workshop. It should feel authored by an experienced developer with professional design judgment: technically exact, visually restrained, and confidently approachable. It explicitly rejects flashy or excessive animation, dense sections, information overload, generic portfolio templates, overly playful or casual styling, and cold or impersonal corporate presentation.

**Key Characteristics:**

- Spacious, asymmetric composition with rigorous alignment.
- Large, controlled typography with a maximum display size of 96px.
- Flat surfaces that gain depth only to clarify interaction.
- Neutral surfaces carry the layout; Systems Blue is reserved for hierarchy, focus, and decisive interaction.
- Subtle motion that feels buttery-smooth without demanding attention.
- Responsive reflow that preserves hierarchy across every device size.

**The Quiet-at-Rest Rule.** Nothing moves merely to decorate the page. Motion appears only to reveal hierarchy, acknowledge input, or clarify a destination.

## Colors

The Systems palette combines a soft neutral canvas with Carbon Ink, a confident cobalt accent, and a rare lime signal. Neutral surfaces carry the page so color remains meaningful.

### Primary

- **Systems Blue:** The principal expression of technical confidence. Use it for highlighted words, active links, focus emphasis, and decisive hover states—not full-page or full-section fills.

### Secondary

- **Signal Lime:** A scarce action signal used on dark or blue surfaces, high-value hover reveals, and editorial emphasis. Its rarity is the point.

### Tertiary

- **Archive Lilac, Archive Sky, and Archive Mint:** Quiet historical accents reserved for previous design-work imagery. They must not compete with current engineering content.

### Neutral

- **Neutral Canvas:** The default page surface, supporting long-form readability and generous whitespace.
- **Carbon Ink:** Primary text, dark sections, and the strongest button surface.
- **Clear White:** Content on saturated or dark surfaces and clean credential cards.
- **Utility Gray:** Secondary copy, dates, metadata, and supporting descriptions.
- **Form Error:** A restrained coral used only for explicit validation borders and messages on Carbon Ink.
- **Structural Line:** Low-contrast dividers that organize information without creating boxes everywhere.
- **Portrait Neutral:** The restrained image surround used behind the hero portrait.

**The Two-Signal Rule.** Systems Blue communicates authority; Signal Lime communicates an immediate interactive or editorial highlight. Never assign either color decoratively.

**The Archive Containment Rule.** Pastel archive colors stay inside the previous-design-work section. They never become global brand accents.

**The Restrained-Primary Rule.** The hero and capabilities use neutral surfaces. Systems Blue highlights the end-to-end promise and structural labels; Carbon Ink carries the main statement and proof. Primary color should guide attention, not become the canvas.

## Typography

**Display Font:** Hanken Grotesk variable with Segoe UI and Arial fallbacks  
**Body Font:** Hanken Grotesk variable with Segoe UI and Arial fallbacks  
**Accent Font:** Source Serif 4 Italic with Georgia and Times New Roman fallbacks

**Character:** Hanken Grotesk is precise, grounded, and capable: engineered enough for a senior developer, but human enough for a technical writer. It is delivered as a variable web font with `display=swap`; Segoe UI and Arial provide resilient fallbacks. Source Serif 4 Italic appears only as a restrained human counterpoint inside selected display phrases, with Georgia and Times New Roman as resilient fallbacks; it never becomes a second editorial identity.

### Hierarchy

- **Display** (700, fluid 3.25–6rem, 0.95): The hero and the single dominant message of a viewport.
- **Priority headline** (600, fluid 3.25–5rem, 0.97): Experience and Recent Writing only.
- **Headline** (600, fluid 3–4.5rem, 0.97): Supporting section headlines with balanced wrapping and no forced line breaks.
- **Title** (600, fluid 1.75–2.875rem, 1.06): Timeline roles, writing titles, and major card headings.
- **Body** (400, 1rem, 1.5): Explanations and supporting narrative, generally limited to 65–75 characters per line.
- **Lead** (400–500, 1.125rem, 1.5–1.55): Short explanatory copy and dark-surface narrative.
- **Label** (600, 0.75rem, 0.1em tracking, uppercase): True metadata and navigation cues only. Secondary Connect, Archive, and Contact labels use natural case at 0.875rem.
- **Accent** (400, contextual display size): A small number of italicized words inside major statements.

**The Seniority Scale Rule.** Large type communicates confidence only when spacing and line breaks remain controlled. Display text never exceeds 96px or tightens beyond -0.04em.

**The Priority Ladder Rule.** Hero is the only 96px display role. Experience and Recent Writing form the second tier; supporting and utility sections remain visibly quieter on desktop and mobile.

**The One-Accent Rule.** Source Serif 4 Italic may emphasize a phrase, never an entire heading, section, or body paragraph.

## Layout & Rhythm

The page uses a 12-column desktop guide and a semantic 4px-based spacing scale. Major proof sections use the airy section interval, narrative sections use the standard interval, and utility or historical sections use the compact interval. This keeps Experience and Recent Writing dominant while preventing Connect and the design archive from stretching the page unnecessarily.

- **Airy:** Hero transitions, Experience, and Recent Writing.
- **Standard:** Capabilities and engineering approach.
- **Compact:** Connect, archive, contact details, and footer utility.
- **Responsive:** Below 900px, complex grids become one-dimensional reading flows; writing, connect, and archive become single-column by 720px.
- **Device edges:** Page gutters, the fixed header, hero, mobile menu, and footer honor `env(safe-area-inset-*)` without widening the visual measure on ordinary screens.
- **Short landscape:** At 900px wide or less and 600px high or less, the mobile menu becomes vertically scrollable, tightens its type and spacing, and returns its contact footer to document flow so destinations never overlap.

Interactive text targets keep a minimum 44px hit area on touch-oriented surfaces. Desktop navigation preserves its compact visual rhythm for fine pointers and expands to the same minimum target size when the primary pointer is coarse.

**The Priority-through-Space Rule.** Use more space around hiring proof and current writing than around utility links or historical work. Do not apply one universal section interval to the entire page.

## Distillation

The page follows one conversion path: establish seniority, prove it through experience, show the breadth behind delivery, surface current writing, and make contact easy. Supporting material remains available without competing with that path.

- The hero keeps the portrait and current-role panel; the separate metric panel, credibility strip, and manifesto were removed because they repeated the same 6+ years and end-to-end ownership claims.
- Capabilities retain every named technology, tool, and working practice in three concise groups. Self-assessed percentage chips were removed because the career timeline and shipped-work narrative are stronger evidence.
- About keeps the ownership, product-judgment, writing, and team-communication story. Location and education remain in the hero and Experience section; birth date was removed because it does not help a hiring decision.
- Recent Writing presents three articles and keeps the Medium destination as the complete archive.
- Connect shows Email, LinkedIn, GitHub, and Medium immediately. Substack, Reddit, daily.dev, Benable, Dribbble, Behance, and Skype remain available through the native “More places” disclosure.
- Footer social links were removed as duplicates; the Connect section is their single source of truth.

**The One-Path Rule.** Every section must either establish seniority, provide proof, extend the writing audience, or make professional contact easier. Secondary destinations use progressive disclosure rather than competing with the primary path.

## Elevation

The system is flat by default. Borders, tonal surfaces, color blocks, and spacing establish hierarchy at rest. Credential cards remain physically grounded and use only a subtle background-color shift on hover or keyboard focus; shadows remain reserved for archive images that need to read as physical artifacts.

### Shadow Vocabulary

- **Archive artifact:** `0 20px 55px rgba(17,17,15,.18)` separates an interface screenshot from its pastel presentation field.

**The Flat-by-Default Rule.** Every surface begins flat. If a shadow is visible without interaction or a physical-artifact reason, remove it.

**The Motion-before-Shadow Rule.** Prefer a small transform, color transition, or underline reveal before introducing new elevation.

## Motion

Motion is concentrated into one rehearsed hero entrance and a small feedback layer. The hero sequence introduces the header, professional label, primary statement, supporting copy, portrait, and current-role panel with individual entrances capped at 650ms and the full sequence settled within 800ms. It runs once and never blocks interaction.

Narrative sections use a quiet crossfade. Repeated proof or destination items may use a short 45ms sibling stagger, capped at 270ms, with timeline rows and cards moving no more than 20px. The mobile menu stages its destinations briefly so opening order and focus remain obvious.

All animated content remains visible by default. Motion is enabled only when JavaScript and Intersection Observer are available, and `prefers-reduced-motion: reduce` disables choreography, smooth scrolling, and the scroll-progress treatment.

**The One-Choreography Rule.** The hero owns the expressive entrance. Down-page animation clarifies grouping or interaction and must not repeat the hero’s drama.

## Delight

Delight is practical and professional: it should reward attention or remove friction without becoming a spectacle. The current-role panel includes Jamnagar local time as useful context for remote teams. The contact area provides one-click email and phone copy actions with clear, live-announced success states. The wordmark dot responds with a small motion that rewards close attention without competing with navigation.

**The Useful-Surprise Rule.** A delightful moment must either make professional contact easier, provide relevant context, or reward deliberate exploration. It must settle in under one second, preserve keyboard access, and disappear under reduced-motion preferences.

## Resilience

Core navigation and contact paths remain usable when enhancement features are unavailable. Mobile visitors without JavaScript receive a compact in-page navigation fallback, while the contact form retains a native mail action and HTML constraints. With JavaScript enabled, validation errors appear beside their fields, the first invalid field receives focus, repeated submission is guarded, and a recovery panel lets visitors copy a complete ready-to-send enquiry when no email application opens. Mobile navigation transfers focus to the destination heading so visual position and assistive-technology context stay aligned.

Long content is allowed to wrap inside every major grid item, image dimensions reserve layout space, below-the-fold images decode lazily, and forced-colors mode removes decorative surfaces while preserving borders and focus indicators.

**The Recoverable-Core Rule.** Contact and navigation must never depend on animation, Clipboard APIs, `Intl`, or one successful script path. Enhancements may fail independently without hiding content or removing the visitor’s next action.

## Components

### Buttons

Buttons are compact, confident, and magnetically responsive on fine pointers.

- **Shape:** Full pill with a 48px minimum height and 24px horizontal padding.
- **Primary:** Carbon Ink with Clear White text; Systems Blue on hover.
- **Light:** Clear White on dark surfaces; Signal Lime on hover.
- **Outline:** Transparent against the current surface with a one-pixel Carbon Ink border; fills with Carbon Ink on hover.
- **Hover / Focus:** Lift by no more than 2px, move the directional arrow by 4px, and retain a clear keyboard focus indication.

### Chips

Proficiency chips are informational, not interactive.

- **Style:** Transparent on Systems Blue, one-pixel translucent white border, 8px by 12px padding, and pill geometry.
- **State:** No selected state and no decorative shadow.

### Cards / Containers

Cards are used only when an item is genuinely self-contained.

- **Credential cards:** Clear White, 18px corners, 32px padding, and physically flat at rest and during interaction. Hover and keyboard focus change only the surface tint.
- **Writing cards:** Square, rule-separated cells rather than floating cards. Hover uses a smooth bottom-up Carbon Ink reveal with coordinated internal movement.
- **Archive media:** 18px presentation fields containing real project imagery; pastel color remains contained within the media field.
- **Structural sections:** Use dividers and spacing rather than rounded containers.

### Inputs / Fields

Inputs are quiet underline fields on Carbon Ink.

- **Style:** Transparent background, square corners, 22px input text, and a one-pixel translucent underline.
- **Focus:** The underline and label shift to Signal Lime; the label moves upward by only 2px.
- **Error / Disabled:** Preserve readable text and expose state with explicit copy, not color alone.

### Copy Email

Contact copy utilities are compact outlined pills with 44px minimum targets. Hover and focus use Signal Lime; successful copying changes both label and icon, announces the email or phone result through its own ARIA live region, and returns to rest after 1.8 seconds. The interaction works in hosted secure contexts and direct local previews.

### Contact Recovery

The primary static-site handoff remains transparent: submission opens a prepared email rather than claiming server delivery. If the operating system has no mail handler, an inline recovery panel appears with one explicit action to copy the recipient, subject, sender details, and message for pasting into any webmail service. The panel remains hidden until needed and is announced through the existing form status region.

### Navigation

The fixed navigation uses the neutral canvas with a translucent blur treatment, a centered link group, and a dark pill contact action. Links reveal a one-pixel underline. Below 900px, navigation becomes a full-screen menu with large, readable destinations and an explicit close state. On short landscape screens the menu scrolls independently, reduces each destination to a 52px minimum row, and places contact details after the destinations instead of pinning them over content.

### Experience Timeline

The timeline is the signature proof component. The current role is a full Carbon Ink proof row with Signal Lime destination emphasis; earlier roles remain flat and rule-separated. Hover or keyboard focus introduces a decisive Systems Blue wash, a directional arrow, and coordinated horizontal movement. On coarse pointers, the movement and decorative arrow are removed while the content remains complete.

### Recent Writing

Writing entries behave as editorial links without adopting a magazine aesthetic. The newest article occupies the dominant left column on wide screens while the remaining entries form a compact reading stack; all return to a single-column flow by 720px. Their dark surface rises from the bottom over 580ms using an ease-out curve, while metadata, title, description, and arrow move as one quiet sequence. Keyboard focus receives the same meaningful state as hover.

## Do's and Don'ts

### Do:

- **Do** use spacious composition and strict alignment to communicate professional maturity.
- **Do** make experience, full-stack ownership, certification, and writing easy to scan in that priority order.
- **Do** reserve Systems Blue for authority and Signal Lime for rare, meaningful emphasis.
- **Do** keep components quiet at rest and responsive during hover, focus, or direct manipulation.
- **Do** preserve WCAG 2.2 AA contrast, keyboard navigation, semantic structure, and reduced-motion behavior.
- **Do** reflow grids into clear single-column reading order on small screens without shrinking essential text below comfortable sizes.

### Don't:

- **Don't** use flashy or excessive animation; every motion must clarify hierarchy, feedback, or navigation.
- **Don't** create dense sections or information overload; split content and preserve breathing room.
- **Don't** imitate generic portfolio templates or repeat identical floating-card grids.
- **Don't** introduce overly playful or casual styling, novelty cursors, elastic motion, or decorative effects that weaken seniority.
- **Don't** create cold or impersonal corporate presentation; retain the portrait, direct first-person voice, writing, and small human typographic accents.
- **Don't** turn every section label into a repeated decorative eyebrow or use numbered scaffolding where sequence has no meaning.
- **Don't** exceed 96px display type, tighten display tracking beyond -0.04em, or allow headings to overflow their containers.
- **Don't** add persistent shadows, decorative glass panels, gradient text, or colored side-stripe borders.
