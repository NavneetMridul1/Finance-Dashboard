# Finance Dashboard UI

A simple, responsive finance dashboard built with React (Create React App), Bootstrap, and Recharts.

## Overview

This project demonstrates a frontend-only dashboard where users can:

- View key financial summary metrics (balance, income, expenses)
- Explore transaction history with search, filtering, and sorting
- Understand spending via trend and category visualizations
- Switch role behavior in the UI (`viewer` and `admin`)
- Review computed insights from transaction data

## Tech Stack

- React (Create React App)
- Bootstrap 5
- Recharts
- React Context + `useReducer` for app state
- Local Storage for persistence

## Features

### 1. Dashboard Overview
- Summary cards: Total Balance, Income, Expenses
- Time-based chart: monthly balance trend
- Categorical chart: spending breakdown by category

### 2. Transactions Section
- Transaction fields: Date, Description, Category, Type, Amount
- Search by description/category
- Filter by type and category
- Sort by date, amount, or category (ascending/descending)

### 3. Basic Role-Based UI (Frontend Simulated)
- `Viewer`: read-only mode
- `Admin`: can add and edit transactions
- Role switcher available in header

### 4. Insights Section
- Highest spending category
- Month-over-month expense comparison
- Largest single expense

### 5. State Management
Managed centrally with Context + reducer:

- `transactions`
- `selectedRole`
- `filters` (`searchText`, `typeFilter`, `categoryFilter`, `sortBy`, `sortDir`)

### 6. UX and Responsiveness
- Bootstrap grid/card/table layout for desktop and mobile
- Graceful empty states for no data/no results
- Clean visual polish with subtle transitions
- Dark mode toggle with persisted preference
- Animated section/card entry and smooth UI transitions (with reduced-motion support)

## Local Persistence

The app stores these values in localStorage:

- `transactions`
- `selectedRole`
- `selectedTheme`

On reload, it restores saved values with safe fallback to mock data.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm start
```

3. Open:

`http://localhost:3000`

## Scripts

- `npm start` - start dev server
- `npm run build` - production build

## Assumptions

- Frontend-only implementation (no backend/API)
- Mock transaction dataset included
- RBAC is simulated in UI only
- Advanced extras (dark mode/export) are intentionally out of scope for v1

## Project Structure (high-level)

```text
src/
  components/
  context/
  data/
  utils/
```
