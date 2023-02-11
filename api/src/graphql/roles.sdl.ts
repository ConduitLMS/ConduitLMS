export const schema = gql`
  type Role {
    id: Int!
    name: String!
    description: String
    level: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [User]!
  }

  type Query {
    roles: [Role!]! @requireAuth
    role(id: Int!): Role @requireAuth
  }

  input CreateRoleInput {
    name: String!
    description: String
    level: Int!
  }

  input UpdateRoleInput {
    name: String
    description: String
    level: Int
  }

  type Mutation {
    createRole(input: CreateRoleInput!): Role! @requireAuth
    updateRole(id: Int!, input: UpdateRoleInput!): Role! @requireAuth
    deleteRole(id: Int!): Role! @requireAuth
  }
`
