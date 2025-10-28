import axios from "axios";

let instance=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export default instance