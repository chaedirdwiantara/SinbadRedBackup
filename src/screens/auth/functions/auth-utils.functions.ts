//** RENDER IF */
export const renderIF = (
  params: boolean,
  showComponent: React.ReactNode,
  hiddenComponent?: React.ReactNode | undefined,
) => (params ? showComponent : hiddenComponent);

//** FORMATTER TEXTINPUT */
export const formatter = (string = '', gaps: number[], spacer: string) => {
  if (!string) {
    return '';
  }
  const offsets = [0].concat(gaps).concat([string.length]);
  const temp = offsets
    .map((end, index) => {
      if (index === 0) {
        return '';
      }
      const start = offsets[index - 1];
      return string.substr(start, end - start);
    })
    .filter((part) => part !== '');

  return temp.join(spacer);
};

export const handleMessageError = (code: number) => {
  switch (code) {
    case 10401: {
      return 'Unauthorized';
    }
    default: {
      return 'Terjadi kesalahan pada jaringan';
    }
  }
};
