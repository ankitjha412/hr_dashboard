import './globals.css'
import Navbar from '../app/components/Navbar'
import ScriptToggleTheme from '../app/components/ScriptToggleTheme'
import { BookmarkProvider } from '../app/context/BookmarkContext'
import { EmployeeProvider } from '../app/context/EmployeeContext'
import { UserProvider } from '../app/context/UserContext' // adjust path if needed

import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'HR Dashboard',
  description: 'Mini HR Performance Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <EmployeeProvider>
          <BookmarkProvider>
            <ScriptToggleTheme />
            <Navbar />
            <Toaster position="top-right" reverseOrder={false} /> 
            <main className="p-4">{children}</main>
            <UserProvider/>
          </BookmarkProvider>
        </EmployeeProvider>
      </body>
    </html>
  )
}
