/** === TYPE === */
interface ToCurrencyOptions {
  withPrefix?: boolean;
  withFraction?: boolean;
}
/** === FUNCTION === */
const toCurrency = (nominal: number, options: ToCurrencyOptions = {}) => {
  const { withPrefix = true, withFraction = true } = options;
  const usedOptions: Intl.NumberFormatOptions = { maximumFractionDigits: 0 };

  if (withPrefix) {
    usedOptions.style = 'currency';
    usedOptions.currency = 'IDR';
  }

  if (withFraction) {
    usedOptions.maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat('id-ID', usedOptions).format(nominal);
};

export { toCurrency };
