export const formattedNumber = (number: number) => {
  return number?.toLocaleString();
};

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  // Format dd-mm-dd hh:mm
  const utcDay = String(date.getUTCDate()).padStart(2, "0");
  const utcMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const shortYear = String(date.getUTCFullYear()).slice(2);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formatted = `${utcDay}-${utcMonth}-${shortYear} ${hours}:${minutes}`;
  return formatted;
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

  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const year = oneMonthAgo.getFullYear();
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, "0");
  const day = String(oneMonthAgo.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

type SoundType = "success" | "warning";

export const PlaySound = (type: SoundType) => {
  const sounds: Record<SoundType, string> = {
    success: "/successed.mp3",
    warning: "/wrong.mp3",
  };
  const audio = new Audio(sounds[type]);
  audio.play();
};
