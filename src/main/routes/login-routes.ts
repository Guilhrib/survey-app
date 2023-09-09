/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeSignupController } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
