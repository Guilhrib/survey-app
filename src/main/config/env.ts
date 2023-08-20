export default {
  mongoUrl: global.__MONGO_URI__ || 'mongodb://0.0.0.0:27017/survey-app',
  port: process.env.PORT ?? 5050
}
