import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  email: string | null
}

// Initialize from localStorage for persistence
const savedAuth = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('auth') || '{}') : {}

const initialState: AuthState = {
  token: savedAuth?.token || null,
  email: savedAuth?.email || null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.token = action.payload.token
      state.email = action.payload.email
      localStorage.setItem('auth', JSON.stringify(action.payload))
    },
    clearAuth: (state) => {
      state.token = null
      state.email = null
      localStorage.removeItem('auth')
    },
  },
})

export const { setToken, clearAuth } = authSlice.actions
export default authSlice.reducer
