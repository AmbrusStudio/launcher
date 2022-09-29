import { useEffect } from 'react'

import { getMainSiteLink } from '../../utils'

const MainSiteRoutes = () => {
  useEffect(() => {
    window.location.href = getMainSiteLink('/')
  }, [])

  return null
}

export default MainSiteRoutes
