# Russell Wealth Group — Trade Blotter

A broker-dealer trade blotter for recording, tracking, and managing securities
and insurance product trades. Built with React + Vite.

## Features

- **BD Blotter** — searchable, filterable trade log with live summary tiles
  (total trades, total value, filled, pending, cancelled) and inline status
  editing.
- **New Trade Entry** — a full trade ticket covering trade details, client &
  account, security & product, execution, and compliance/tax, with automatic
  total calculation and edit-in-place.
- **Settings** — firm & broker-dealer profile, registered advisors, support
  staff, and preferred products/carriers/custodians (which surface at the top of
  the relevant dropdowns during trade entry).

Supports a wide range of product types (annuities, life insurance, LTC, mutual
funds, ETFs, individual securities, alternatives, and more) with carrier lists
mapped per product.

> Note: state is held in-memory for the session — there is no backend or
> persistence yet.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Then open the URL Vite prints (default http://localhost:5173).

## Tech stack

- React 18
- Vite 5
