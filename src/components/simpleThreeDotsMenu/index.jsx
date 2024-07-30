import { useRef, useState } from 'react'
import EllipsisIcon from '../../assets/icons/ellipsisIcon'
import ProfileIcon from '../../assets/icons/profileIcon'
import Menu from '../menu'
import MenuItem from '../menu/menuItem'
import useAuth from '../../hooks/useAuth'

const SimpleThreeDotsMenu = ({ id, hasCascadingMenu = true }) => {
  const { useClickOutside } = useAuth()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const profileRef = useRef(null)

  useClickOutside(profileRef, () => {
    setIsMenuVisible(false)
  })

  const renderCascadingMenu = () => {
    if (isMenuVisible && hasCascadingMenu) {
      return <CascadingMenu />
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
    </Menu>
  )
}

export default SimpleThreeDotsMenu