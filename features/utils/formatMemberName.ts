export const formatMemberName = (name: string) => {
  if (!name) return "";
  return name.replace(/_/g, " ");
};
