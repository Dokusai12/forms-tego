# Forms Tego

Redesigned claim forms for Air Shield (flight disruption) and Baggage Shield (mishandled baggage), styled to match the clean, product-led feel of tego-group.com.

## Routes

- `/` — showcase hub linking to both forms
- `/air-shield` — 3-step flight disruption claim
- `/baggage-shield` — 3-step mishandled baggage report

Forms are front-end only for now — submissions are validated in the browser and shown on a success screen.

## Development

Requires Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone https://github.com/Dokusai12/forms-tego.git
cd forms-tego
npm i
npm run dev
```

The dev server runs at `http://localhost:8080`.
