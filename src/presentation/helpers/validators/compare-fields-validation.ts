import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
    return null
  }
}
