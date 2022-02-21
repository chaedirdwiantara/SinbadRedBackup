export const serializeQs = (queryString: { [key: string]: any }): string => {
  const queryParams = [];

  for (let key in queryString) {
    if (
      queryString[key] !== undefined &&
      queryString[key] !== null &&
      queryString[key] !== ''
    ) {
      queryParams.push(`${key}=${encodeURIComponent(queryString[key])}`);
    }
  }

  return queryParams.join('&');
};

export const serializeUniformKeyQs = (key: string, array: any[]): string => {
  const queryParams = [];

  for (let elem in array) {
    if (array.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(elem)}`);
    }
  }

  return queryParams.join('&');
};
