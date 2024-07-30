import { API_URL } from './constants'

async function login(email, password) {
  return await post('login', { email, password }, false)
}

async function register(email, password) {
  const res = await post('users', { email, password }, false)

  if (res.data.error) {
    return res
  }
  return await login(email, password)
}

async function getUser(id) {
  return await get(`users/${id}`)
}

async function createProfile(
  userId,
  firstName,
  lastName,
  username,
  githubUsername,
  mobile,
  bio
) {
  return await patch(`users/${userId}`, {
    firstName,
    lastName,
    username,
    githubUsername,
    mobile,
    bio,
  })
}

async function getUsers() {
  const res = await get('users')
  return res.data.users
}

const getPosts = async () => {
  const res = await get('posts')
  return res.data.posts
}

async function createPost(content) {
  return await post('posts', { content })
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth)
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth)
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth)
}

async function createCohort(cohortData) {
  return await post('cohorts', { cohortName, cohortType, startDate, endDate } = cohortData)
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
  }

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data)
  }

  if (auth) {
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts)

  return response.json()
}

export {
	login,
	getUsers,
	getPosts,
	register,
	createProfile,
	getUser,
	createPost,
	createCohort,
}
