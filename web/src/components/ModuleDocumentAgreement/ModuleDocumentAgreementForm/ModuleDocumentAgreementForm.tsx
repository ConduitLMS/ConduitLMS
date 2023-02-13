import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { EditModuleDocumentAgreementById, UpdateModuleDocumentAgreementInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormModuleDocumentAgreement = NonNullable<EditModuleDocumentAgreementById['moduleDocumentAgreement']>

interface ModuleDocumentAgreementFormProps {
  moduleDocumentAgreement?: EditModuleDocumentAgreementById['moduleDocumentAgreement']
  onSave: (data: UpdateModuleDocumentAgreementInput, id?: FormModuleDocumentAgreement['id']) => void
  error: RWGqlError
  loading: boolean
}

const ModuleDocumentAgreementForm = (props: ModuleDocumentAgreementFormProps) => {
  const onSubmit = (data: FormModuleDocumentAgreement) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.moduleDocumentAgreement?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormModuleDocumentAgreement> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.moduleDocumentAgreement?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        
          <TextField
            name="description"
            defaultValue={props.moduleDocumentAgreement?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="content"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Content
        </Label>
        
          <TextField
            name="content"
            defaultValue={props.moduleDocumentAgreement?.content}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="content" className="rw-field-error" />

        <Label
          name="attachments"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Attachments
        </Label>
        
          <TextField
            name="attachments"
            defaultValue={props.moduleDocumentAgreement?.attachments}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="attachments" className="rw-field-error" />

        <Label
          name="confirm"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Confirm
        </Label>
        
          <CheckboxField
            name="confirm"
            defaultChecked={props.moduleDocumentAgreement?.confirm}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="confirm" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ModuleDocumentAgreementForm
