import { User } from '@/payload-types'

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/users/me')
    if (!response.ok) {
      return null
    }
    const { user } = await response.json()
    return user
  } catch (error) {
    return null
  }
}
