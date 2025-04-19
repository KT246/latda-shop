export const formattedNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};
