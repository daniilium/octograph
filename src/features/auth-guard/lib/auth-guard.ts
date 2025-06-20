import { ParsedLocation, redirect } from '@tanstack/react-router'

const PUBLIC_PATHS = new Set(['/', '/login', '/signup'])
const GUEST_ONLY = new Set(['/login', '/signup'])
const PAGE_REGEX = /^\/page\/[^/]+$/

export function authGuard(location: ParsedLocation, isAnonUser: boolean) {
  if (!isAnonUser) {
    if (GUEST_ONLY.has(location.pathname)) {
      throw redirect({
        to: '/',
        replace: true,
      })
    }
    return
  }

  const { pathname } = location

  const isPublic = PUBLIC_PATHS.has(pathname) || PAGE_REGEX.test(pathname)

  if (isPublic) return

  throw redirect({
    to: '/login',
    search: { redirect: location.href },
    replace: true,
  })
}
