import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

import type { EditModuleById, UpdateModuleInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormModule = NonNullable<EditModuleById['module']>

interface ModuleFormProps {
  module?: EditModuleById['module']
  onSave: (data: UpdateModuleInput, id?: FormModule['id']) => void
  error: RWGqlError
  loading: boolean
}

const ModuleForm = (props: ModuleFormProps) => {
  const onSubmit = (data: FormModule) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.module?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormModule> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.module?.name}
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
            defaultValue={props.module?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="moduleType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Module type
        </Label>
        
          
          
        <div className="rw-check-radio-items">
          <RadioField
            id="module-moduleType-0"
            name="moduleType"
            defaultValue="DOCUMENTAPPROVAL"
            defaultChecked={props.module?.moduleType?.includes('DOCUMENTAPPROVAL')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Documentapproval
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="module-moduleType-1"
            name="moduleType"
            defaultValue="QUIZ"
            defaultChecked={props.module?.moduleType?.includes('QUIZ')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Quiz
          </div>
        </div>
          
        

        <FieldError name="moduleType" className="rw-field-error" />

        <Label
          name="questionJson"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Question json
        </Label>
        
          <TextAreaField
            name="questionJson"
            defaultValue={JSON.stringify(props.module?.questionJson)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsJSON: true }}
          />
        

        <FieldError name="questionJson" className="rw-field-error" />

        <Label
          name="answerKey"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Answer key
        </Label>
        
          <TextAreaField
            name="answerKey"
            defaultValue={JSON.stringify(props.module?.answerKey)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsJSON: true }}
          />
        

        <FieldError name="answerKey" className="rw-field-error" />

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

export default ModuleForm
