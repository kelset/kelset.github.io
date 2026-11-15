# Product

## Register

brand

## Users

People who just met Lorenzo somewhere else and want the fuller picture: hiring managers and collaborators doing diligence, engineers who knew him as a React Native maintainer, conference attendees and organizers who saw a talk, podcast listeners arriving from debug:mind. Mostly one short visit on a phone (from a talk bio, a CV link or a social profile), plus a smaller group of long-form readers who come back for the blog. The job to be done: "make a decade of shipping legible in ninety seconds, and give me a reason to stay for an article."

## Product Purpose

kelset.dev is Lorenzo Sciandra's landing spot: the place people arrive to learn who he is and to find everything he has made — the writing, the talks, the podcast, the side projects, the socials. Success: a visitor leaves able to say what Lorenzo does (builds the harnesses, tooling and infrastructure that let teams ship faster), what came before (six-plus years as a React Native community maintainer and release lead), what he cares about (open source sustainability, mental health in tech), and how to reach him — and has found at least one thing worth reading or watching. The site itself demonstrates the engineering standards it claims: instant loads, flawless accessibility.

**It is not a CV.** An earlier pass mirrored the CV entry for entry (bullets under each job, a skills list, a "record" page) and Lorenzo pulled it back: nobody should be able to generate his CV from his website. The map shows where and when; the detail of what he did at each stop stays in the document he sends to people who ask.

## Positioning

- **One borrowed sentence.** The CV's summary is the home page's lede, word for word. Nothing else is taken from it.
- **Infrastructure for shipping.** Harnesses, tooling and infrastructure that let teams ship faster is the present tense; agents are part of that, not the headline.
- **React Native is track record, not identity.** It reads as ecosystem-scale open-source leadership ("community maintainer and release lead"), never as "React Native developer", and never as "core maintainer".
- **One through-line.** Running an ecosystem's releases and building an org's harnesses are the same skill: the processes and tooling that let many people ship faster and more safely. He builds the track, not the train. The map draws exactly that.
- **Shopify: public things only.** A two-sentence "Now" and links to what has already been published elsewhere.

## Brand Personality

Candid, hands-on, community-warm. Lorenzo's writing voice is conversational and honest (therapy jokes, "welp", emoji as punctuation) while the substance is heavyweight. The site's own copy is the opposite of chatty: **dry, short and factual**, one line per fact, in the CV's register. The personality comes from the design (colour, scale, the doodle, the boop) and from his posts, not from clever microcopy. Emotional goals: trust, warmth, "this person ships and is a human about it."

## Anti-references

- The old Congo/Hugo profile-card template: competent, anonymous, interchangeable.
- A dev-tool costume. Three earlier versions dressed the site as a changelog, as release notes, then as a code-hosting profile; each ended up dense, mono and dashboard-like. The site is not an imitation of a developer product.
- Cold hacker/terminal aesthetics (green-on-black, scanlines, cursor blinks).
- Corporate portfolio gloss: hero metrics, testimonial carousels, "let's work together" CTAs.
- Transit *props*. The map is information design, not a theme park: no split-flap boards, no fake tickets, no roundels, no borrowed operator typefaces, colours or slogans.
- Fluffy copy: a clever line about a year, a job, or a sabbatical. If a sentence isn't a fact, it goes.
- Fake hand-drawn decoration. The only hand-drawn thing on the site is his real doodle avatar.

## Design Principles

1. **The map is the biography.** The career is drawn as a network: jobs on the main line, the things that ran alongside them as branches. Every station and date is a documented fact; nothing is drawn that didn't happen, and nothing is added to it — a name, its dates, its line.
2. **A colour always means a line.** Five lines, five colours, numbered in the order they opened. An element wears a colour only because it belongs to that line.
3. **Bold where it's true.** Scale and colour are spent on the name, the current stop, the lines and the articles; chrome stays quiet. Bold is the default; boring is the failure mode.
4. **Practice what you preach.** Zero JS by default, perfect Lighthouse, WCAG-clean. Performance is part of the brand.
5. **One archive, no attic.** The 50+ appearances are a first-class timetable: scannable, filterable, dated.

## Accessibility & Inclusion

WCAG 2.2 AA, verified in both themes: every text pairing clears 4.5:1. Wayfinding typography is the point of the design, so legibility comes first. Full keyboard navigation with visible focus, skip link, semantic landmarks. The map has a text alternative for screen readers (every stop and its dates); nothing lives only in the SVG. `prefers-reduced-motion` honoured everywhere. `prefers-color-scheme` honoured with a manual override. No third-party requests at all.
