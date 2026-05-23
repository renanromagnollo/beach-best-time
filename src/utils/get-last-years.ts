export function getLastYears(
  amount = 3
) {
  const currentYear =
    new Date().getFullYear();

  return Array.from(
    { length: amount },

    (_, index) =>
      currentYear -
      amount +
      index
  );
}