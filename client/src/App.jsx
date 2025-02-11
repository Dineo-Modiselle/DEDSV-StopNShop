import React from 'react'
import Footer from './components/shopping-view/Footer'
import ApiFetches from './components/ConnectingApis.jsx/ApiFetches'
import NavBar from './components/shopping-view/Navbar'


function App() {
  return (
    <div>
     <NavBar />
      <ApiFetches />
      <Footer />

    </div>
  )
}

export default App