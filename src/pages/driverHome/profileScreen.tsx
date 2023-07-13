import { useHistory } from 'react-router-dom'
import { DriverLoginRoutes } from 'constants/routes'
import Button from 'components/Button'
import DriverLayout from 'components/Layouts/driverLayout'
import MyProfileSection from 'views/driverFlowHome/myProfileSection'
import LogoutIcon from 'assets/svg/LogoutIcon'
import { ProfileScreenWrapper, ButtonSection } from 'styles/views/driverFlowHome'

const ProfileScreen = () => {
  const router = useHistory()

  const LogOut = () => {
    localStorage.clear()
    router.push(`${DriverLoginRoutes.path}`)
  }

  return (
    <DriverLayout>
      <ProfileScreenWrapper>
        <MyProfileSection />
        <ButtonSection>
          <Button
            label="Logout"
            variant="contained"
            onClick={() => {
              LogOut()
            }}
          >
            <LogoutIcon />
          </Button>
        </ButtonSection>
      </ProfileScreenWrapper>
    </DriverLayout>
  )
}

export default ProfileScreen
