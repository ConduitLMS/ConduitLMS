export const schema = gql`
  type Module {
    id: Int!
    name: String!
    description: String
    moduleType: ModuleTypes!
    questionJson: JSON
    answerKey: JSON
    assignments: [Assignment]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum ModuleTypes {
    DOCUMENTAPPROVAL
    QUIZ
  }

  type Query {
    modules: [Module!]! @requireAuth
    module(id: Int!): Module @requireAuth
  }

  input CreateModuleInput {
    name: String!
    description: String
    moduleType: ModuleTypes!
    questionJson: JSON
    answerKey: JSON
  }

  input UpdateModuleInput {
    name: String
    description: String
    moduleType: ModuleTypes
    questionJson: JSON
    answerKey: JSON
  }

  type Mutation {
    createModule(input: CreateModuleInput!): Module! @requireAuth
    updateModule(id: Int!, input: UpdateModuleInput!): Module! @requireAuth
    deleteModule(id: Int!): Module! @requireAuth
  }
`
