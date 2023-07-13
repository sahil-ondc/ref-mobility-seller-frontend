import styled from 'styled-components'
import { theme } from 'styles/theme'

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 521px; */
  width: 100%;
`
export const DeliveryDetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 19px;
  border-bottom: 1px solid #00000014;
`
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`
export const WrapperTitle = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const WrapperDetail = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
  svg {
    cursor: pointer;
  }
`
export const DriverDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 0;
  border-bottom: 1px solid #00000014;
`
export const Heading = styled.div`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
`
export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const Title = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const Detail = styled.div`
  font-family: 'Inter';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const OrderDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 0;
`
export const StatusWrapper = styled.div`
  width: max-content;
  border: 1.5px solid ${theme.BOXCOLOR};
  border-radius: 4px;
  padding: 6px 10px;
  color: ${theme.BOXCOLOR};
  font-family: 'Inter';
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
`
