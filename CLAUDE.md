# NIL FARASOYE PARS (NFP): project notes for Claude Code

Corporate website / international business showcase. Goal: trust, introductions and business inquiries.
There is NO online selling (no cart, no payment). Primary CTA: partnership / quote requests.

## Stack
- Next.js 16 (App Router, `cacheComponents` + `partialPrefetching` on), React 19, TypeScript.
- SCSS modules (`sass`), GSAP + `@gsap/react` for animation, `react-hook-form` + `zod` for forms, `@react-icons/all-files` for icons.
- No `next-intl`: a small custom i18n (see below). No database. Contact e-mail goes through the Resend REST API.
- Windows + PowerShell + WebStorm. Reply to the owner in Persian unless asked otherwise.

## Design source (Figma file key `piGCqiUYU9SGlSSA89MxpF`, page "UI")
- Desktop 1920 canvas, 1520 container, 200 gutters, header 80, section gap 120. Phone design 390.
- Frames: Home EN 170:3031, FA 319:10449, AR 170:3393, ZH 170:3755. About 90:1015. Contact 149:3693.
  Products 312:8518. Product detail 325:13701.
  Phone frames: home 312:8797, about 319:10818, contact 321:11775, products 323:12614, product detail 328:599.
- The Persian frames are the real design (right-to-left); the English pages follow the English frames where they exist.
- Colour/size tokens live in `src/styles/_variables.scss` (burgundy #8F1D2C nav, wine #7B1726 actions, gold #B99746, charcoal #141414 ...).

## Layout of the code
- Routes: `src/app/[locale]/(page|about|contact|products|products/[slug])`, API `src/app/api/contact/route.ts`, `sitemap.ts`, `robots.ts`.
- Content per language: `src/content/<locale>/` (home, about, contact, products, product-details). `src/content/index.ts` has `getContent(locale)`.
  Every language must satisfy the English `Content` type. Image paths are shared in `src/content/images.ts`.
- i18n: `src/i18n/config.ts` (locales, dir, names), `src/proxy.ts` (redirect `/x` to `/<locale>/x`, cookie NEXT_LOCALE),
  `LocaleLink` (use it instead of `next/link`), `LanguageSwitcher`, `pageMetadata()` in `src/lib/metadata.ts` (canonical + hreflang).
- Components: `src/components/{layout,home,about,contact,products}`; each page has its own `*.module.scss`.

## Rules we agreed on (do not undo)
1. Never replace a file the owner has edited without reading the current version first and keeping their changes.
   ProcessSection (GSAP hook, SPEED / LIFT / GRAB_EASE constants, card pick-up effect) is customised: do not revert it.
2. Section spacing = `margin-top` on the section's own class. Container classes use `margin-inline` / `padding-inline` only.
   (A shorthand `.wrap` from another module used to wipe out section padding.)
3. CSS modules: no bare element selectors (`img {}` fails with "Selector is not pure"); always use a class.
4. Breakpoints: phone/tablet <= 900 (`mobile` mixin, `$bp`), laptop 901-1279, desktop >= 1280, tiny <= 359. No separate tablet design exists.
5. RTL: logical CSS properties (`inline-start/end`, `text-align: start/end`). Blocks that are laid out the same left/right in the Persian
   and English designs carry `data-keep-layout` (direction ltr on the block, rtl for its children; see `globals.scss`). No `letter-spacing` in RTL.
   `.hook` (GSAP) uses physical left/x on purpose.
6. Fonts: Peyda (Persian, `src/assets/fonts`, not preloaded) and Open Sans (Latin). One font rule per language in `globals.scss`.
7. The `data-reveal` / `data-stagger` / `data-hang` / `data-count` attributes are consumed by `PageAnimations`.

## Content status (drafts, do not present as facts)
- Product details, team members, stats (+52 / +103 / +12 / +77) and FAQ answers are sample/draft text. Never invent brands, prices or certificates.
- Phone/hours differ between Contact and Footer in the design: ask the owner which is real before launch.
- Persian text comes from the Figma frames where available; the rest is a draft translation.
- Figma has designer copy for Arabic and Chinese home pages. The original brief listed fa, ur, zh, de (+ en): the final language set is undecided.

## Commands
- `npm run dev`, `npm run build`, `npx tsc --noEmit`
- Env: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (see `.env.example`).
- Do not commit `*.zip` or `src/src.zip`.
