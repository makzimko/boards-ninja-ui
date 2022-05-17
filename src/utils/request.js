import axios from 'axios';

import config from './config';

const { apiBaseUrl } = config;

axios.defaults.baseURL = apiBaseUrl;
