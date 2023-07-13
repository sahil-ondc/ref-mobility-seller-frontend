import styled from 'styled-components'
import { theme } from 'styles/theme'

export const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`
export const CardContainer = styled.div`
  width: 100%;
  max-width: 348px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${theme.WHITE};
  border-radius: 16px;
  padding: 37.5px 25px 37.5px 25px;
`
export const DetailContainer = styled.div`
  display: flex;
  gap: 10px;
`
export const IconWrapper = styled.div`
  width: 49px;
  height: 49px;
  background-color: ${theme.BOXCOLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`
export const CountingSection = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: ${theme.BOXCOLOR};
`
export const Description = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.BLACKCOLOR};
`
