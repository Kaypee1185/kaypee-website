# Kaypee VTU Website (Frontend)

Brand:
- Name: Kaypee
- Theme: Blue
- WhatsApp Support: 0546183019
- Slogan: Samic

## What this is
A customer + admin web UI for a VTU/data-selling platform. It is designed to connect to your Node Core API.

## Quick start
1. Install dependencies:
   npm install
2. Set environment variables:
   Copy `.env.example` to `.env.local` and edit `NEXT_PUBLIC_API_BASE_URL`
3. Run:
   npm run dev

## Pages
- / (Home)
- /login, /register
- /dashboard (wallet + buy data)
- /dashboard/orders
- /dashboard/transactions
- /admin (admin dashboard placeholder)

## API expectations (Core API)
- POST /auth/login
- POST /auth/register
- GET  /wallet/balance
- GET  /wallet/ledger
- POST /wallet/fund/paystack/init
- POST /orders
- GET  /orders

If your endpoints differ, edit `src/lib/api.ts`.
