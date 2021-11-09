import * as models from '@models';

export interface DataSuppliers {
  warehouseId: number;
  supplierStoreId: number;
  sellerId: number;
  clusterId?: number;
  typeId?: number;
  groupId?: number;
  channelId?: number;
  approvalStatus: 'guest' | 'rejected' | 'verified' | 'pending' | 'updating';
}

export interface SupplierSegmentation {
  storeId: number;
  isActiveStore: boolean;
  dataSuppliers: DataSuppliers;
}
export interface SupplierSegmentationProps {
  segmentation: models.DetailItemProps<SupplierSegmentation>;
}
