import { RegisterType } from "../components/auth/Register"
// import { LoginType } from "../components/auth/Login"
import instanceAxios from "../ultis/configAxios"

const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await instanceAxios.post("/login", credentials);
      return data;
    } catch (error) {
        console.log(error);
    }
  };

const register = async (user: RegisterType) => {
    try {
        const { data } = await instanceAxios.post('/register', user);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const authServices = {
    login,
    register
}