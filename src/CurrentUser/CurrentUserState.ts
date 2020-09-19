import CurrentUserModel from './CurrentUserModel'

interface CurrentUserState {
  user?: CurrentUserModel
  isAuthenticated: boolean
}

export default CurrentUserState