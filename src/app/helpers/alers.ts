import Swal, { SweetAlertIcon } from "sweetalert2";

export const SwalNotification = (title: string, icontext: string) => {
  return Swal.fire({
    title: title,
    icon: icontext as SweetAlertIcon,
  });
};
