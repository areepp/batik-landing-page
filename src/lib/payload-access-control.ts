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

export const isHouseOwner: Access = ({ req: { user } }) => {
  if (user?.house) {
    return {
      house: {
        equals: typeof user.house === 'object' ? user.house.id : user.house,
      },
    }
  }

  return false
}

export const isHouseOwnerOrPublic: Access = ({ req: { user } }) => {
  if (user?.house && user?.roles?.includes('store-admin')) {
    return {
      house: {
        equals: typeof user.house === 'object' ? user.house.id : user.house,
      },
    }
  }

  return true
}

export const isCustomer: Access = ({ req: { user } }) => {
  if (user) {
    return {
      user: {
        equals: user.id,
      },
    }
  }
  return false
}

export const isOwner: Access = ({ req: { user } }) => {
  if (!user) {
    return false
  }
  return {
    user: {
      equals: user.id,
    },
  }
}
