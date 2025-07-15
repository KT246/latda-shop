export const formattedNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
export function formatDateNotime(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getTodayDate = (
  format: "yyyy-mm-dd" | "dd/mm/yyyy" = "yyyy-mm-dd"
): string => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  if (format === "dd/mm/yyyy") {
    return `${dd}/${mm}/${yyyy}`;
  }
  return `${yyyy}-${mm}-${dd}`;
};

export const getOneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date(today);

  // Lùi lại 1 tháng
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Format yyyy-mm-dd
  const year = oneMonthAgo.getFullYear();
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const day = String(oneMonthAgo.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
