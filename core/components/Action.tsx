/** === IMPORT PACKAGE === */
import React, { FC, useState } from 'react';
import { 
  View, 
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import { SnbIcon, color, SnbText } from 'react-native-sinbad-ui';

/** === TYPE === */
interface ModalBottomType1Props {
  sortData: any;
  sortDataIndex: number;
  parentFunction: (any: any) => void;
}

const SortMenuType1: FC<ModalBottomType1Props> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [sortData, setSortData] = useState(null);
  const [sortDataIndex, setSortDataIndex] = useState<number | null>(null)

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === SEND DATA TO PARENT === */
  const toParentFunction = () => {
    props.parentFunction({
      type: 'sortSelected',
      data: {
        sortDataIndex: sortDataIndex,
        data: sortDataIndex !== null ? sortData : null
      }
    });
  }
  /** === CHECK SELECTED SORT ITEM === */
  const checkSort = (item: any, index: number) => {
    if (index === sortDataIndex) {
      setSortDataIndex(null)
    } else {
      setSortDataIndex(index);
      setSortData(item);
    }
  }

  /**
   * ==========================
   * RENDER VIEW
   * ==========================
   */
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => checkSort(item, index)}
        >
          <View style={styles.boxContentItem}>
            <View style={{ flex: 1 }}>
              <SnbText.C1>{item.name}</SnbText.C1>
            </View>
            <View style={styles.boxIconRight}>
              {sortDataIndex === index ? (
                <SnbIcon
                  name="radio-button-checked"
                  color={color.red50}
                  size={24}
                />
              ) : (
                <SnbIcon
                  name="radio-button-unchecked"
                  color={color.black40}
                  size={24}
                />
              )}
            </View>
          </View>
          <View style={[styles.lines, { marginLeft: 16 }]} />
        </TouchableOpacity>
      );
    });
  }

  /** === RENDER BUTTON === */
  // const renderButton = () => {
  //   return (
  //     <ButtonSingle
  //       disabled={sortDataIndex === props.sortDataIndex}
  //       title={'Terapkan'}
  //       borderRadius={4}
  //       onPress={() => toParentFunction()}
  //     />
  //   );
  // }

  return (
    <View style={styles.mainContainer}>
      {renderContent()}
      {/* {renderButton()} */}
    </View>
  )
}

const styles = StyleSheet.create({
  lines: {
    borderTopWidth: 1,
    borderColor: color.black10
  },
  mainContainer: {
    flex: 1,
    backgroundColor: color.white
  },
  boxContentItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boxIconRight: {
    position: 'absolute',
    right: 20
  }
});

export const Action = { SortMenuType1 }

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Maulana Ghozi
 * createdDate:
 * updatedBy: 
 * updatedDate: 
 * updatedFunction:
 *
 */