/** === IMPORT PACKAGES ===  */
import React, { FC, ReactNode, useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
/** === IMPORT COMPONENTS AND UTILS ===  */
import { SnbIcon, SnbText, color } from '@sinbad/react-native-sinbad-ui';
/** === TYPE === */
interface UnavailableAccordionProps {
  totalRemaining: number;
  handleScrollToBottom: () => void;
  children: ReactNode;
}
/** === COMPONENT === */
export const UnavailableAccordionView: FC<UnavailableAccordionProps> = ({
  totalRemaining,
  handleScrollToBottom,
  children,
}) => {
  /** == HOOK === */
  const [isOpen, setOpen] = useState<boolean>(false);
  // const scrollRef = useRef<ScrollView>(null);
  /** == VIEW === */
  if (totalRemaining === 0) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      {isOpen && <>{children}</>}
      <TouchableWithoutFeedback
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((prev) => !prev);
          handleScrollToBottom();
        }}>
        <View style={AccordionStyle.panel}>
          <SnbText.B4 color={color.blue50}>
            {isOpen
              ? 'Sembunyikan'
              : `Tampilkan ${totalRemaining} produk lainnya`}
          </SnbText.B4>
          <SnbIcon
            color={color.blue50}
            name={isOpen ? 'expand_less' : 'expand_more'}
            size={30}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
/** === STYLE === */
const AccordionStyle = StyleSheet.create({
  panel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: color.black10,
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
});
