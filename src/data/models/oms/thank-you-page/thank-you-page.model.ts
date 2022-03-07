export interface ThankYouOrderDetailProps {
  id: string,
  code: string,
  expiredDate: string,
  vaAccountNo: string,
  payment_icon_url: string,
  totalOrderAmount: string,
  sellers:OrderSeller[],
  buyerAddress: OrderBuyerAddress,
  createdAt: string,
  updatedAt: string,
}

export interface OrderSeller {
  sellerId: number,
  sellerName: string,
  products : OrderSellerProduct[],
}

export interface OrderSellerProduct {
  productId: string,
  warehouseId: number,
  warehouseName: string,
  categoryId: string,
  brandId: string,
  brandName: string,
  productName: string,
  productImageUrl: string,
  qty: number,
  qtyPerBox: number,
  uomLabel: string,
  isPriceAfterTax: boolean,
  taxPercentage: number,
  lastUsedPrice: number,
  leadTime: number
}

export interface OrderBuyerAddress {
  longtitude: string,
  latitude: string,
  province: string,
  city: string,
  district: string,
  urban: string,
  zipCode: string,
  address: string,
  noteAddress: string,
  locationId: string  
}