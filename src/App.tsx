import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Games } from './pages/account/games'
import { Home } from './pages/account/home'
import AccountNFT from './pages/account/nft'
import { Settings } from './pages/account/settings'
import { SignIn } from './pages/account/signin'
import { SignUp } from './pages/account/signup'
import Gallery from './pages/gallery'
import { getMainSiteLink } from './utils'

const GoMainSite = () => {
  useEffect(() => {
    window.location.href = getMainSiteLink('/')
  }, [])
  return null
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<GoMainSite />} />
      <Route path="/account/nft" element={<AccountNFT />} />
      <Route path="/account/signin" element={<SignIn />} />
      <Route path="/account/signup" element={<SignUp />} />
      <Route path="/account/settings" element={<Settings />} />
      <Route path="/account/home" element={<Home />} />
      <Route path="/account/games" element={<Games />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<GoMainSite />} />
    </Routes>
  )
}

export default App
