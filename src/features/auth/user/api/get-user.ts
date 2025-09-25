import { User } from '@/payload-types'
import { useQuery } from '@tanstack/react-query'

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

export const useGetUser = () =>
  useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
    staleTime: Infinity,
  })
