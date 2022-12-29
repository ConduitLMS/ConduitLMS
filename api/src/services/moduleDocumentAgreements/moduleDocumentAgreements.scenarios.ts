import type { Prisma, ModuleDocumentAgreement } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard =
  defineScenario<Prisma.ModuleDocumentAgreementCreateArgs>({
    moduleDocumentAgreement: {
      one: {
        data: {
          name: 'String4828107',
          description: 'String',
          content: 'String',
          attachments: 'String',
          confirm: true,
        },
      },
      two: {
        data: {
          name: 'String5447771',
          description: 'String',
          content: 'String',
          attachments: 'String',
          confirm: true,
        },
      },
    },
  })

export type StandardScenario = ScenarioData<
  ModuleDocumentAgreement,
  'moduleDocumentAgreement'
>
