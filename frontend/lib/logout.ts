import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    
    // Redirect to login
    router.push("/login");
  };

  return { logout };
};
