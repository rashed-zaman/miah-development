"use client"

import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/theme'
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react'
import { initStateWithPrevTab } from 'redux-state-sync'
import Footer from './layout/footer/Footer'
import Header from './layout/header/Header'
import MainLayout from './layout/MainLayout'

export default function ReduxProvider({ children }) {
  useEffect(() => {
    // initialize cross-tab state sync and try to hydrate from a previous tab
    try {
      initStateWithPrevTab(store)
    } catch (e) {
      // ignore when not available
    }
  }, [])

  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <MainLayout>
                {children}
              </MainLayout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
