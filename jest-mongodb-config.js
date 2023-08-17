module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '6.0.8',
      skipMD5: true
    },
    autoStart: false
  }
}
