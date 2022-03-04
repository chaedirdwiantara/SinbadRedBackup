import { styles, SnbText, color } from "react-native-sinbad-ui";
import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { ThankYouPageCardDivider } from "./thank-you-page-card-divider.component";
import { ThankYouPageStyle } from "../styles/thank-you-page/thank-you-page.style";

interface ThankYouPageCardProps {
  title: string;
  gutter?: boolean;
  contentTopSpaces?: number;
  headerButton?: boolean;
  headerButtonTitle? : string;
}
export const ThankYouPageCard: FC<ThankYouPageCardProps> = ({
  title,
  gutter = true,
  headerButton = false,
  headerButtonTitle,
  contentTopSpaces,
  children,
}) => (
  <View>
    <View style={gutter ? styles.shadowForBox10 : {}}>
      <View style={ThankYouPageStyle.cardHeader}>
        <SnbText.H4>{title}</SnbText.H4>
        {headerButton && (
        <TouchableOpacity onPress={()=> console.log('ok')}>
          <SnbText.B3 color={color.blue50}>{headerButtonTitle}</SnbText.B3>
        </TouchableOpacity>
        )}
      </View>
      <View style={{ paddingHorizontal: 16 }}>
         <ThankYouPageCardDivider />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          paddingTop: contentTopSpaces,
        }}>
        {children}
      </View>
    </View>
    {gutter && <View style={{ height: 10, backgroundColor: color.black5 }} />}
  </View>
)