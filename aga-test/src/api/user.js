import axios from "axios/index";

const user = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
});

const getUserList = () => user.get();

export default getUserList;
