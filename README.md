# Bharat Bus Booking & Fleet Management Platform

An enterprise-grade, comprehensive intercity bus reservation, live fleet tracking, driver assignment, passenger management, and ticketing portal.

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Tooling**: Vite 6, Vitest for unit testing and coverage
- **Build & Runtime**: Node.js, TypeScript Compiler (`tsc`)

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd bharat-bus
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `example.env` template to `.env` (never commit `.env` to source control):
   ```bash
   cp example.env .env
   ```
   Set any required values such as `GEMINI_API_KEY` and `APP_URL`.

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

5. **Run Typecheck & Linter**:
   ```bash
   npm run lint
   ```

6. **Run Unit Tests**:
   ```bash
   npm test
   ```

7. **Run Test Coverage**:
   ```bash
   npm run test:coverage
   ```

8. **Production Build**:
   ```bash
   npm run build
   ```

## License

Proprietary - All rights reserved. Not licensed under open-source licenses.
