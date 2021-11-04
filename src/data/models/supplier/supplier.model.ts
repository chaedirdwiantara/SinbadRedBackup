import * as models from '@models';

export interface DataSuppliers {
  warehouseId: number;
  supplierStoreId: number;
  supplierId: number;
  clusterId?: number;
  typeId?: number;
  groupId?: number;
  channelId?: number;
  approvalStatus: 'guest' | 'rejected' | 'verified' | 'pending' | 'updating';
}

export interface SupplierSegmentationSuccessProps {
  storeId: number;
  isActiveStore: boolean;
  dataSuppliers: DataSuppliers;
}

export interface SupplierSegmentationItemProps
  extends models.DetailItemProps<SupplierSegmentationSuccessProps> {}

export interface SupplierSegmentationProps {
  segmentation: SupplierSegmentationItemProps;
}
