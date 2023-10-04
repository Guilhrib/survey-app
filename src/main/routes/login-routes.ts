/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
