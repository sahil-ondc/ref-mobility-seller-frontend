import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
`
export const HeaderSection = styled.div`
  display: flex;
  padding: 10px 40px;
  border-bottom: 1px solid ${theme.GRAYCOLOR};
`
export const LogoWrapper = styled.div`
  max-width: 180px;
  img {
    width: 100%;
  }
`
