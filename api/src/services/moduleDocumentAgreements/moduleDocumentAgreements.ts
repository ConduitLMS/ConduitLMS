import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const moduleDocumentAgreements: QueryResolvers['moduleDocumentAgreements'] =
  () => {
    return db.moduleDocumentAgreement.findMany()
  }

export const moduleDocumentAgreement: QueryResolvers['moduleDocumentAgreement'] =
  ({ id }) => {
    return db.moduleDocumentAgreement.findUnique({
      where: { id },
    })
  }

export const createModuleDocumentAgreement: MutationResolvers['createModuleDocumentAgreement'] =
  ({ input }) => {
    return db.moduleDocumentAgreement.create({
      data: input,
    })
  }

export const updateModuleDocumentAgreement: MutationResolvers['updateModuleDocumentAgreement'] =
  ({ id, input }) => {
    return db.moduleDocumentAgreement.update({
      data: input,
      where: { id },
    })
  }

export const deleteModuleDocumentAgreement: MutationResolvers['deleteModuleDocumentAgreement'] =
  ({ id }) => {
    return db.moduleDocumentAgreement.delete({
      where: { id },
    })
  }
