# AI-Powered Financial Assistant

![finance app](https://github.com/user-attachments/assets/0e08a55d-8880-4711-bc8d-b4f24c1a370f)

An AI-powered financial application that helps you understand and optimize your personal finances. Built with Next.js, CopilotKit for AI assistance, and Maybe Finance API for financial data.

## Tech Stack

- **Frontend**: Next.js 14+, React, Tailwind CSS
- **AI Integration**: CopilotKit
- **Financial Data**: Maybe Finance API
- **Authentication**: Google OAuth with NextAuth.js
- **Visualization**: Recharts

## Installation

### Prerequisites

- Node.js 18+ and npm
- Accounts for:
  - Google Cloud Platform (for OAuth)
  - [CopilotKit](https://docs.copilotkit.ai/) (AI assistant)
  - [Maybe Finance](https://synthfinance.com/) (financial data API)
- MongoDB database

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Tabintel/finance_ai.git
   cd finance_ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cd .env.example .env
   ```

4. Fill in your API keys and environment variables in the `.env` file.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
finance_ai
├─ app/                    # Next.js application
│  ├─ (auth)/              # Authentication routes
│  ├─ api/                 # API routes
│  │  ├─ currencies/       # Currency data endpoints
│  │  ├─ enrich/           # Financial data enrichment
│  │  └─ rates/            # Exchange rates
│  ├─ dashboard/           # Main dashboard page
│  ├─ onboarding/          # User onboarding flow
│  └─ layout.tsx           # Root layout component
├─ components/             # Shared components
├─ lib/                    # Utility functions and services
└─ public/                 # Static assets
```

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
