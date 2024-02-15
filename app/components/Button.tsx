import { colors, typography } from "app/theme";
import React, { FC, useState } from "react";
import {
  View,
  Animated,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import Text from "./Text";
import { TxKeyPath } from "app/i18n";

type ButtonProps = {
  buttonStyle?: ViewStyle;
  textStyles?: TextStyle;
  buttonTx?: TxKeyPath;
  buttonText?: string;
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({
  buttonStyle: $buttonStyle,
  textStyles: $textStyles,
  buttonTx,
  buttonText,
  onPress,
}) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const [backgroundColor] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    onPress();
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.98, // Scale down to 95% of the original size
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 150, // Duration of the animation in milliseconds
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1, // Return to the original size
        friction: 100, // Adjust friction to make the animation smoother
        tension: 10,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 150, // Duration of the animation in milliseconds
        useNativeDriver: true,
      }),
    ]).start();
  };

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.oc.indigo5, colors.oc.indigo6], // Change colors as needed
  });

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          $button,
          $buttonStyle,
          { transform: [{ scale: scaleValue }] },
          { backgroundColor: interpolatedColor },
        ]}
      >
        <Text style={[$text, $textStyles]} tx={buttonTx}>
          {buttonText}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const $text: TextStyle = {
  fontFamily: typography.fonts.poppins.semiBold,
  color: colors.oc.white,
  fontSize: 16,
};

const $button: ViewStyle = {
  backgroundColor: colors.oc.indigo5,
  padding: 16,
  paddingHorizontal: 24,
  minHeight: 56,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
};

export default Button;
