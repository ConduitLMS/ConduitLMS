import ModuleDocumentAgreementCell from 'src/components/ModuleDocumentAgreement/ModuleDocumentAgreementCell'

type ModuleDocumentAgreementPageProps = {
  id: number
}

const ModuleDocumentAgreementPage = ({ id }: ModuleDocumentAgreementPageProps) => {
  return <ModuleDocumentAgreementCell id={id} />
}

export default ModuleDocumentAgreementPage
