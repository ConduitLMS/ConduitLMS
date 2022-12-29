export const schema = gql`
  type ModuleDocumentAgreement {
    id: Int!
    name: String!
    description: String!
    content: String!
    attachments: [String]!
    confirm: Boolean!
  }

  type Query {
    moduleDocumentAgreements: [ModuleDocumentAgreement!]! @requireAuth
    moduleDocumentAgreement(id: Int!): ModuleDocumentAgreement @requireAuth
  }

  input CreateModuleDocumentAgreementInput {
    name: String!
    description: String!
    content: String!
    attachments: [String]!
    confirm: Boolean!
  }

  input UpdateModuleDocumentAgreementInput {
    name: String
    description: String
    content: String
    attachments: [String]!
    confirm: Boolean
  }

  type Mutation {
    createModuleDocumentAgreement(
      input: CreateModuleDocumentAgreementInput!
    ): ModuleDocumentAgreement! @requireAuth
    updateModuleDocumentAgreement(
      id: Int!
      input: UpdateModuleDocumentAgreementInput!
    ): ModuleDocumentAgreement! @requireAuth
    deleteModuleDocumentAgreement(id: Int!): ModuleDocumentAgreement!
      @requireAuth
  }
`
