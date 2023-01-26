export const schema = gql`
  type User {
    id: Int!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    email: String!
    firstName: String
    lastName: String
    organizationId: Int
    webAuthnChallenge: String
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    email: String!
    firstName: String
    lastName: String
    organizationId: Int
    webAuthnChallenge: String
  }

  input UpdateUserInput {
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    email: String
    name: String
    webAuthnChallenge: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
