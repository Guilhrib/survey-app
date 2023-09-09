import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { AccountModel } from '../../../../domain/models/account'

let accountCollection: Collection

const makeFakeAccount = (): any => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccount())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeAccount())
    const account = await sut.loadByEmail('any_email')
    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('any_name')
    expect(account?.email).toBe('any_email')
    expect(account?.password).toBe('any_password')
  })

  test('Should return empty on if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email')
    expect(account).toBeFalsy()
  })

  test('Should update accessToken if updateAccessToken succeeds', async () => {
    const sut = makeSut()
    const result = await accountCollection.insertOne(makeFakeAccount())
    await sut.updateAccessToken(result.insertedId, 'any_token')
    const account = await accountCollection.findOne<AccountModel>({ _id: result.insertedId })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe('any_token')
  })
})
