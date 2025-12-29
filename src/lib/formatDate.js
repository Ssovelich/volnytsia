export const formatDate = (dateString) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
};
