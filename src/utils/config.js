import config from '../config.json'

export default config[process.env] || config.development;