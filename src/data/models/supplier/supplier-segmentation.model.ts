export interface DataSuppliers {
  warehouseId: number;
  supplierStoreId: number;
  sellerId: number;
  clusterId?: number | null;
  typeId?: number | null;
  groupId?: number | null;
  channelId?: number | null;
  approvalStatus: 'guest' | 'rejected' | 'verified' | 'pending' | 'updating';
}

export interface SupplierSegmentation {
  storeId: number;
  isActiveStore: boolean;
  dataSuppliers: DataSuppliers | null;
}
