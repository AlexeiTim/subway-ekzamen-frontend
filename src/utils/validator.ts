import { VALIDATOR_ERRORS } from "@/constants/errors"

class ElementPlusValidator {

  notEmptyField(_: any, text: string, callback: any) {
    if (text.length > 0) return callback()
    else return callback(new Error(VALIDATOR_ERRORS.EMPTY_FIELD))
  }
}


export const Validator =  new ElementPlusValidator()