require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: '',
    description: '',
    head: {
      titleTemplate: '',
      meta: [
        { name: 'description', content: '' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '' },
        { property: 'og:image', content: 'http://www.favicon.by/ico/5b0861b20e299.ico' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
        { property: 'og:card', content: '' },
        { property: 'og:site', content: '@NightFury2' },
        { property: 'og:creator', content: '@NightFury2' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
