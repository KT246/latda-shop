import { redirect } from "next/navigation";
import useAuthStore from "../store/authStores";

export function protectRoute() {
  const { token } = useAuthStore.getState();

  if (!token) {
    return redirect("/login");
  }
}
