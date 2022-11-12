export const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const removeTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const accessToken = localStorage.getItem('accessToken')
export const refreshToken = localStorage.getItem('refreshToken')

export const checkAccessToken = !!accessToken
export const checkRefreshToken = !!refreshToken
