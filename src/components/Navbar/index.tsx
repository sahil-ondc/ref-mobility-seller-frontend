import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { AutoComplete, Avatar, Popover } from 'antd'
import { AppContext } from 'context/payloadContext'
import { DashboardRoute, LoginRoute, SettingsRoute } from 'constants/routes'
import AvatarImage from 'assets/images/avatar_image.png'
import BellIcon from 'assets/svg/BellIcon'
import DownIcon from 'assets/svg/DownArrowIcon'
import logo from 'assets/images/ondc_logo.png'
import {
  ContentContainer,
  Title,
  NavbarContainer,
  LogoSection,
  NameSection,
  LeftSection,
  RightSection,
  User,
  UserSection,
  ProfileSection,
  OptionsWrapper,
  UserRole,
  Username,
} from 'styles/components/Navbar'

const Navbar = () => {
  const { userInfo } = useContext(AppContext)
  const router = useHistory()

  const content = (
    <ContentContainer>
      <Title
        onClick={() => {
          router.push(`${SettingsRoute.path}`)
        }}
      >
        <NavLink className="title" to={`${SettingsRoute.path}`}>
          Settings
        </NavLink>
      </Title>
      <Title
        onClick={() => {
          LogOut()
        }}
      >
        Logout
      </Title>
    </ContentContainer>
  )
  const LogOut = () => {
    localStorage.clear()
    router.push(`${LoginRoute.path}`)
  }

  const options = [{ value: 'Super Admin' }, { value: 'Admin' }, { value: 'Driver' }]

  return (
    <NavbarContainer>
      <LeftSection>
        <LogoSection
          onClick={() => {
            router.push(`${DashboardRoute.path}`)
          }}
        >
          <img src={logo} alt="ONDC" />
        </LogoSection>
        <NameSection>
          Welcome,<User>{userInfo?.name}</User>
        </NameSection>
      </LeftSection>
      <RightSection>
        <AutoComplete
          style={{ width: 250 }}
          options={options}
          placeholder="Search..."
          filterOption={(inputValue, option) => option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
        <UserSection>
          <BellIcon />
          <Popover placement="bottomLeft" content={content} trigger="click">
            <ProfileSection>
              <Avatar src={<img src={AvatarImage} alt="avatar" />} />
              <Username>
                {userInfo?.name} <UserRole>{userInfo?.role?.name}</UserRole>
              </Username>
              <OptionsWrapper>
                <DownIcon />
              </OptionsWrapper>
            </ProfileSection>
          </Popover>
        </UserSection>
      </RightSection>
    </NavbarContainer>
  )
}

export default Navbar
