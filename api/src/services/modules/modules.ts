import type {
  QueryResolvers,
  MutationResolvers,
  ModuleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const modules: QueryResolvers['modules'] = () => {
  return db.module.findMany()
}

export const module: QueryResolvers['module'] = ({ id }) => {
  return db.module.findUnique({
    where: { id },
  })
}

export const createModule: MutationResolvers['createModule'] = ({ input }) => {
  return db.module.create({
    data: input,
  })
}

export const updateModule: MutationResolvers['updateModule'] = ({
  id,
  input,
}) => {
  return db.module.update({
    data: input,
    where: { id },
  })
}

export const deleteModule: MutationResolvers['deleteModule'] = ({ id }) => {
  return db.module.delete({
    where: { id },
  })
}

export const Module: ModuleRelationResolvers = {
  assignments: (_obj, { root }) => {
    return db.module.findUnique({ where: { id: root?.id } }).assignments()
  },
}
