import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ActionModal from 'views/issuesActionModal'
import ActionStepper from 'views/issueSummarySection/actionStepper'
import { GPSTrackerRoute } from 'constants/routes'
import Button from 'components/Button'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  IssueSummaryContainer,
  IssueDetailsWrapper,
  IssueDetails,
  IssueHeading,
  IssueNumber,
  ButtonWrapper,
  CustomerDetailsWrapper,
  CustomerDetailsContainer,
  CustomerHeading,
  CustomerInfoContainer,
  CustomerInfo,
  CustomerInfoHeading,
  CustomerInfoDetails,
  StatusButton,
  OrderDetails,
  OrderInfoDetails,
  OrderDescription,
  DescriptionHeading,
  Description,
  ActionTakenDetails,
} from 'styles/views/issueSummarySection'
import Modal from 'components/Modal'

const IssueSummarySection = () => {
  const [actionModal, setActionModal] = useState(false)
  const setAction = () => {
    setActionModal(true)
  }
  const router = useHistory()

  const { id }: any = useParams()
  const { refetch: getSingleIssues, data: singleIssueDetail } = useGet('get-issues', `${APIS.GET_ISSUE}/${id}`)

  useEffect(() => {
    getSingleIssues()
  }, [getSingleIssues])

  return (
    <>
      <IssueSummaryContainer>
        <IssueDetailsWrapper>
          <IssueDetails>
            <IssueHeading>Issue number</IssueHeading>
            <IssueNumber>{singleIssueDetail?.data?.issue?.id}</IssueNumber>
          </IssueDetails>
          <ButtonWrapper>
            <Button label="Action" variant="contained" className="cancel" onClick={setAction} />
            <Button
              label="Order Detail"
              variant="contained"
              type="submit"
              onClick={() => {
                router.push(`${GPSTrackerRoute.path}`)
              }}
            />
          </ButtonWrapper>
        </IssueDetailsWrapper>
        <CustomerDetailsWrapper>
          <CustomerDetailsContainer>
            <CustomerHeading>Customer Detail</CustomerHeading>
            <CustomerInfoContainer>
              <CustomerInfo>
                <CustomerInfoHeading>Name</CustomerInfoHeading>
                <CustomerInfoDetails>
                  {singleIssueDetail?.data?.issue?.complainant_info?.person?.name}
                </CustomerInfoDetails>
              </CustomerInfo>
              <CustomerInfo>
                <CustomerInfoHeading>Email</CustomerInfoHeading>
                <CustomerInfoDetails>
                  {singleIssueDetail?.data?.issue?.complainant_info?.contact?.email}
                </CustomerInfoDetails>
              </CustomerInfo>
              <CustomerInfo>
                <CustomerInfoHeading>Phone Number</CustomerInfoHeading>
                <CustomerInfoDetails>
                  {singleIssueDetail?.data?.issue?.complainant_info?.contact?.phone}
                </CustomerInfoDetails>
              </CustomerInfo>
              <CustomerInfo>
                <CustomerInfoHeading>Status</CustomerInfoHeading>
                <StatusButton>{singleIssueDetail?.data?.issue?.status}</StatusButton>
              </CustomerInfo>
            </CustomerInfoContainer>
          </CustomerDetailsContainer>
        </CustomerDetailsWrapper>
        <OrderDetails>
          <CustomerHeading>Order Detail</CustomerHeading>
          <CustomerInfoContainer>
            <CustomerInfo>
              <CustomerInfoHeading>Issue ID</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.id}</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Issue type</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.issue_type}</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Product Name</CustomerInfoHeading>
              <OrderInfoDetails>Lorem ipsum</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Category</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.category}</OrderInfoDetails>
            </CustomerInfo>
            <CustomerInfo>
              <CustomerInfoHeading>Subcategory</CustomerInfoHeading>
              <OrderInfoDetails>{singleIssueDetail?.data?.issue?.sub_category}</OrderInfoDetails>
            </CustomerInfo>
          </CustomerInfoContainer>
          <OrderDescription>
            <DescriptionHeading>Short Description</DescriptionHeading>
            <Description>{singleIssueDetail?.data?.issue?.description?.short_desc}</Description>
          </OrderDescription>
          <OrderDescription>
            <DescriptionHeading>Long Description</DescriptionHeading>
            <Description>{singleIssueDetail?.data?.issue?.description?.long_desc}</Description>
          </OrderDescription>
        </OrderDetails>
        <ActionTakenDetails>
          <CustomerHeading>Action Taken</CustomerHeading>
          <ActionStepper singleIssueDetail={singleIssueDetail} />
        </ActionTakenDetails>
      </IssueSummaryContainer>

      <Modal isOpen={actionModal}>
        <ActionModal showModal={(value: boolean) => setActionModal(value)} />
      </Modal>
    </>
  )
}

export default IssueSummarySection
