import { styles, SnbText2, colorV2 } from "react-native-sinbad-ui";
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
  headerButtonAction? : any;
}
export const ThankYouPageCard: FC<ThankYouPageCardProps> = ({
  title,
  gutter = true,
  headerButton = false,
  headerButtonTitle,
  contentTopSpaces,
  headerButtonAction,
  children,
}) => (
  <View>
    <View style={gutter ? styles.shadowForBox10 : {}}>
      <View style={ThankYouPageStyle.cardHeader}>
        <SnbText2.Headline.Small>{title}</SnbText2.Headline.Small>
        {headerButton && (
        <TouchableOpacity onPress={()=> headerButtonAction()}>
          <SnbText2.Body.Small color={colorV2.textColor.link}>{headerButtonTitle}</SnbText2.Body.Small>
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
    {gutter && <View style={{ height: 10, backgroundColor: colorV2.bgColor.neutral }} />}
  </View>
)