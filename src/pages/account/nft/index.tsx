import styled from '@emotion/styled'
import { Stack } from '@mui/material'

const Wrapper = styled.div`
  max-width: 1140px;
  width: 1140px;
  padding: 0 10px;
  margin: 0 auto;
`
const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 78px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 36px 0;
  span {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 64px;
    line-height: 78px;
    text-transform: uppercase;
    color: #ff4125;
    padding: 0 6px;
  }
`

const NFTItem = styled.div`
  display: flex;
  height: 600px;
  background: #000000;
`
const NFTCover = styled.div`
  width: 600px;
  height: 600px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const NFTInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const NFTInfoHead = styled.div`
  display: flex;
  justify-content: space-between;
`
const NFTInfoHeadTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-transform: uppercase;
  color: #ff4125;
  padding: 0;
  margin: 0;
`
const NFTInfoHeadSubtitle = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-transform: uppercase;
  color: #ffffff;
`
const NFTInfoHeadId = styled(NFTInfoHeadSubtitle)`
  margin-left: 16px;
`

const NFTInfoHeadTag = styled.div`
  width: 140px;
  height: 58px;
  padding: 12px;
  background: #ffb600;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  color: #ffffff;
`

const NFTInfoContent = styled.div`
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
`

const NFTInfoIntroduction = styled.section``
const NFTInfoIntroductionTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: #a0a4b0;
  padding: 0;
  margin: 0;
`
const NFTInfoIntroductionContent = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  padding: 0;
  margin: 4px 0 0 0;
`

const NFTInfoFooter = styled.div`
  margin-top: auto;
`

const NFTInfoButton = styled.button`
  padding: 20px;
  background: #ff4125;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
`

const NFTs = [
  {
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: '#537',
    tag: 'Gold Edition',
    tagStatus: '+',
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
      },
    ],
  },
  {
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: '#537',
    tag: 'Gold Edition',
    tagStatus: '+',
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
      },
    ],
  },
  {
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: '#537',
    tag: 'Gold Edition',
    tagStatus: '+',
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
      },
    ],
  },
  {
    title: 'E4C Rangers',
    subtitle: 'Series 1',
    id: '#537',
    tag: 'Gold Edition',
    tagStatus: '+',
    introduction: [
      {
        title: 'Character',
        content: 'Rin',
      },
      {
        title: 'Background',
        content: 'Off-white 1',
      },
      {
        title: 'Hair',
        content: 'Off-white 1',
      },
      {
        title: 'HeadGear',
        content: 'Off-white 1',
      },
      {
        title: 'Makeup',
        content: 'Off-white 1',
      },
      {
        title: 'Earrings',
        content: 'Off-white 1',
      },
    ],
  },
]

function AccountNFT() {
  return (
    <Wrapper>
      <Title>
        MY<span>NFTS</span>
      </Title>

      <Stack spacing={3}>
        {NFTs.map((i, index) => (
          <NFTItem key={index}>
            <NFTCover>
              <img src="https://i.imgur.com/n29yuRi.jpg" alt="NFT" />
            </NFTCover>
            <NFTInfo>
              <NFTInfoHead>
                <section>
                  <NFTInfoHeadTitle>{i.title}</NFTInfoHeadTitle>
                  <NFTInfoHeadSubtitle>{i.subtitle}</NFTInfoHeadSubtitle>
                  <NFTInfoHeadId>{i.id}</NFTInfoHeadId>
                </section>
                <NFTInfoHeadTag>
                  <span>{i.tag}</span>
                  <span>{i.tagStatus}</span>
                </NFTInfoHeadTag>
              </NFTInfoHead>

              <NFTInfoContent>
                {i.introduction.map((j, indexJ) => (
                  <NFTInfoIntroduction key={indexJ}>
                    <NFTInfoIntroductionTitle>{j.title}</NFTInfoIntroductionTitle>
                    <NFTInfoIntroductionContent>{j.content}</NFTInfoIntroductionContent>
                  </NFTInfoIntroduction>
                ))}
              </NFTInfoContent>

              <NFTInfoFooter>
                <NFTInfoButton>New</NFTInfoButton>
                <NFTInfoButton>Upgrade</NFTInfoButton>
              </NFTInfoFooter>
            </NFTInfo>
          </NFTItem>
        ))}
      </Stack>
    </Wrapper>
  )
}

export default AccountNFT
