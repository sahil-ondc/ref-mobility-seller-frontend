import { useHistory } from 'react-router-dom'
import NotificationIcon from 'assets/svg/NotificationIcon'
import OndcLogo from 'assets/images/ondc_logo.png'
import { LogoWrapper } from 'styles/views/signin'
import { TopBar } from 'styles/views/driverFlowHome'
import { NotificationScreenRoute } from 'constants/routes'

const MobileTopbar = () => {
  const router = useHistory()

  const onHandleClick = () => {
    router.push(`${NotificationScreenRoute.path}`)
  }

  return (
    <TopBar>
      <LogoWrapper>
        <img src={OndcLogo} alt="OndcLogo" />
      </LogoWrapper>
      <NotificationIcon onClick={onHandleClick} />
    </TopBar>
  )
}

export default MobileTopbar
