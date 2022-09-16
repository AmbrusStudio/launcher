import React from 'react'

import { getHeaderGameInfo, HeaderGameInfo, HeaderGameItem } from '../../../api'
import { classNames } from '../../../utils'
import { GameNavButton } from './GameNavButton'
import { GameNavImage } from './GameNavImage'
import { GameNavTitle } from './GameNavTitle'

type GamesNavProps = {
  open: boolean
}

export function GamesNav(props: GamesNavProps) {
  const [gameInfo, setGameInfo] = React.useState<HeaderGameInfo | undefined>()
  const [gameInfoActive, setGameInfoActive] = React.useState<HeaderGameItem>({ name: '', url: '', img: '' })
  const handleButtonHover = React.useCallback((info: HeaderGameItem) => setGameInfoActive(info), [])
  const fetchGameInfoData = React.useCallback(async () => {
    const info = await getHeaderGameInfo()
    setGameInfo(info)
    setGameInfoActive(info.games[0])
  }, [])

  React.useEffect(() => {
    fetchGameInfoData()
  }, [fetchGameInfoData])

  return (
    <div className={classNames('hidden w-full', props.open && '!block')}>
      <nav className="flex flex-col xl:flex-row gap-24px xl:px-88px xl:py-48px">
        <div className="flex flex-col gap-12px">
          <GameNavTitle className="pl-24px hidden xl:block">Games</GameNavTitle>
          <div className="flex-col gap-12px xl:min-w-360px hidden xl:flex">
            {gameInfo?.games?.map((game, index) => (
              <GameNavButton
                key={`${game.url}-${index}`}
                to={game.url}
                name={game.name}
                active={game.url === gameInfoActive?.url}
                soon={game.soon}
                onMouseOver={() => handleButtonHover(game)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-24px mt-32px xl:hidden">
            {gameInfo?.games?.map((game, index) => (
              <GameNavImage
                key={`${game.url}-${index}`}
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
            {gameInfo?.exp?.map((exp, index) => (
              <GameNavButton
                key={`${exp.url}-${index}`}
                to={exp.url}
                name={exp.name}
                active={exp.url === gameInfoActive?.url}
                soon={exp.soon}
                onMouseOver={() => handleButtonHover(exp)}
              />
            ))}
          </div>
        </div>
        <div className="hidden xl:block pt-28px">
          <GameNavImage
            to={gameInfoActive?.url}
            title={gameInfoActive?.name}
            img={gameInfoActive?.img}
            soon={gameInfoActive?.soon}
          />
        </div>
      </nav>
    </div>
  )
}
