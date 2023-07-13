import DriverLayout from 'components/Layouts/driverLayout'
import MobileTopbar from 'components/MobileTopbar'
// import TextInput from 'components/TextInput'
import HistoryScreenSection from 'views/driverFlowHome/historyScreenSection'
// import SearchIcon from 'assets/svg/SearchIcon'
import { DriverHomeWrapper } from 'styles/views/driverFlowHome'

const HistoryScreen = () => {
  return (
    <DriverLayout>
      <DriverHomeWrapper>
        <MobileTopbar />
        <HistoryScreenSection />
      </DriverHomeWrapper>
    </DriverLayout>
  )
}

export default HistoryScreen
