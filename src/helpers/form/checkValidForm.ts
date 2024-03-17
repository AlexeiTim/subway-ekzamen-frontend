import type { ValidateFieldsError } from "async-validator";
import type { FormInstance } from "element-plus";

type checkValidFormReturnValue = Promise<{ isValid: boolean, fieldErrors: ValidateFieldsError[] }>

export async function checkValidForm(formEl: FormInstance): checkValidFormReturnValue {
  let isValid = true
  const fieldErrors: ValidateFieldsError[] = []

  await formEl.validate((valid, fields) => {
    if (!valid) {
      isValid = false
      if (fields)
        fieldErrors.push(fields)
    }
  })

  return {
    isValid,
    fieldErrors
  }
}
