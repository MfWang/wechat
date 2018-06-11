const env = ''
const prod = env === 'production'
const API = prod ? 'https://api.bongmi.com/v1' : 'https://api-staging.bongmi.com/v1'

module.exports = {
  API
}
