<div align="center">

<img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80" alt="SumitXShop Banner" width="100%" style="border-radius: 16px;" />

<br/><br/>

# 🛍️ SumitXShop

### India's Most Premium AI-Powered E-Commerce Marketplace

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-5.x-433E38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

**Built with Apple-level design aesthetics · Amazon-scale product management · Stripe-inspired simplicity**

[🚀 Live Demo](#) · [📸 Screenshots](#-screenshots) · [✨ Features](#-features) · [🛠️ Tech Stack](#️-tech-stack) · [⚡ Quick Start](#-quick-start)

</div>

---

## ✨ Features

### 🏠 Premium Homepage
- **Hero Slideshow** — 4 animated slides with floating product cards, animated particles, and dual-color gradient titles
- **Trust Badges** — Free delivery, genuine products, easy returns, 24/7 support
- **Animated Stats** — Live-counting 50M+ customers, 10M+ products, 4.9★ rating, 500+ cities
- **Editorial Category Grid** — Image-based bento layout (hero + medium + wide cards)
- **Flash Sale Countdown** — Real-time timer with discounted product carousel

### 🤖 AI-Powered Features
- **AI Recommendations** — Smart match scores (98%, 95%…) with AI reason chips per product
- **Personalised Search** — Intelligent autocomplete with trending suggestions
- **AI Deals Finder** — Flash deals curated by AI with countdown timers

### 🛍️ Shopping Experience
- **Product Listings** — Grid/list view toggle, advanced multi-filter sidebar, sort options
- **Product Details** — Image gallery, spec tabs, size selector, reviews, related products
- **Quick View Modal** — Instant product preview without navigating away
- **Smart Cart** — Persistent cart drawer, quantity controls, coupon codes
- **3-Step Checkout** — Address → Payment → Review with order summary

### 🔀 Product Comparison
- Compare up to **4 products** side-by-side
- Live search dropdown to add products
- Full spec table with alternating rows
- Price, rating, discount, and shipping comparison

### 🏪 Multi-Vendor Platform
- **Seller Dashboard** — Analytics, product management, order tracking, earnings
- **Admin Dashboard** — Platform-wide stats, user management, moderation tools
- **User Dashboard** — Orders, wishlist, addresses, profile, reviews

### 🎨 World-Class Design
- **Dark / Light mode** — Seamless toggle with system preference detection
- **Glassmorphism** — Premium glass cards with backdrop blur
- **Infinite Brand Marquee** — Dual-row scrolling brand carousel (Apple, Samsung, Nike, Sony, Adidas…)
- **Premium Testimonials** — Split-layout carousel with verified badges
- **Newsletter** — Animated orbs, perk chips, coupon reveal animation
- **Responsive** — Perfectly optimized for mobile, tablet, and desktop

---

## 📸 Screenshots

<table>
  <tr>
    <td width="50%"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80" alt="Homepage Hero" /></td>
    <td width="50%"><img src="https://images.unsplash.com/photo-1472851294608-062f824d29cd?w=600&auto=format&fit=crop&q=80" alt="Flash Deals" /></td>
  </tr>
  <tr>
    <td><p align="center"><b>🏠 Homepage Hero</b></p></td>
    <td><p align="center"><b>⚡ Flash Sale</b></p></td>
  </tr>
  <tr>
    <td width="50%"><img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=80" alt="Product Listing" /></td>
    <td width="50%"><img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80" alt="Product Detail" /></td>
  </tr>
  <tr>
    <td><p align="center"><b>📦 Product Listings</b></p></td>
    <td><p align="center"><b>🔍 Product Detail</b></p></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + TypeScript 5 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 3 + Custom Design System |
| **Animations** | Framer Motion 11 |
| **State Management** | Zustand 5 |
| **Routing** | React Router DOM 7 |
| **Icons** | React Icons (Fi, Hi2, Si, Fa) |
| **Fonts** | Inter + Outfit (Google Fonts) |
| **Data** | Mock data layer (ready for REST/GraphQL) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx        # 4-slide animated hero with particles
│   │   ├── FeaturedCategories.tsx # Editorial image grid layout
│   │   ├── FeaturedBrands.tsx     # Dual infinite marquee
│   │   ├── FlashSale.tsx          # Countdown timer + product carousel
│   │   ├── AIRecommendations.tsx  # AI match score cards
│   │   ├── Testimonials.tsx       # Split-carousel testimonials
│   │   └── Newsletter.tsx         # Animated newsletter with coupon
│   ├── layout/
│   │   ├── Navbar.tsx             # Mega menu, search, notifications
│   │   └── Footer.tsx             # Premium footer with stats
│   ├── product/
│   │   ├── ProductCard.tsx        # Grid/list product card
│   │   └── QuickViewModal.tsx     # Quick view overlay
│   └── ui/
│       ├── Badge.tsx
│       ├── StarRating.tsx
│       └── ...
├── pages/
│   ├── Home.tsx                   # Main homepage
│   ├── ProductListing.tsx         # Filterable product grid
│   ├── ProductDetail.tsx          # Full product page
│   ├── Cart.tsx                   # Cart management
│   ├── Checkout.tsx               # 3-step checkout
│   ├── OrderConfirmation.tsx      # Post-purchase page
│   ├── Wishlist.tsx               # Saved items
│   ├── ProductComparison.tsx      # Side-by-side comparison
│   ├── UserDashboard.tsx          # Buyer account
│   ├── SellerDashboard.tsx        # Vendor management
│   └── AdminDashboard.tsx         # Platform admin
├── store/
│   ├── cartStore.ts               # Zustand cart state
│   ├── wishlistStore.ts           # Zustand wishlist state
│   ├── themeStore.ts              # Dark/light mode state
│   └── searchStore.ts             # Search state
├── data/
│   └── index.ts                   # 30+ mock products, categories, brands
├── types/
│   └── index.ts                   # TypeScript interfaces
└── App.tsx                        # Routes + layout
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18+
- **npm** 9+ or **pnpm** 8+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sumitpandey7070/shopverse.git
cd shopverse

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Available Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Full homepage with hero, categories, deals |
| `/products` | ProductListing | Filterable product grid |
| `/product/:id` | ProductDetail | Full product page |
| `/cart` | Cart | Shopping cart |
| `/checkout` | Checkout | 3-step checkout |
| `/order-confirmation` | OrderConfirmation | Post-purchase |
| `/wishlist` | Wishlist | Saved products |
| `/compare` | ProductComparison | Side-by-side comparison |
| `/dashboard/user` | UserDashboard | Buyer account |
| `/dashboard/seller` | SellerDashboard | Vendor panel |
| `/dashboard/admin` | AdminDashboard | Admin panel |

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `primary-500` | `#6366f1` | Brand indigo |
| `violet-500` | `#8b5cf6` | Gradient accent |
| `amber-500` | `#f59e0b` | Sale/deals badges |
| `dark-bg` | `#0a0a0f` | Dark background |
| `dark-card` | `#1c1c27` | Card surface |

### Key CSS Utilities

```css
.glass           /* Glassmorphism card */
.gradient-text   /* Indigo-violet gradient text */
.neon-border     /* Glowing border */
.glow-primary    /* Box shadow glow */
.marquee-track   /* Infinite scroll container */
.skeleton        /* Loading shimmer */
```

---

## 🗃️ Data & State

SumitXShop uses **Zustand** for global state management:

```ts
useCartStore()      // cart items, total, addItem, removeItem, clearCart
useWishlistStore()  // wishlist items, toggleItem, isInWishlist
useThemeStore()     // isDark, setDark, toggle
useSearchStore()    // query, results, setQuery
```

All product data lives in `src/data/index.ts` — fully ready to be replaced with a real API (REST, GraphQL, or Prisma ORM).

---

## 🚧 Roadmap

- [ ] **Backend** — Node.js + Express + PostgreSQL + Prisma ORM
- [ ] **Auth** — JWT + OAuth (Google, GitHub)
- [ ] **Payments** — Razorpay + UPI integration
- [ ] **Real-time** — WebSocket for live stock updates and order tracking
- [ ] **AI Search** — Vector embeddings for semantic product search
- [ ] **PWA** — Offline support, push notifications
- [ ] **i18n** — English, Hindi, Tamil, Telugu

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">

**Built with ❤️ by [Sumit Pandey](https://github.com/sumitpandey7070)**

⭐ **If you like this project, please give it a star!** ⭐

[![GitHub stars](https://img.shields.io/github/stars/sumitpandey7070/shopverse?style=social)](https://github.com/sumitpandey7070/shopverse)
[![GitHub forks](https://img.shields.io/github/forks/sumitpandey7070/shopverse?style=social)](https://github.com/sumitpandey7070/shopverse/fork)

</div>
