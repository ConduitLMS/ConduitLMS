export const schema = gql`
  type User {
    id: Int!
    organization: Organization!
    organizationId: Int!
    email: String!
    name: String
    departments: [Department]!
    roles: [Role]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    organizationId: Int!
    email: String!
    name: String
  }

  input UpdateUserInput {
    organizationId: Int
    email: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
