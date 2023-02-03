export const schema = gql`
  type Assignment {
    id: Int!
    name: String!
    description: String!
    user: User!
    userId: Int!
    organization: Organization!
    organizationId: Int!
    assignedDate: DateTime!
    dueDate: DateTime!
    progress: Int!
  }

  type Query {
    assignments: [Assignment!]! @requireAuth
    assignment(id: Int!): Assignment @requireAuth
  }

  input CreateAssignmentInput {
    name: String!
    description: String!
    userId: Int!
    organizationId: Int!
    assignedDate: DateTime!
    dueDate: DateTime!
  }

  input UpdateAssignmentInput {
    name: String
    description: String
    userId: Int
    organizationId: Int
    assignedDate: DateTime
    dueDate: DateTime
  }

  type Mutation {
    createAssignment(input: CreateAssignmentInput!): Assignment! @requireAuth
    updateAssignment(id: Int!, input: UpdateAssignmentInput!): Assignment!
      @requireAuth
    deleteAssignment(id: Int!): Assignment! @requireAuth
  }
`
