import React from 'react'

import { HeaderGameItem, useHeaderGameInfo } from '../../../hooks'
import { classNames } from '../../../utils'
import { GameNavButton } from './GameNavButton'
import { GameNavImage } from './GameNavImage'
import { GameNavTitle } from './GameNavTitle'

type GamesNavProps = {
  open: boolean
}

export function GamesNav(props: GamesNavProps) {
  const { games, exps, isLoading } = useHeaderGameInfo()
  const [activeInfoId, setActiveInfoId] = React.useState(0)
  const activeInfo = React.useMemo(() => {
    const findGameInfo = games?.find((game) => game.id === activeInfoId)
    const findExpInfo = exps?.find((exp) => exp.id === activeInfoId)
    return findGameInfo || findExpInfo
  }, [activeInfoId, exps, games])
  const handleButtonHover = React.useCallback((event: React.MouseEvent, info: HeaderGameItem) => {
    event.stopPropagation()
    setActiveInfoId(info.id)
  }, [])

  React.useEffect(() => {
    if (!isLoading && games) setActiveInfoId(games[0].id)
  }, [games, isLoading])

  return (
    <div className={classNames('hidden w-full', props.open && '!block')}>
      <nav className="flex flex-col xl:flex-row gap-24px xl:px-88px xl:py-48px">
        <div className="flex flex-col gap-12px">
          <GameNavTitle className="pl-24px hidden xl:block">Games</GameNavTitle>
          <div className="flex-col gap-12px xl:min-w-360px hidden xl:flex">
            {games?.map((game, index) => (
              <GameNavButton
                key={`${game.id}-${game.name}-${index}`}
                to={game.url}
                name={game.name}
                active={game.id === activeInfo?.id}
                soon={game.soon}
                onMouseOver={(e) => handleButtonHover(e, game)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-24px mt-32px xl:hidden">
            {games?.map((game, index) => (
              <GameNavImage
                key={`${game.id}-${game.name}-${index}`}
                to={game.url}
                title={game.name}
                img={game.img}
                soon={game.soon}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-12px">
          <GameNavTitle className="xl:pl-24px">Gaming Experience</GameNavTitle>
          <div className="flex flex-col gap-12px xl:min-w-300px">
            {exps?.map((exp, index) => (
              <GameNavButton
                key={`${exp.id}-${exp.name}-${index}`}
                to={exp.url}
                name={exp.name}
                active={exp.id === activeInfo?.id}
                soon={exp.soon}
                onMouseOver={(e) => handleButtonHover(e, exp)}
              />
            ))}
          </div>
        </div>
        <div className="hidden xl:block pt-28px">
          {activeInfo && (
            <GameNavImage to={activeInfo.url} title={activeInfo.name} img={activeInfo.img} soon={activeInfo.soon} />
          )}
        </div>
      </nav>
    </div>
  )
}
