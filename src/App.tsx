import { Route, Routes } from 'react-router-dom'

import AccountNFT from './pages/account/nft'
import Home from './pages/home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account/nft" element={<AccountNFT />} />
    </Routes>
  )
}

export default App
