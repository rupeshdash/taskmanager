export const getTodayDate = (): string => {
  const today = new Date();
  // Format the date as YYYY-MM-DD
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); 
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
