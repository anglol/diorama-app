import { TxKeyPath } from "app/i18n";
import { colors, typography } from "app/theme";
import { FC } from "react";
import {
  Dimensions,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Image,
} from "react-native";
import { Text } from "app/components";

export interface SlideProps {
  source: any;
  titleKey: TxKeyPath;
  textKey: TxKeyPath;
}

export const Slide: FC<SlideProps> = ({ source, titleKey, textKey }) => {
  return (
    <View style={$slide}>
      <Image style={$image} source={source} />
      <View style={$meta}>
        <Text style={$title} tx={titleKey} />
        <Text style={$text} tx={textKey} />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const $slide: ViewStyle = {
  width: screenWidth,
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const $meta: ViewStyle = {
  flex: 1,
  padding: 16,
  width: screenWidth,
};

const $image: ImageStyle = {
  flex: 4,
  resizeMode: "cover",
  width: screenWidth,
};

const $title: TextStyle = {
  fontSize: 24,
  lineHeight: 30,
  marginBottom: 16,
  color: colors.oc.gray9,
  fontFamily: typography.fonts.poppins.bold,
};

const $text: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
  color: colors.oc.gray8,
  fontFamily: typography.primary.regular,
};
