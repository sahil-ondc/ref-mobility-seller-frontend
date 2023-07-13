import ROLES from './role'
import HomeIcon from 'assets/svg/HomeIcon'
import HistoryIcon from 'assets/svg/HistoryIcon'
import ProfileIcon from 'assets/svg/ProfileIcon'

const MENU = {
  [ROLES.SUPER_ADMIN]: [
    {
      title: 'Dashboard',
      link: '/dashboard',
    },

    {
      title: 'Agents ',
      link: '/agents',
    },
    {
      title: 'Orders',
      link: '/orders',
    },

    {
      title: 'Issues',
      links: '/issues',
    },
  ],
  [ROLES.ADMIN]: [
    {
      title: 'Dashboard',
      link: '/dashboard',
    },

    {
      title: 'Driver & Admin',
      link: '/driver',
    },
    {
      title: 'Tasks',
      link: '/tasks',
    },

    {
      title: 'Issues',
      link: '/issues',
    },
  ],
  [ROLES.DRIVER]: [
    {
      title: 'Home',
      link: '/home',
      icon: <HomeIcon />,
    },
    {
      title: 'History',
      link: '/history',
      icon: <HistoryIcon />,
    },
    {
      title: 'Profile',
      link: '/profile',
      icon: <ProfileIcon />,
    },
  ],
}
export default MENU
