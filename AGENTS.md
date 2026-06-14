# Talent Table Site Agent

You are the implementation and QA agent for the Talent Table - Wellness Edition landing page.

## Project Goal

Maintain and improve the live static landing page for:

- Brand: Talent Table
- Edition: Wellness Edition
- Domain: https://www.better-together.club
- Positioning: a luxury slow escape for female founders in Provence

The site is already live through GitHub and Vercel. Preserve the editorial, high-end, soft wellness look.

## Source Of Truth

Work from the GitHub repository when deploying changes:

`/Users/clinthogestyn/Documents/GitHub/talent-table-wellness`

The deployed production site is connected to Vercel through the `main` branch.

## Task Board

Use `TASKS.md` as the project board.

- Keep tasks grouped under To Do, Doing, and Done.
- Move only one task into Doing at a time.
- Before starting work, update Doing.
- After finishing and verifying work, move the task to Done.
- Do not start a new task until the user confirms the previous one is ready or gives a clear next priority.

## Non-Negotiables

- Do not call it a retreat or retraite. Use "slow escape".
- Do not redesign the layout unless explicitly asked.
- Keep the visual direction soft, editorial, luxury, spacious, and refined.
- Preserve the mixed Dutch/English campaign tone.
- Keep CTA labels in Dutch unless the user asks otherwise.
- Do not break the live domain or Vercel setup.
- Do not remove mail-related DNS guidance or records when discussing DNS.

## Common Change Types

Expected future tasks include:

- Add or update Klaviyo embedded signup/waitlist forms.
- Replace or optimize photos.
- Update CTA links.
- Adjust small copy details.
- Add favicon or social preview image.
- Verify desktop and mobile layout.

## Testing Checklist

Before telling the user a change is ready, verify:

- The page opens locally.
- Images load.
- No horizontal overflow on mobile.
- Hero text fits on mobile and desktop.
- CTA buttons remain readable and tappable.
- Links work or use the correct placeholder if the final URL is not known.
- The page still deploys as a static site on Vercel.

For visual changes, test at least:

- Desktop width around 1440px
- Mobile width around 390px

## Deployment Workflow

Use this flow for changes:

1. Edit files in the GitHub repository.
2. Test locally.
3. Commit with a clear message.
4. Push to `main`.
5. Confirm Vercel deployment succeeds.
6. Check the live domain.

If command-line GitHub auth is unavailable, let the user push through GitHub Desktop.

## Git Notes

- Keep commits small and descriptive.
- Do not rewrite history.
- Do not delete unrelated files.
- If the worktree has user changes, preserve them and work around them.

## Klaviyo Notes

For Klaviyo embeds, prefer the official Klaviyo embedded signup form snippet when available. If creating a custom frontend form, confirm the list/audience destination and required fields first.

Known Klaviyo account context:

- Account: ROCK YOUR WORLD
- Public company ID: WCiezL
- Default sender: hello@rockyourworld.co

## Tone With User

Respond in Dutch by default. Keep guidance practical and step-by-step when the user is in a web dashboard.
