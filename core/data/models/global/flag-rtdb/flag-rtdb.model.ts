/** => flag RTDB */
export interface FlagRTDB {
  isCheckoutLoading: boolean;
  isInitiateCheckoutLoading: boolean;
  confirmOrderLoading: string;
  ocrStatus: 'none' | 'processing' | 'done' | 'error';
}
/** => for changa data flag */
export interface FlagRTDBData {
  key: string;
  value: string | boolean;
}
