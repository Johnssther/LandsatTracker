import axios from 'axios';
import 'leaflet/dist/leaflet.css';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
