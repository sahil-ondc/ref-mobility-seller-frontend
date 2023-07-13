import React from 'react'
import AgentIcon from 'assets/svg//AgentCountingIcon'
import IssuesIcon from 'assets/svg/IssuesIcon'
import OrderIcon from 'assets/svg/OrderIcon'
import { RecordSectionProps } from 'interfaces/views'
import {
  RecordContainer,
  CardContainer,
  DetailContainer,
  IconWrapper,
  CountingSection,
  Description,
} from 'styles/views/RecordSection'

const RecordSection: React.FC<RecordSectionProps> = ({ totalAdminCount, totalIssueCount, totalTaskCount }) => {
  const cardData = [
    {
      id: 1,
      icon: <AgentIcon />,
      number: totalAdminCount,
      description: 'Total Driver Added',
    },
    {
      id: 2,
      icon: <OrderIcon />,
      number: totalTaskCount,
      description: 'Total Tasks Created',
    },
    {
      id: 3,
      icon: <IssuesIcon />,
      number: totalIssueCount,
      description: 'Total Issues Created',
    },
  ]

  return (
    <RecordContainer>
      {cardData?.map((items) => {
        return (
          <CardContainer key={items?.id}>
            <DetailContainer>
              <IconWrapper>{items?.icon}</IconWrapper>
              <CountingSection>{items?.number}</CountingSection>
            </DetailContainer>
            <Description>{items?.description}</Description>
          </CardContainer>
        )
      })}
    </RecordContainer>
  )
}

export default RecordSection
