import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/searchIcon'
import Button from '../../components/button'
import Card from '../../components/card'
import CreatePostModal from '../../components/createPostModal'
import Posts from '../../components/posts'
import useModal from '../../hooks/useModal'
import './style.css'
import { getUsers } from '../../service/apiClient'
import ProfileCircle from '../../components/profileCircle'
import EllipsisIcon from '../../assets/icons/ellipsisIcon'
import Menu from '../../components/menu'
import MenuItem from '../../components/menu/menuItem'
import ProfileIcon from '../../assets/icons/profileIcon'
import UserProfileIcon from '../../components/UserProfileIcon'
import UserLists from '../../components/userLists';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('')
  const [isSearchResVisible, setIsSearchResVisible] = useState(false)
  const [cohorts, setCohorts] = useState([])
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false)
  const [selectedProfileId, setSelectedProfileId] = useState(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then(setCohorts)
  }, [])

  const onClickSearchBar = () => {
    setIsSearchResVisible(true)
  }

  const onChange = (e) => {
    setSearchVal(e.target.value)
  }

  // console.log(cohorts);

  const result = cohorts.filter((cohort) => {
    if (cohort.firstName && cohort.lastName) {
      const fullName = `${cohort.firstName || ''} ${
        cohort.lastName || ''
      }`.toLowerCase()
      return fullName.includes(searchVal.toLowerCase())
    }
  })

  const handleClickOutside = (event) => {
    if (
      !event.target.closest('.search-cohorts-results') &&
      !event.target.closest('#input-wrapper-search-bar')
    ) {
      setIsSearchResVisible(false)
      setIsStudentModalVisible(false)
      setSelectedProfileId(null)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const onClickStudent = (id) => {
    setSelectedProfileId(id)
    setIsStudentModalVisible(true)
  }

  const { openModal, setModal } = useModal()

  const showModal = () => {
    setModal('Create a post', <CreatePostModal />)
    openModal()
  }

  const allSearchResults = () => navigate('/search-results', { state: { results: result, searchVal } })

  return (
    <>
      <main>
        <Card name="create-post">
          <div className="create-post-input">
            <UserProfileIcon />
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()} onClick={onClickSearchBar}>
            <div id="input-wrapper-search-bar">
              <SearchIcon />

              <input
                type="search"
                name="Search"
                value={searchVal}
                onChange={onChange}
                placeholder="Search for people"
              />
            </div>
          </form>
        </Card>

        {isSearchResVisible && result.length === 0 && (
          <article className="search-cohorts-results">
            <p>People</p>

            <div className="divider-search-bar"></div>

            <p>Sorry, no results found.</p>

            <p>Try changing your search term.</p>

            <button>Edit search</button>
          </article>
        )}

        {isSearchResVisible && result.length >= 1 && (
          <article className="search-cohorts-results">
            <p>People</p>

            <div className="divider-search-bar"></div>

            <ul>
              {result.map((cohort) => (
                <li className="user-search-card" key={cohort.id}>
                  <ProfileCircle
                    initials={[
                      cohort.firstName?.split(' ')[0],
                      cohort.lastName?.split(' ')[0],
                    ]}
                    hasCascadingMenu={false}
                  />

                  {isStudentModalVisible && selectedProfileId === cohort.id && (
                    <Menu className="profile-circle-menu" ref={menuRef}>
                      <MenuItem icon={<ProfileIcon />} text="Profile" />
                    </Menu>
                  )}

                  <div>
                    <span>{`${cohort.firstName} ${cohort.lastName}`}</span>
                    <p>Software Developer</p>
                  </div>

                  <figure onClick={() => onClickStudent(cohort.id)}>
                    <EllipsisIcon />
                  </figure>
                </li>
              ))}
            </ul>

            {result.length >= 10 &&
              <button onClick={allSearchResults}>
                All results
              </button>}
          </article>
        )}

        <Card name={'cohorts'}>
          <h4>My Cohort</h4>
        </Card>
        <Card name={'students'}>
          <h4>Students</h4>
          <UserLists />
        </Card>
        <Card name={'teachers'}>
          <h4>Teachers</h4>
          <UserLists />
        </Card>
      </aside>
    </>
  )
}

export default Dashboard
