import axios from "axios";

const Axios = axios.create({
  baseURL: "https://gorest.co.in/public/v1",
  timeout: 10000,
});

export default Axios;
