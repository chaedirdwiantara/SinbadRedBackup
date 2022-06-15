/** === TYPE === */
interface ToCurrencyOptions {
  withPrefix?: boolean;
  withFraction?: boolean;
}
/** === FUNCTION === */
const toCurrency = (nominal: number = 0, options: ToCurrencyOptions = {}) => {
  const { withPrefix = true, withFraction = true } = options;
  const prefix = 'Rp';
  let transformed: string;

  if (withFraction) {
    transformed = nominal.toFixed(2);
  } else {
    transformed = nominal.toString();
  }

  const [currency, decimal] = transformed.split('.');
  const converted = `${currency.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}${
    withFraction ? ',' + decimal : ''
  }`;

  if (withPrefix) {
    return `${prefix}${converted}`;
  }

  return converted;
};

export { toCurrency };
