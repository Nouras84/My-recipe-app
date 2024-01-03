// import axios from "axios";

// class AuthService {
//   constructor() {
//     this.api = axios.create({
//       baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`,
//     });
//   }

//   login = (email, password) => {
//     return this.api.post(`/login`, { email, password });
//   };

//   register = (username, email, password) => {
//     return this.api.post(`/register`, {
//       username,
//       email,
//       password,
//     });
//   };

//   logout = () => {
//     localStorage.removeItem("authToken");
//   };
// }

// export default new AuthService();
import axios from "axios";

class AuthService {
  login = (email, password) => {
    return axios.post(`https://recipe-app-0ddk.onrender.com/auth/login`, {
      email,
      password,
    });
  };

  register = (username, email, password) => {
    return axios.post(`https://recipe-app-0ddk.onrender.com/auth/register`, {
      username,
      email,
      password,
    });
  };

  logout = () => {
    localStorage.removeItem("authToken");
  };
}

export default new AuthService();
