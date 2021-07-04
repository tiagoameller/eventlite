import React from "react"

const FormErrors = (props) =>
  <div>
    <ul>
      {Object.keys(props.formErrors).map((formErrorField) => {
        return (
          props.formErrors[formErrorField].map((error) => {
            return (
              <li>{formErrorField} {error}</li>
            )
          })
        )
      })}
    </ul>
  </div>

export default FormErrors
