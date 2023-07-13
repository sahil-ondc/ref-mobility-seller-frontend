import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import TextInput from 'components/TextInput'
import IssuesData from 'views/adminDashboard/issuesTable'
import SearchIcon from 'assets/svg/SearchIcon'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import {
  HeadingWrapper,
  MainContainer,
  MainHeading,
  ActivityWrapper,
  TitleWrapper,
  InputWrapper,
} from 'styles/views/dashboard'

const IssuesDetails = () => {
  const { refetch: getIssues, data: issueDetails } = useGet('get-issues', `${APIS.ISSUE_LIST}`)

  useEffect(() => {
    getIssues()
  }, [getIssues])
  const { control } = useForm()

  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Issues</MainHeading>
        </HeadingWrapper>
        <ActivityWrapper>
          <TitleWrapper>
            <InputWrapper>
              <TextInput placeholder="Search " prefix={<SearchIcon />} control={control} name={'search'} />
            </InputWrapper>
          </TitleWrapper>
          <IssuesData scroll={430} issueDetails={issueDetails} />
        </ActivityWrapper>
      </MainContainer>
    </AdminPrivateLayout>
  )
}

export default IssuesDetails
