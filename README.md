# Commish

Commish is a simple commission tracking app for recording commissions, tracking sales, and calculating earnings.

## Features

* 🔐 User authentication
* 🧾 Create, edit, and delete commissions
* 🖼️ Upload commission images
* 📊 Monthly commission statistics
* 🔎 Search commissions
* 📅 Browse commissions by month

## Tech Stack

* [Next.js](https://nextjs.org/) — React framework
* [TypeScript](https://www.typescriptlang.org/) — Type safety
* [Tailwind CSS](https://tailwindcss.com/) — Styling
* [shadcn/ui](https://ui.shadcn.com/) — UI components
* [Supabase](https://supabase.com/) — Authentication and PostgreSQL
* [Drizzle ORM](https://orm.drizzle.team/) — Database access
* [Cloudflare R2](https://developers.cloudflare.com/r2/) — Image storage

## Getting Started

### Prerequisites

* Node.js
* pnpm
* A Supabase project
* A Cloudflare R2 bucket

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd commish
```

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

DATABASE_URL=

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
```

#### Supabase

Get these values from your Supabase project:

* `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
* `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Supabase publishable key
* `DATABASE_URL` — PostgreSQL connection string

#### Cloudflare R2

Create an R2 bucket and an API token with access to the bucket.

* `R2_ACCOUNT_ID` — Cloudflare account ID
* `R2_ACCESS_KEY_ID` — R2 access key ID
* `R2_SECRET_ACCESS_KEY` — R2 secret access key
* `R2_BUCKET_NAME` — R2 bucket name

### Database

Generate and apply the Drizzle migrations:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

Or use the project's existing database migration workflow if migrations have already been generated.

### Development

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```text
src/
├── actions/       # Server Actions
├── app/           # Next.js App Router
├── components/    # UI components
├── hooks/         # Client-side hooks
├── lib/           # Database, Supabase, R2 and utilities
├── services/      # Business and data logic
└── types/         # TypeScript types
```

## License

This project is for personal use and learning.
