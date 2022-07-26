import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import MainSiteRoutes from './components/MainSiteRoutes'
import { Assets } from './pages/account/assets'
import { Games } from './pages/account/games'
import { Home } from './pages/account/home'
import AccountNFT from './pages/account/nft'
import { Settings } from './pages/account/settings'
import { SignIn } from './pages/account/signin'
import { SignUp } from './pages/account/signup'
import Gallery from './pages/gallery'
import { AppDispatch } from './store'
import {
  fetchMetadataGoldEdition as fetchMetadataImmutableXGoldEdition,
  fetchMetadataRangersEdition as fetchMetadataImmutableXRangersEdition,
} from './store/metadata/metadataImmutableXSlice'
import {
  fetchMetadataGoldEdition,
  fetchMetadataRangersEdition,
  fetchMetadataUltimateEdition,
} from './store/metadata/metadataSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const promiseGoldEdition = dispatch(fetchMetadataGoldEdition())
    const promiseRangersEdition = dispatch(fetchMetadataRangersEdition())
    const promiseUltimateEdition = dispatch(fetchMetadataUltimateEdition())

    const promiseImmutableXGoldEdition = dispatch(fetchMetadataImmutableXGoldEdition())
    const promiseImmutableXRangersEdition = dispatch(fetchMetadataImmutableXRangersEdition())
    return () => {
      promiseGoldEdition.abort()
      promiseRangersEdition.abort()
      promiseUltimateEdition.abort()

      promiseImmutableXGoldEdition.abort()
      promiseImmutableXRangersEdition.abort()
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<MainSiteRoutes />} />
      <Route path="/account/nft" element={<AccountNFT />} />
      <Route path="/account/signin" element={<SignIn />} />
      <Route path="/account/signup" element={<SignUp />} />
      <Route path="/account/settings" element={<Settings />} />
      <Route path="/account/home" element={<Home />} />
      <Route path="/account/games" element={<Games />} />
      <Route path="/account/assets" element={<Assets />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<MainSiteRoutes />} />
    </Routes>
  )
}

export default App
