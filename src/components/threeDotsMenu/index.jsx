import { useRef, useState } from 'react'
import EllipsisIcon from '../../assets/icons/ellipsisIcon'
import AddIcon from '../../assets/icons/addIcon'
import CohortIcon from '../../assets/icons/cohortIcon'
import CohortIconFill from '../../assets/icons/cohortIcon-fill'
import DeleteIcon from '../../assets/icons/deleteIcon'
import MonitorIcon from '../../assets/icons/monitorIcon'
import ProfileIcon from '../../assets/icons/profileIcon'
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon'
import Menu from '../menu'
import MenuItem from '../menu/menuItem'
import useAuth from '../../hooks/useAuth'

const ThreeDotsMenu = ({ id, hasCascadingMenu = true,  }) => {
  const { useClickOutside } = useAuth()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const profileRef = useRef(null)

  useClickOutside(profileRef, () => {
    setIsMenuVisible(false)
  })

  const renderCascadingMenu = () => {
    if (isMenuVisible && hasCascadingMenu) {
      return <CascadingMenu  />
    }
    return null
  }

  return (
    <div ref={profileRef}>
      <div
        onClick={() => {setIsMenuVisible(!isMenuVisible)}}
      >
        {renderCascadingMenu()}
        <EllipsisIcon/>
      </div>
    </div>
  )
}

const CascadingMenu = () => {
  return (
    <Menu className="profile-circle-menu">
      <MenuItem icon={<ProfileIcon />} text="Profile" />
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

export default ThreeDotsMenu