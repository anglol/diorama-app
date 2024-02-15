import React, { FC } from "react";

import { TextStyle, View, ViewStyle } from "react-native";
import { Button, Text } from "app/components";
import { colors, typography } from "app/theme";
import { TxKeyPath } from "app/i18n";

type Props = {
  title?: string;
  titleTx?: TxKeyPath;
  subtitle?: string;
  subtitleTx?: TxKeyPath;
  onBack?: () => void;
  style?: ViewStyle;
};

export const Header: FC<Props> = ({
  titleTx,
  title,
  subtitleTx,
  subtitle,
  onBack,
  style = {},
}) => {
  return (
    <>
      <View style={[$header, style]}>
        {onBack && <Button onPress={() => {}} buttonTx="common.back" />}
        <Text numberOfLines={1} style={$title} tx={titleTx}>
          {title}
        </Text>
        {subtitle && (
          <Text numberOfLines={1} style={$subtitle} tx={subtitleTx}>
            {subtitle}
          </Text>
        )}
      </View>
    </>
  );
};

const $backButton: ViewStyle = {
  marginBottom: 20,
};

const $header: ViewStyle = {
  padding: 16,
  paddingBottom: 16,
  height: 180,
  justifyContent: "flex-end",
  backgroundColor: colors.oc.indigo9,
};

const $title: TextStyle = {
  color: colors.oc.white,
  fontFamily: typography.fonts.poppins.bold,
  fontSize: 24,
  lineHeight: 30,
};

const $subtitle: TextStyle = {
  color: "white",
  fontFamily: typography.fonts.poppins.regular,
  fontSize: 16,
};
