interface IFocusPoint {
  focusPointHeight: number;
  focusPointWidth: number;
  marginBottom?: number;
}

export interface ICamera {
  focusPoints: IFocusPoint[];
  title: string;
  subtitle: string;
  type?: string;
}
