import FullLogo from '../../assets/fullLogo'
import useAuth from '../../hooks/useAuth'
import './style.css'
import Card from '../card'
import ProfileIcon from '../../assets/icons/profileIcon'
import CogIcon from '../../assets/icons/cogIcon'
import LogoutIcon from '../../assets/icons/logoutIcon'
import { NavLink } from 'react-router-dom'
import { useRef, useState } from 'react'
import UserProfileIcon from '../UserProfileIcon'
import UserDetails from '../UserDetails'
import useUser from '../../hooks/useUser'

const Header = () => {
    const { token, onLogout, useClickOutside } = useAuth()
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const profileIconRef = useRef(null)

    const { currentUser } = useUser()
    
    useClickOutside(profileIconRef, () => {
      setIsMenuVisible(false)
    })

    if (!token) {
        return null
    }

    return (
        <header>
            <FullLogo textColour="white" />

            <div ref={profileIconRef}>
              <UserProfileIcon onClick={() => setIsMenuVisible(!isMenuVisible)} />

              {isMenuVisible && (
                  <div className="user-panel">
                      <Card>
                          <section className="post-details">
                              <UserProfileIcon />
                              <UserDetails header={true} />
                          </section>

                          <section className="user-panel-options border-top">
                              <ul>
                                  <li>
                                      <NavLink to={`/profile/${currentUser?.id}`}>
                                          <ProfileIcon /> <p>Profile</p>
                                      </NavLink>
                                  </li>
                                  <li>
                                      <NavLink to="/">
                                          <CogIcon />{' '}
                                          <p>Settings &amp; Privacy</p>
                                      </NavLink>
                                  </li>
                                  <li>
                                      <NavLink to="/login" onClick={onLogout}>
                                          <LogoutIcon /> <p>Log out</p>
                                      </NavLink>
                                  </li>
                              </ul>
                          </section>
                      </Card>
                  </div>
              )}
            </div>
        </header>
    )
}

export default Header
