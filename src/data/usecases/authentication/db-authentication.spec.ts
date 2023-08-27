import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { AccountModel } from './db-authentication-protocols'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountByEmailStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => { resolve(account) })
    }
  }
  return new LoadAccountByEmailStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({ email: 'valid_email@mail.com', password: 'valid_password' })
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
