import { Route, Routes } from 'react-router-dom'

import AccountNFT from './pages/account/nft'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AccountNFT />} />
      <Route path="/account/nft" element={<AccountNFT />} />
    </Routes>
  )
}

export default App
