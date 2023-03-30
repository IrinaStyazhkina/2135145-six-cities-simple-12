export function getMonthAndYear(date: string){
  const convertedToDate = new Date(date);
  return `${convertedToDate.toLocaleString('default', {month: 'long'})} ${convertedToDate.getFullYear()}`;
}
