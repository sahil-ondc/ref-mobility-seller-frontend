import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import CommonTabs from 'components/Tabs'
import ChangePassword from 'views/editDetails/changePassword'
import PersonalDetails from 'views/editDetails/personalDetails'
import DashboardSettings from 'views/editDetails/dashboardSettings'
import Support from 'views/editDetails/supportSection'
import { TabItem } from 'interfaces'
import {
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  SettingsWrapper,
  ActivityWrapper,
  TitleWrapper,
  Title,
  TabWrapper,
} from 'styles/views/dashboard'

const EditDetails = () => {
  const items: TabItem[] = [
    {
      key: 'personalDetails',
      label: 'Personal Details',
      children: <PersonalDetails />,
    },
    {
      key: 'changePassword',
      label: 'Change Password',
      children: <ChangePassword />,
    },
    {
      key: 'settings',
      label: 'Settings',
      children: <DashboardSettings />,
    },
    {
      key: 'support',
      label: 'Support',
      children: <Support />,
    },
  ]
  return (
    <AdminPrivateLayout>
      <MainWrapper>
        <HeadingWrapper>
          <MainHeading>Settings</MainHeading>
        </HeadingWrapper>
        <SettingsWrapper>
          <ActivityWrapper>
            <TitleWrapper>
              <Title>Edit Details</Title>
            </TitleWrapper>
            <TabWrapper>
              <CommonTabs items={items} />
            </TabWrapper>
          </ActivityWrapper>
        </SettingsWrapper>
      </MainWrapper>
    </AdminPrivateLayout>
  )
}

export default EditDetails
