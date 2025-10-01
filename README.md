# Sentra Batik Pungsari - Project Documentation

## 1. Introduction

This document provides a comprehensive overview of the Sentra Batik Pungsari e-commerce platform.

The platform is built on a headless architecture, using Payload CMS for backend management and Next.js for the frontend.

## 2. Core Technologies

- **Frontend**: Next.js (App Router), React, TypeScript
- **Backend & CMS**: Payload CMS (v3)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state, Zustand for client state
- **Deployment**: Coolify on a Hostinger VPS
- **Media Storage**: Cloudflare R2 (for production)
- **Email**: Resend

## 3. Running the Project (Development)

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js (v18 or later)
- pnpm
- Docker (for running the database)

### Step-by-step Guide

**Clone the Repository:**

```bash
git clone <your-repository-url>
cd <project-directory>
```

**Create Environment File:**

Duplicate the `.env.example` file and rename it to `.env`. Fill in the required variables for your local setup. The `DATABASE_URI` should point to localhost.

**Start the Database:**

Run the following command to start the PostgreSQL database container in the background.

```bash
docker compose up
```

**Install Dependencies:**

```bash
pnpm install
```

**Run the Development Server:**

This command starts both the Next.js frontend and the Payload CMS backend.

```bash
pnpm dev
```

- The website will be available at `http://localhost:3000`
- The Payload admin panel will be at `http://localhost:3000/admin`

**Database Migration**

To prepare the tables for the database, run the migrate script.

```bash
pnpm seed
```

**Seed the Database**

To populate your local database with sample data (artisans, products, etc.), run the seed script.

```bash
pnpm seed
```

## 4. Payload CMS Overview

Payload is the headless CMS that powers the entire backend, from content management to e-commerce logic.

### User Roles

The system has three main user roles with different permissions:

- **Admin (Super Admin)**: Has full access to the entire system. Can manage all houses, products, orders, and users.
- **Store Admin**: A user assigned to manage a specific "House" (store). They can only manage products and view orders belonging to their own house.
- **Customer**: A regular user who can create an account, manage their profile, and view their order history.

### Collections & Globals

- **Users**: Stores all user accounts (Admins, Store Admins, Customers)
- **Houses**: Represents the artisan stores. Each house has its own manager, bank details, and product catalog
- **Products**: The main collection for all Batik products. Each product is linked to a House
- **Orders**: Stores all customer orders. Implements a manual payment flow
- **Media**: A library for all uploaded images and videos (product photos, hero videos)
- **PaymentProofs**: A separate, hidden collection for storing customer payment receipts
- **Jenis Batik, Jenis Kain, Jenis Produk**: Category collections used for filtering and organizing products
- **HomePage (Global)**: A single entry to manage the content of the main homepage sections (Hero, About, etc.)

## 5. E-commerce Flow

The platform uses a manual payment workflow and is designed as a multi-store marketplace.

### Multi-Store Logic

- A customer can add products from multiple "Houses" to their cart
- On the cart page, they must choose one House to check out from at a time
- The checkout process will only include items from the selected House

### Manual Payment Flow

1. **Checkout**: The customer fills out their shipping details and selects a shipping option
2. **Upload Proof**: A dialog appears, prompting the user to upload proof of payment (e.g., a screenshot of their bank transfer)
3. **Order Creation**: Upon successful upload, a new order is created in the database with a status of `waiting-confirmation`
4. **Admin Notification**: An email is automatically sent to the respective Store Admin to notify them of the new order
5. **Confirmation**: The Store Admin logs in, verifies the payment proof, and updates the order status to `processing`

## 6. Deployment (Production on Coolify)

The project is configured for a CI/CD workflow using two separate environments on Coolify.

### Environments

- **Development/Staging**: Uses a separate database and sandbox API keys. Accessible at `dev.sentrabatikpungsari.com`
- **Production**: Deploys automatically on every push to the `main` branch. Uses the live database and production API keys. Accessible at the main domain

### Running Scripts on Production

To run scripts like `migrate` or `seed` on a deployed application:

1. Open the Coolify dashboard and navigate to your application
2. Open the "Remote Shell" or "Terminal"
3. Run the desired command (e.g., `pnpm payload migrate`)
