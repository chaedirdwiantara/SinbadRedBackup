/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View } from 'react-native';
/** === INTERFACE === */
interface Props {
  column: number;
  data: any[];
  renderItem: any;
}
/** === COMPONENT === */
const Menu: React.FC<Props> = (props) => {
  /** => function */
  const findRow = () => {
    const e = Math.floor(props.data.length / props.column);
    if (props.data.length / props.column - e > 0) {
      return e + 1;
    }
    return e;
  };
  /** => row */
  const row = () => {
    const square = [];
    for (let i = 0; i < findRow(); i++) {
      square.push(<View key={i}>{column(i)}</View>);
    }
    return <>{square}</>;
  };
  /** => column */
  const column = (skip: number) => {
    const square = [];
    for (
      let i = skip * props.column;
      i < skip * props.column + props.column;
      i++
    ) {
      square.push(
        <View key={i} style={{ flex: 1 }}>
          {props.renderItem({ item: props.data[i], index: i })}
        </View>,
      );
    }
    return <View style={{ flexDirection: 'row' }}>{square}</View>;
  };
  /** => main */
  return row();
};

export default Menu;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
