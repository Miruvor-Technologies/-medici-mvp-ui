# Medici MVP UI

This folder contains a lightweight **Next.js 15** front-end prototype for the Medici peer-to-peer scholarships platform.  
It lets donors discover verified students, pledge any amount of USDC, and walk through a mock checkout flow—all ready to plug into the on-chain program.

---

## Key features

- **Browse & search** — Grid of student cards with filter placeholders.
- **Student profile pages** — Funding progress, documents and “Back Student” CTA.
- **Pledge flow** — Amount entry, wallet-connect stub and success screen.
- **Reusable component library** — shadcn/ui + Tailwind for buttons, cards, tabs, etc.
- **Type-safe scaffolding** — TypeScript strict mode, ready for zod validation.

---

## Repository layout

```
app/                    # App-router pages (home, browse, student, pledge)
components/             # Shared UI components (shadcn wrappers)
hooks/                  # Small React hooks
utils/                  # sample-data.ts (placeholder students)
public/                 # Static assets (logos, photos)
tailwind.config.ts      # Custom design tokens / breakpoints
next.config.js          # Next.js settings
package.json            # Scripts & dependencies
```

---

## Getting started

```bash
pnpm install        # or bun install
pnpm dev            # runs localhost:3000
```

The UI currently uses mock data and a MetaMask-style wallet shim.  
To connect it to Solana, replace the wallet logic in `app/pledge/[id]/page.tsx` with **@solana/wallet-adapter** and call the on-chain `send_amount_from_donor_to_student` instruction.

---

## Roadmap

- Integrate Solana wallet adapter + USDC transfer  
- Swap mock data for live on-chain or API reads  
- Add zod validation and form handling  
- Playwright E2E tests for the donor journey

