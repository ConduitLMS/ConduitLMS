export const schema = gql`
  type Department {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    organization: Organization!
    organizationId: Int!
    users: [User]!
  }

  type Query {
    departments: [Department!]! @requireAuth
    department(id: Int!): Department @requireAuth
  }

  input CreateDepartmentInput {
    name: String!
    description: String
    organizationId: Int!
  }

  input UpdateDepartmentInput {
    name: String
    description: String
    organizationId: Int
  }

  type Mutation {
    createDepartment(input: CreateDepartmentInput!): Department! @requireAuth
    updateDepartment(id: Int!, input: UpdateDepartmentInput!): Department!
      @requireAuth
    deleteDepartment(id: Int!): Department! @requireAuth
  }
`
