/** => flag RTDB */
export interface FlagRTDB {
  isCheckoutLoading: boolean;
  isInitiateCheckoutLoading: boolean;
  potentialDiscountId: string | null;
  isPotentialDiscountLoading: boolean;
}
/** => for changa data flag */
export interface FlagRTDBData {
  key: string;
  value: string | boolean;
}
