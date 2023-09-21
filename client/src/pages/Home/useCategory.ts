export const useCategory = (cat: string | null) => {
  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return cat ? capitalizeFirstLetter(cat.split("=")[1]) : null;
};
