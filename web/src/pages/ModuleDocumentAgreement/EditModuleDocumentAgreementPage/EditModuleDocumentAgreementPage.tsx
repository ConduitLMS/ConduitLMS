import EditModuleDocumentAgreementCell from 'src/components/ModuleDocumentAgreement/EditModuleDocumentAgreementCell'

type ModuleDocumentAgreementPageProps = {
  id: number
}

const EditModuleDocumentAgreementPage = ({ id }: ModuleDocumentAgreementPageProps) => {
  return <EditModuleDocumentAgreementCell id={id} />
}

export default EditModuleDocumentAgreementPage
