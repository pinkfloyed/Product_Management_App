'use client'

import { Provider } from 'react-redux'
import Navbar from '../components/Navbar'
import { store } from '../redux/store'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-gray-50">
          <Navbar />
          {children}
        </body>
      </html>
    </Provider>
  )
}
