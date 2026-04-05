import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { mockTransactions } from '../data/mockTransactions';

const STORAGE_KEYS = {
  transactions: 'finance_dashboard_transactions',
  selectedRole: 'finance_dashboard_selected_role',
  selectedTheme: 'finance_dashboard_selected_theme',
};

const defaultFilters = {
  searchText: '',
  typeFilter: 'all',
  categoryFilter: 'all',
  sortBy: 'date',
  sortDir: 'desc',
};

const parseJSONSafely = (value, fallbackValue) => {
  if (!value) {
    return fallbackValue;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallbackValue;
  }
};

const getInitialState = () => {
  const storedTransactions = parseJSONSafely(localStorage.getItem(STORAGE_KEYS.transactions), null);
  const storedRole = localStorage.getItem(STORAGE_KEYS.selectedRole);
  const storedTheme = localStorage.getItem(STORAGE_KEYS.selectedTheme);
  const systemTheme =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  return {
    transactions: Array.isArray(storedTransactions) && storedTransactions.length ? storedTransactions : mockTransactions,
    selectedRole: storedRole === 'admin' ? 'admin' : 'viewer',
    selectedTheme: storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : systemTheme,
    filters: defaultFilters,
  };
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, selectedRole: action.payload };
    case 'SET_THEME':
      return { ...state, selectedTheme: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: defaultFilters };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
      };
    default:
      return state;
  }
};

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, undefined, getInitialState);

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setFilters = (filtersPatch) => {
    dispatch({ type: 'SET_FILTERS', payload: filtersPatch });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const updateTransaction = (transaction) => {
    dispatch({ type: 'UPDATE_TRANSACTION', payload: transaction });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.selectedRole, state.selectedRole);
  }, [state.selectedRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.selectedTheme, state.selectedTheme);
    document.documentElement.setAttribute('data-theme', state.selectedTheme);
  }, [state.selectedTheme]);

  const contextValue = useMemo(
    () => ({
      ...state,
      setRole,
      setTheme,
      setFilters,
      resetFilters,
      addTransaction,
      updateTransaction,
    }),
    [state]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
};
