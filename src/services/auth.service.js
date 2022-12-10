import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ email, password }) {
    return api
      .post("/auth/login", {
        email,
        password
      })
      .then((response) => {
        if (response.data.access_token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ email, password }) {
    return api.post("/auth/register", {
      email,
      password
    });
  }
}

export default new AuthService();