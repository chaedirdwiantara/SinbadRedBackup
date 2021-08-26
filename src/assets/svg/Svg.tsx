import { SvgRegistery } from './svgRegistry';
/** === IMPORT LIB HERE === */
import React, { FC } from 'react';
/** === INTERFACE === */
interface Props {
  name: keyof typeof SvgRegistery;
  size: number;
  color?: string;
}
/** === COMPONENT === */
const Svg: FC<Props> = (props) => {
  const SvgIcon = SvgRegistery[props.name];
  return <SvgIcon height={props.size} width={props.size} fill={props.color} />;
};
/** === EXPORT COMPONENT === */
export default Svg;
