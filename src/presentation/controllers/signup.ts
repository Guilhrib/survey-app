import { HttpRequest, HttpPesponse } from './../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpPesponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }

    return {
      statusCode: 0,
      body: ''
    }
  }
}
