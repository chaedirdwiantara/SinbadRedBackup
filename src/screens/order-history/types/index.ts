export const labelStatus: {
  [key: string]: 'success' | 'error' | 'information' | 'warning';
} = {
  delivered: 'success',
  created: 'warning',
  packed: 'information',
  shipped: 'information',
  done: 'success',
  cancelled: 'error',
  delivery_failed: 'error',
};
