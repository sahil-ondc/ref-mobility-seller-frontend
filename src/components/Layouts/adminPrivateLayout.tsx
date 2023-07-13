import { ReactNode } from 'react'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { DashboardWrapper, DetailWrapper, DetailContainer } from 'styles/pages/dashboard'
const AdminPrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardWrapper>
      <Navbar />
      <DetailWrapper>
        <Sidebar />
        <DetailContainer>{children}</DetailContainer>
      </DetailWrapper>
    </DashboardWrapper>
  )
}

export default AdminPrivateLayout
