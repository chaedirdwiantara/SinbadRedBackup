export const renderIF = (
  params: boolean,
  showComponent: React.ReactNode,
  hiddenComponent?: React.ReactNode | undefined,
) => (params ? showComponent : hiddenComponent);
