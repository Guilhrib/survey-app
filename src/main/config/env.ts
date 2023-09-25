export default {
  mongoUrl: global.__MONGO_URI__ || 'mongodb://mongo/27017/survey-app',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'ngfnj9872345++ohafg7$'
}
