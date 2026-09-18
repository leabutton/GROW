# GROW — Village Hotels Booking Prototype

A frontend proof of concept for exploring Village Hotels and trying a hotel booking journey. Built with React, TypeScript, Vite, and Tailwind CSS.

Features include hotel search and filters, date and guest selection, room packages and add-ons, booking confirmations, and **Dozie**, a scripted booking assistant with demo parking passes.

Bookings use sample data and are saved in the browser's `localStorage`. Booking and parking flows are demonstrations; no live reservation or AI service is connected.

## Getting started

With Node.js and npm installed, run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Build and preview

```sh
npm run build
npm run preview
```

The build runs TypeScript checks and outputs the production files to `dist/`.

## Project structure

- `src/components/` — booking, hotel, checkout, and assistant UI.
- `src/data/` — hotel details, mock rooms, and sample bookings.
- `src/services/` — browser-based booking storage.
- `src/theme/` — brand colours and typography.

Dependencies in `node_modules/` are excluded from Git.
