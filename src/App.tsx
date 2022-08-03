import { Route, Routes } from 'react-router-dom'

import { PageLayout } from './components/Layout'
import AccountNFT from './pages/account/nft'

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<AccountNFT />} />
        <Route path="/account/nft" element={<AccountNFT />} />
      </Routes>
    </PageLayout>
  )
}

export default App
