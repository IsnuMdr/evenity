# 🎟️ Evenity – Event Management Web App

**Evenity** is a modern, fullstack event management platform where users can explore, create, and attend public events. With a sleek UI and intuitive UX, Evenity makes organizing and discovering events seamless.

> Built as a solo project to sharpen my fullstack development skills.

![Evenity Screenshot](public/preview.png) <!-- Replace with actual image path if hosted -->

---

## 🚀 Live Demo

🌐 [https://evenity-nine.vercel.app](https://evenity-nine.vercel.app)

---

## ✨ Features

- ✅ Public event creation
- 🎫 Ticket purchasing via **Stripe**
- 📅 View event details and listings
- 🧾 View purchased tickets (QR Code)
- 🧑‍💼 User authentication & profile settings
- 📷 Image uploads for event cover via **Uploadthing**
- 🧪 Modern UI with responsive design
- 🔐 Clerk integration for auth/session handling

---

## 🛠️ Tech Stack

| Frontend                | Backend            | Auth         | Payments | Styling                    |
| ----------------------- | ------------------ | ------------ | -------- | -------------------------- |
| Next.js 15 (App Router) | MongoDB + Mongoose | Clerk        | Stripe   | TailwindCSS + shadcn/ui    |
| React 19                | Server Actions     | JWT Sessions | Webhooks | Uploadthing (File uploads) |

---

## 📂 Project Structure

```bash

├── app/                 # Next.js App Router structure
│   ├── (auth)/          # Auth pages
│   │    ├── sign-in
│   │    └── sign-up
│   ├── (root)/          # Root pages
│   │    ├── about
│   │    ├── events
│   │    ├── orders
│   │    ├── profile
│   │    └── tickets
│   ├── (api)/           # API routes
│   │    ├── uploadthing
│   │    └── stripe
├── components/          # Reusable UI components
├── lib/                 # Server utilities, Stripe, DB
│     ├── actions/       # Mongoose actions
│     └── database/
│          └── models/   # Monggose models
├── types/               # Define type
└── ...
```

---

## 📈 Roadmap

Coming soon:

🗓️ Add schedule and speakers per event
🌟 Featured event section on homepage
🎟️ Multi-ticket types and quantity management
📊 Admin dashboard (organizer view)
🔔 Email reminders (SendGrid integration)

## 📸 Screenshots

<!-- Add real images in your repo or use GitHub issue image links -->

## 📦 Installation

```bash
git clone https://github.com/IsnuMdr/evenity.git
cd evenity

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run locally
npm run dev
```

## 🔐 Environment Variables

Create a .env file using .env.example as a reference. You'll need:

```bash
NEXT_PUBLIC_SERVER_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

#MONGODB
MONGODB_URI=

#UPLOADTHING
UPLOADTHING_TOKEN=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## 📄 License

This project is open source
