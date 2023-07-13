import { useState } from 'react'
import { Breadcrumb } from 'antd'
import Button from 'components/Button'
import Modal from 'components/Modal'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import MapComponent from 'components/MapComponent'
import UpdateStatus from 'views/updateModal'
import OrderDetail from 'views/adminDashboard/gpsTracker'
import {
  MainWrapper,
  HeadingWrapper,
  BreadcrumbWrapper,
  MainHeading,
  DetailContainer,
  DetailSection,
  MapWrapper,
  ButtonWrapper,
} from 'styles/pages/gpsTracker'

const GPSTracker = () => {
  const TaskBreadcrumb: React.FC = () => (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: 'All Tasks',
          href: '/tasks',
        },
        {
          title: 'GPS tracker',
        },
      ]}
    />
  )
  const [updateModal, setUpdateModal] = useState(false)
  const updateTask = () => {
    setUpdateModal(true)
  }

  return (
    <AdminPrivateLayout>
      <MainWrapper>
        <HeadingWrapper>
          <BreadcrumbWrapper>
            <TaskBreadcrumb />
            <MainHeading>Task Details</MainHeading>
          </BreadcrumbWrapper>
        </HeadingWrapper>
        <DetailContainer>
          <DetailSection>
            <OrderDetail />
            <MapWrapper>
              <MapComponent />
            </MapWrapper>
          </DetailSection>
          <ButtonWrapper>
            <Button label="Cancel" variant="contained" className="cancel-button" />
            <Button label="Update Status" variant="contained" onClick={updateTask} />
          </ButtonWrapper>
        </DetailContainer>
      </MainWrapper>
      <Modal isOpen={updateModal}>
        <UpdateStatus showModal={(value: boolean) => setUpdateModal(value)} />
      </Modal>
    </AdminPrivateLayout>
  )
}

export default GPSTracker
