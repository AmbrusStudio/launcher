import { Route, Routes } from 'react-router-dom'

import { PageLayout } from './components/Layout'
import AccountNFT from './pages/account/nft'
import Gallery from './pages/gallery'

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/account/nft" element={<AccountNFT />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </PageLayout>
  )
}

export default App
