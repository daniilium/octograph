import cookies from 'browser-cookies'

export const removeToken = () => {
  cookies.erase('token')
}
