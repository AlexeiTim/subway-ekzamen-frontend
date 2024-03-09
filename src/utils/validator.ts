import { VALIDATOR_ERRORS } from "@/constants/errors"

class Validator {

  notEmptyField(_: any, text: string, callback: any) {
    if (text.length > 0) return callback()
    else return callback(new Error(VALIDATOR_ERRORS.EMPTY_FIELD))
  }
}


export default new Validator()