import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const verifyToken = async () => {
  try {
    const tokenString = cookies().get("adventure_hub_jwt")?.value || "";
    if (tokenString) {
      const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const { payload } = await jwtVerify(tokenString, key, {
        algorithms: ["HS256"],
      });
      if (payload) {
        return {
          isValid: true,
          userInfo: payload,
        };
      }
    } else {
      return {
        isValid: false,
        userInfo: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isValid: false,
      userInfo: null,
    };
  }
};
