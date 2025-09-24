'use client'

import { queryOptions, useQuery } from '@tanstack/react-query'
import { User } from '@/payload-types'
import { QueryConfig } from '@/lib/tanstack-query'

const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/users/me')
    if (response.ok) {
      const { user } = await response.json()
      return user
    }
    return null
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}

const getUserQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: fetchUser,
  })

export const useUser = ({
  queryConfig,
}: {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>
} = {}) => useQuery({ ...getUserQueryOptions(), ...queryConfig })
