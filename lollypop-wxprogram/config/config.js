const env = 'production'
const prod = env === 'production'
const API = prod ? 'https://api.bongmi.com/v1' : 'https://api-staging.bongmi.com/v1'
console.log(process)

module.exports = {
  API
}
