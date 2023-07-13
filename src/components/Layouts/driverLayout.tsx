import { ReactNode } from 'react'
import MobileNavbar from 'components/MobileNav'
import { DriverLayoutWrapperWrapper } from 'styles/views/driverFlowHome'

const DriverLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DriverLayoutWrapperWrapper>
      {children}
      <MobileNavbar />
    </DriverLayoutWrapperWrapper>
  )
}

export default DriverLayout
