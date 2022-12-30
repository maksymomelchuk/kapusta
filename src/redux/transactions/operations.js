import { createAsyncThunk } from '@reduxjs/toolkit';
import { fullUserInfoAPI } from 'services/apiAuth';
import {
  addIncomeAPI,
  getIncomeAPI,
  addExpenseAPI,
  getExpenseAPI,
  updateBalanceAPI,
  deleteTransactionAPI,
} from 'services/apiTransactions';

// AddIncome transaction Thunk
export const addIncome = createAsyncThunk(
  'transactions/addIncome',
  async (value, thunkAPI) => {
    try {
      const data = await addIncomeAPI(value);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Get income transactions Thunk
export const getIncome = createAsyncThunk(
  'transactions/getIncome',
  async (_, thunkAPI) => {
    try {
      const data = await getIncomeAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Add expense transaction Thunk
export const addExpense = createAsyncThunk(
  'transactions/addExpense',
  async (value, thunkAPI) => {
    try {
      const data = await addExpenseAPI(value);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Get expenses transactions Thunk
export const getExpenses = createAsyncThunk(
  'transactions/getExpenses',
  async (_, thunkAPI) => {
    try {
      const data = await getExpenseAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Update balance Thunk
export const updateBalance = createAsyncThunk(
  'transactions/updateBalance',
  async (value, thunkAPI) => {
    try {
      const data = await updateBalanceAPI(value);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Refresh user Thunk
export const getAllTransactions = createAsyncThunk(
  'transactions/getAllTransactions',
  async (_, thunkAPI) => {
    try {
      const data = await fullUserInfoAPI();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Delete transaction Thunk
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      const { newBalance } = await deleteTransactionAPI(id);
      return { newBalance, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
