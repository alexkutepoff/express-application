export const transformDateToMysqlFormat = (dateString) => {
  return new Date(dateString).toISOString().slice(0, 19).replace("T", " ");
};
