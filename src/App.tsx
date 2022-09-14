import { Navigate, Route, Routes } from 'react-router-dom'

import { Home } from './pages/account/home'
import AccountNFT from './pages/account/nft'
import { Settings } from './pages/account/settings'
import { SignIn } from './pages/account/signin'
import { SignUp } from './pages/account/signup'
import Gallery from './pages/gallery'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/gallery" replace />}></Route>
      <Route path="/account/nft" element={<AccountNFT />} />
      <Route path="/account/signin" element={<SignIn />} />
      <Route path="/account/signup" element={<SignUp />} />
      <Route path="/account/settings" element={<Settings />} />
      <Route path="/account/home" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  )
}

export default App
