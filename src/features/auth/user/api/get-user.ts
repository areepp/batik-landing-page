import { QueryConfig } from '@/lib/react-query'
import { User } from '@/payload-types'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/users/me')
    if (!response.ok) {
      return null
    }
    const { user } = await response.json()
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}

const getUserQueryOptions = () =>
  queryOptions({
    queryKey: ['auth-user'],
    queryFn: getUser,
  })

export const useGetUser = ({
  queryConfig,
}: {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>
} = {}) => useQuery({ ...getUserQueryOptions(), staleTime: Infinity, ...queryConfig })
