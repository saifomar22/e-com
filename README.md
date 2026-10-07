# Sanctum of the Creed | Master Assassin Armory & Relics

An authentic, dark-mood commercial e-commerce platform inspired by the Assassin's Creed universe. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**, featuring secure **bKash mobile payment integration**, **real-time courier GPS tracking**, a **personalized Assassin Sanctuary dashboard**, and a **hidden, password-protected Master Admin Console**.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![bKash](https://img.shields.io/badge/bKash-Payment%20Verified-E2136E)](https://www.bkash.com/)

---

## 🗡️ Key Capabilities & Commercial Architecture

### 1. Thematic Storefront & Armory Catalog
- **Interactive High-Fidelity 3D-feel Artifacts**: Dual-action spring hidden blades, Masyaf heavy wool cloaks, First Civilization Apple of Eden (Isu touch luminescence), Ottoman hookblades, and Damascus combat daggers.
- **Audio Sensory Engine**: Procedural high-frequency web audio synthesizer generating mechanical blade deployment clicks and Animus synchronization hums without external audio assets.
- **Currency Switcher**: Real-time conversion between Bangladesh Taka (৳ BDT) and US Dollars ($ USD).

### 2. Seamless bKash Mobile Payment Integration
- **Merchant Number**: `01712-889900`
- **Instant TrxID Verification**: Automated validation algorithm ensuring 6–10 character Transaction ID checking and merchant balance registration.
- **Visual bKash Modal**: Step-by-step guidance showing USSD `*247#` and bKash App Payment procedures with copyable numbers.

### 3. Real-Time Encrypted Courier Tracking (Radar Telemetry)
- **Live Animus Radar**: Dynamic canvas grid simulating GPS proximity to the safehouse destination.
- **Minute-by-Minute ETA**: Decreasing countdown timer and checkpoint verification (*Payment Cleared* → *Smithy Forging* → *Courier Dispatched* → *Sector Approach* → *Safehouse Delivered*).
- **Courier Direct Comms**: Encrypted contact numbers for couriers (e.g., Brother Tariq).

### 4. Customer Sanctuary Dashboard
- **Profile Customization**: Assassin Alias, rank progression (*Initiate* → *Mentor*), synchronization status percentage, and safehouse coordinates.
- **Order History & Invoices**: Requisition records with 1-click printable and PDF-ready scrolls of purchase.
- **Brotherhood Wishlist**: Save armaments to local cache.

### 5. Hidden & Secured Master Admin Console
The admin console is completely hidden from public visitors with zero visible links on the storefront.
- **Access Shortcuts**:
  - Keyboard: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac)
  - URL Route: Add `#admin` to the website URL (e.g., `https://your-domain.com/#admin`)
- **Default Master Credentials**:
  - **Login ID**: `mentor_saif`
  - **Master Password**: `CreedVault#2026@Masyaf`
- **Admin Capabilities**:
  - Live revenue analytics and pending bKash approvals counter.
  - 1-click bKash TrxID authorization and fraud prevention.
  - Live courier GPS coordinator (change courier district & ETA in real-time).
  - Inventory manager (live stock decrement on checkout, +5 stock quick re-arm).
  - Custom Domain & Vercel DNS Records generator with 1-click record copy buttons.

### 6. Commercial Legal Suite
- **Terms of Service & Armory Regulations**
- **Nationwide 64-District Shipping Policy** (Discreet stealth packaging guarantee, 24h Dhaka Metro delivery)
- **7-Day Return, Refund & 2-Year Damascus Steel Warranty Policy**
- **Sanctuary Privacy Policy** (Zero third-party telemetry, AES-256 encrypted recipient logs)
- **24/7 Brotherhood Support Center** with direct WhatsApp dispatch (`+880 1712-889900`).

---

## 🚀 Instant Deployment Guide

### Deploy to Vercel (1-Click)
This repository is pre-configured with `vercel.json` (Vite routing, rewrite fallback, security headers):
1. Go to [vercel.com/new](https://vercel.com/new).
2. Import this repository: `saifomar22/e-com`.
3. Click **Deploy**. Your site will be live at `https://<your-project>.vercel.app` in 30 seconds.

### Deploy to Custom Domain
1. In your Vercel Project Settings, navigate to **Domains**.
2. Add your custom domain (e.g. `creedarmory.com`).
3. Point your DNS records:
   - **A Record**: Host `@` $\to$ `76.76.21.21`
   - **CNAME Record**: Host `www` $\to$ `cname.vercel-dns.com`

---

## 🛠️ Local Development & Build

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Type check & validate
npm run lint

# 4. Production build
npm run build
```

---

## 🛡️ License & Creed
*Nothing is true, everything is permitted.*  
Handcrafted for historical collectors and enthusiasts.
