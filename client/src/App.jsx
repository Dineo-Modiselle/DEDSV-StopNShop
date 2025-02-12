import React from 'react'
import Footer from './components/shopping-view/Footer'
import ApiFetches from './components/ConnectingApis.jsx/ApiFetches'
import NavBar from './components/shopping-view/Navbar'
import Header from './components/shopping-view/Header'
import AboutUs from './components/shopping-view/AboutUs'

function App() {
  return (
    <div>
     {/* <NavBar /> */}
     <Header/>
     <AboutUsPage/>
      <Footer />
     

    </div>
  )
}

export default App