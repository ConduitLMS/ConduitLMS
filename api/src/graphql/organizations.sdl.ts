export const schema = gql`
  type Organization {
    id: Int!
    name: String!
    contactEmail: String
    description: String
    address: String
    logo: String
    country: String
    createdAt: DateTime!
    updatedAt: DateTime!
    users: [User]!
    departments: [Department]!
  }

  type Query {
    organizations: [Organization!]! @requireAuth
    organization(id: Int!): Organization @requireAuth
  }

  input CreateOrganizationInput {
    name: String!
    contactEmail: String
    description: String
    address: String
    logo: String
    country: String
  }

  input UpdateOrganizationInput {
    name: String
    contactEmail: String
    description: String
    address: String
    logo: String
    country: String
  }

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization! @skipAuth
    updateOrganization(
      id: Int!
      input: UpdateOrganizationInput!
    ): Organization! @requireAuth
    deleteOrganization(id: Int!): Organization! @requireAuth
  }
`
