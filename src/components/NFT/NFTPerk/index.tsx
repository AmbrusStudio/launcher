import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

import { PERKS } from '../../../data'
import { PERKState, PERKTag } from '../../../types'
import ModalCustom from '../../ModalCustom'

const ItemTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 30px;
  text-transform: uppercase;
  color: #ff4125;
  padding: 0;
  margin: 0;
`
const ItemDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #000000;
  padding: 0;
  margin: 0;
`
const InfoButton = styled.button<{ color: string }>`
  padding: 8px 0;
  background: ${(p) => p.color || '#ff4125'};
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  min-height: 46px;
  min-width: 160px;
  display: inline-block;
  cursor: pointer;
`

const Tag = styled.div`
  padding: 4px 8px;
  position: absolute;
  width: 46px;
  height: 23px;
  right: 12px;
  top: 12px;
  background: linear-gradient(112.63deg, #ec651a 0%, #e99e58 91.57%);
  border-radius: 4px;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
`

interface NFTPerkProps {
  readonly visible: boolean
  toggle: (value: boolean) => void
}

const NFTPerk: FC<NFTPerkProps> = ({ visible, toggle }) => {
  return (
    <ModalCustom title={'Your Gifts'} visible={visible} toggle={toggle}>
      <Stack
        spacing={2}
        sx={{
          p: 3,
          overflow: 'auto',
          maxHeight: '680px',
        }}
      >
        {PERKS.map((perk, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              background: '#F0F0F0',
              position: 'relative',
            }}
          >
            <ItemTitle>{perk.title}</ItemTitle>
            <ItemDescription>{perk.description}</ItemDescription>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 5.25,
              }}
            >
              {perk.state !== PERKState.Default && (
                <InfoButton
                  color={
                    perk.state === PERKState.Redeem || perk.state === PERKState.Share
                      ? '#ff4125'
                      : perk.state === PERKState.Redeemed || perk.state === PERKState.ComingSoon
                      ? '#A0A4B0'
                      : '#ff4125'
                  }
                >
                  {perk.state}
                </InfoButton>
              )}
            </Box>

            {perk.tag !== PERKTag.Default && <Tag>{perk.tag}</Tag>}
          </Box>
        ))}
      </Stack>
    </ModalCustom>
  )
}

export default NFTPerk
