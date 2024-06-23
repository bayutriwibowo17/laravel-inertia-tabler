import axios from "axios";
window.axios = axios;

import "@tabler/core/dist/js/tabler.esm";

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
