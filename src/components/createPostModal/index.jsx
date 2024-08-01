import { useState} from 'react'
import useModal from '../../hooks/useModal'
import './style.css'
import UserProfileIcon from '../UserProfileIcon'
import UserDetails from '../UserDetails'
import PostModalActions from '../PostModalActions'
import { createPost , getPosts} from '../../service/apiClient'

const CreatePostModal = ({setPosts}) => {
    const { closeModal } = useModal()

    const [message, setMessage] = useState(null)
    const [content, setContent] = useState('')

    const onChange = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = async () => {
        const res = await createPost(content)

        if (res.status === "success") {
            setMessage('Post created!')
            setTimeout(() => {
                setMessage(null)
                closeModal()
            }, 1000)
            getPosts().then((res) => setPosts([...res]))
        }
    }

    return (
        <>
            <section className="create-post-user-details">
                <UserProfileIcon />
                <UserDetails/>
            </section>

            <section>
                <textarea
                    onChange={onChange}
                    value={content}
                    placeholder="What's on your mind?"
                ></textarea>
            </section>

            <PostModalActions onSubmit={onSubmit} text={content}/>

            {message && <p>{message}</p>}
        </>
    )
}

export default CreatePostModal
