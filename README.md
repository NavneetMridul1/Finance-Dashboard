# Finance Dashboard UI

A clean, responsive finance dashboard built with React (Create React App), Bootstrap, and Recharts.

## Overview

This project is a frontend-only implementation that helps users track and understand financial activity through summary metrics, transaction exploration, visual trends, and lightweight role-based behavior.

## Tech Stack

- React (Create React App, JavaScript)
- Bootstrap 5
- Recharts
- React Context + `useReducer` for state management
- Local Storage for persistence

## Features

### 1. Dashboard Overview
- Summary cards: Total Balance, Total Income, Total Expenses
- Time-based visualization: monthly balance trend
- Categorical visualization: spending breakdown by category

### 2. Transactions Section
- Transaction fields: Date, Description, Category, Type, Amount
- Search by description/category
- Filter by type and category
- Sort by date, amount, or category (ascending/descending)

### 3. Basic Role-Based UI (Frontend Simulated)
- `Viewer`: read-only mode
- `User`: can add and edit transactions
- Role switcher in the header for demo purposes

### 4. Insights Section
- Highest spending category
- Month-over-month expense comparison
- Largest single expense

### 5. State Management
Centralized in Context + reducer:
- `transactions`
- `selectedRole`
- `selectedTheme`
- `filters` (`searchText`, `typeFilter`, `categoryFilter`, `sortBy`, `sortDir`)

### 6. UX and Responsiveness
- Responsive Bootstrap layout for desktop/tablet/mobile
- Graceful empty/no-result states
- Dark mode toggle with persistence
- Smooth animations/transitions with reduced-motion support

## Local Persistence

The app persists the following values in localStorage:
- `transactions`
- `selectedRole`
- `selectedTheme`

On reload, saved values are restored with safe fallback handling.

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm start
```

3. Open in browser

`http://localhost:3000`

## Scripts

- `npm start` - Run development server
- `npm run build` - Create production build

## Project Structure

```text
src/
  components/
  context/
  data/
  utils/
public/
  index.html
  finance-logo.svg
```
