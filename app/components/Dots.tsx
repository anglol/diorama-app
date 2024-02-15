import { colors } from "app/theme";
import React, { FC } from "react";
import { View, Animated, ViewStyle } from "react-native";

type DotsProps = {
  total: number;
  index: number;
};

const Dots: FC<DotsProps> = ({ total, index }) => {
  return (
    <View style={$dots}>
      {Array(total)
        .fill(0)
        .map((_, i) => (
          <Animated.View key={i} style={i === index ? $current : $dot} />
        ))}
    </View>
  );
};

const $dots: ViewStyle = {
  flexDirection: "row",
  gap: 10,
  alignItems: "center",
  flex: 1,
};

const $dot: ViewStyle = {
  height: 8,
  width: 8,
  backgroundColor: colors.oc.indigo4,
  borderRadius: 4,
};

const $current: ViewStyle = {
  ...$dot,
  backgroundColor: colors.oc.indigo5,
  transform: [{ scale: 1.5 }],
};

export default Dots;
