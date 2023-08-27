import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'any_field_to_compare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_name',
      any_field_to_compare: 'any_different_name'
    })
    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_name',
      any_field_to_compare: 'any_name'
    })
    expect(error).toBeNull()
  })
})
