import config from '../config.json';

// eslint-disable-next-line no-undef
export default config[process.env] || config.development;
