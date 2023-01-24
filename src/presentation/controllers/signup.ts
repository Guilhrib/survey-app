import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpPesponse } from './../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpPesponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return {
      statusCode: 0,
      body: ''
    }
  }
}
