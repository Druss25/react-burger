export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const removeTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const accessToken = localStorage.getItem('accessToken') as string
export const refreshToken = localStorage.getItem('refreshToken') as string

export const checkAccessToken = !!accessToken as boolean
export const checkRefreshToken = !!refreshToken as boolean
