import './globals.css'
import Navbar from '/components/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import '@fortawesome/fontawesome-svg-core/styles.css';  
    
//core
import "primereact/resources/primereact.min.css";   

export const metadata = {
  title: 'EDESK User Detail',
  description: 'User Details App for EDESK Interview',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
          <Navbar/>
          {children}
      </body>
    </html>
  )
}
