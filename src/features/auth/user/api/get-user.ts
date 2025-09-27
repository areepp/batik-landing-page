import { QueryConfig } from '@/lib/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getUserOnServer } from './user-actions'

const getUserQueryOptions = () =>
  queryOptions({
    queryKey: ['auth-user'],
    queryFn: getUserOnServer,
  })

export const useGetUser = ({
  queryConfig,
}: {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>
} = {}) => useQuery({ ...getUserQueryOptions(), staleTime: Infinity, ...queryConfig })
