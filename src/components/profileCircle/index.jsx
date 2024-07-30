import { useRef, useState } from 'react'
import AddIcon from '../../assets/icons/addIcon'
import CohortIcon from '../../assets/icons/cohortIcon'
import CohortIconFill from '../../assets/icons/cohortIcon-fill'
import DeleteIcon from '../../assets/icons/deleteIcon'
import MonitorIcon from '../../assets/icons/monitorIcon'
import ProfileIcon from '../../assets/icons/profileIcon'
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon'
import Menu from '../menu'
import MenuItem from '../menu/menuItem'
import './style.css'
import useAuth from '../../hooks/useAuth'


const ProfileCircle = ({ initials, hasCascadingMenu = true }) => {
  const { useClickOutside } = useAuth()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const profileRef = useRef(null)
  console.log(profileRef)

  useClickOutside(profileRef, () => {
    setIsMenuVisible(false)
  })

  const uppercaseInitials = initials
    .filter(Boolean)
    .map((element) => element?.[0]?.toUpperCase() || '')

  const cursor = hasCascadingMenu ? 'pointer' : 'default'

  const renderCascadingMenu = () => {
    if (isMenuVisible && hasCascadingMenu) {
      return <CascadingMenu />
    }

    return null
  }

  return (
    <div ref={profileRef}>
      <div
        className="profile-circle"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        style={{ cursor: cursor }}
      >
        {renderCascadingMenu()}

        <div className="profile-icon">
          <p>{uppercaseInitials}</p>
        </div>
      </div>
    </div>
  )
}

const CascadingMenu = () => {
  return (
    <Menu className="profile-circle-menu">
      <MenuItem icon={<ProfileIcon />} text="Profile" linkTo="/profile"/>

      <MenuItem icon={<AddIcon />} text="Add note" />

      <MenuItem icon={<CohortIcon />} text="Move to cohort">
        <MenuItem icon={<SquareBracketsIcon />} text="Software Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>

        <MenuItem icon={<MonitorIcon />} text="Frontend Development">
          <MenuItem icon={<CohortIconFill />} text="Cohort 1" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 2" />
          <MenuItem icon={<CohortIconFill />} text="Cohort 3" />
        </MenuItem>
      </MenuItem>

      <MenuItem icon={<DeleteIcon />} text="Delete student" />
    </Menu>
  )
}

export default ProfileCircle
