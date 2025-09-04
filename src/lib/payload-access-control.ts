import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes('admin'))
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // If the user is an admin, they can access all documents
  if (user?.roles?.includes('admin')) {
    return true
  }

  // If the user is not an admin, they can only access their own document
  if (user) {
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Deny access if the user is not logged in
  return false
}
