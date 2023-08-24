import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { EmailValidation } from './email-validation'

interface StuTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): StuTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email' })
    expect(emailSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })

  test('Shoul return null if EmailValidator returns true', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: 'any_email' })
    expect(error).toBeNull()
  })
})
