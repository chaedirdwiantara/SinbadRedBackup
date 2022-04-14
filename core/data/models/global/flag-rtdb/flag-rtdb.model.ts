/** => flag RTDB */
export interface FlagRTDB {
  isCheckoutLoading: boolean;
  isInitiateCheckoutLoading: boolean;
  confirmOrderLoading: string;
  ocr: IOcr;
}
/** => for changa data flag */
export interface FlagRTDBData {
  key: string;
  value: string | boolean;
}

interface IOcr {
  ocrData: any;
  ocrStatus: 'none' | 'processing' | 'success' | 'failed';
}
