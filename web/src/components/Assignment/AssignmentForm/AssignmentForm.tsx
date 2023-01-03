import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type { EditAssignmentById, UpdateAssignmentInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'



const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


type FormAssignment = NonNullable<EditAssignmentById['assignment']>

interface AssignmentFormProps {
  assignment?: EditAssignmentById['assignment']
  onSave: (data: UpdateAssignmentInput, id?: FormAssignment['id']) => void
  error: RWGqlError
  loading: boolean
}

const AssignmentForm = (props: AssignmentFormProps) => {
  const onSubmit = (data: FormAssignment) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.assignment?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAssignment> onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.assignment?.name}
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
            defaultValue={props.assignment?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.assignment?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="organizationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Organization id
        </Label>
        
          <NumberField
            name="organizationId"
            defaultValue={props.assignment?.organizationId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="organizationId" className="rw-field-error" />

        <Label
          name="assignedDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Assigned date
        </Label>
        
          <DatetimeLocalField
            name="assignedDate"
            defaultValue={formatDatetime(props.assignment?.assignedDate)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="assignedDate" className="rw-field-error" />

        <Label
          name="dueDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Due date
        </Label>
        
          <DatetimeLocalField
            name="dueDate"
            defaultValue={formatDatetime(props.assignment?.dueDate)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="dueDate" className="rw-field-error" />

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

export default AssignmentForm
