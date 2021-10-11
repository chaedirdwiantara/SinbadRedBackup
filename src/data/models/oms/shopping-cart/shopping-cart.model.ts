export type DeterminateCheckboxStatus = 'selected' | 'unselect';

export type CheckboxStatus = DeterminateCheckboxStatus | 'indeterminate';

export interface CartProduct {
  name: string;
  qty: number;
  displayPrice: number;
  uom: string;
  imageUrl: string;
  selected: DeterminateCheckboxStatus;
  stock: number;
}

export interface CartBrand {
  name: string;
  products: Array<CartProduct>;
  selected: CheckboxStatus;
  selectedCount: number;
}

export interface CartInvoiceGroup {
  name: string;
  brands: Array<CartBrand>;
}
