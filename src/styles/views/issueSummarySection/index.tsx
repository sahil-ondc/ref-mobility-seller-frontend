import styled from 'styled-components'
import { theme } from 'styles/theme'

export const IssueSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 30px 40px;
  background-color: ${theme.WHITE};
  max-height: 69vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
export const IssueDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`
export const IssueDetails = styled.div``
export const IssueHeading = styled.div`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const IssueNumber = styled.div`
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 700;
`
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 14px;
  button {
    width: 134px;
  }
  .cancel {
    background-color: ${theme.NEUTRALGREYCOLOR};
    color: ${theme.PRIMARYBLACKCOLOR};
  }
`
export const CustomerDetailsWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 28px 0;
`
export const CustomerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`
export const CustomerHeading = styled.div`
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
`
export const CustomerInfoContainer = styled.div`
  display: flex;
  gap: 90px;
`
export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`
export const CustomerInfoHeading = styled.div`
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
  /* padding-top: 28px; */
`
export const CustomerInfoDetails = styled.div`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const StatusButton = styled.div`
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
export const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 28px 0;
`
export const OrderInfoDetails = styled.div`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: ${theme.PRIMARYBLACKCOLOR};
`
export const OrderDescription = styled.div``
export const DescriptionHeading = styled.div`
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: ${theme.TITLECOLOR};
`
export const Description = styled.div`
  color: ${theme.PRIMARYBLACKCOLOR};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  padding-top: 7px;
`
export const ActionTakenDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 0;
  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${theme.SUCCESS};
    border-color: ${theme.SUCCESS};
  }
  .ant-steps .ant-steps-item-finish .ant-steps-item-icon {
    background-color: ${theme.SUCCESS};
    border-color: ${theme.SUCCESS};
    svg {
      path {
        fill: ${theme.WHITE};
      }
    }
  }
  .ant-steps .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
    background-color: ${theme.SUCCESS};
  }
`
export const ActionStepperWrapper = styled.div`
  height: auto;
  display: flex;
`
