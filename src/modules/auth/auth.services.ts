import api from "@/common/libs/api-services";

export const login = async (email: string, password: string) => {
  const response = await api.safe.post("auth/login", {
    email,
    password,
  });

  return response;
};

export const forgotPassword = async (mail: string) => {
  return api.safe.post("users", {
    mail,
  });
};
