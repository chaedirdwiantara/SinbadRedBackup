/** === FUNCTION === */
const capitalize = (str: string) => {
  return str.replace(/_/g, ' ').toUpperCase();
};

export { capitalize };
