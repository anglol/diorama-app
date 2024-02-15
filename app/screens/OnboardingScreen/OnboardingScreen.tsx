import React, { FC, useMemo, useRef, useState } from "react";
import { FlatList, View, ViewStyle, Dimensions, ViewToken } from "react-native";
import { StatusBar } from "expo-status-bar";
import Dots from "app/components/Dots";
import Button from "app/components/Button";
import { SlideProps, Slide } from "./components/Slide";
import { AppStackScreenProps } from "../../../App";

const screenWidth = Dimensions.get("window").width;

const data: SlideProps[] = [
  {
    source: require("assets/images/onboarding/onboarding_1.png"),
    titleKey: "onboarding.onboarding_1.title",
    textKey: "onboarding.onboarding_1.text",
  },
  {
    source: require("assets/images/onboarding/onboarding_2.png"),
    titleKey: "onboarding.onboarding_2.title",
    textKey: "onboarding.onboarding_2.text",
  },
  {
    source: require("assets/images/onboarding/onboarding_3.png"),
    titleKey: "onboarding.onboarding_3.title",
    textKey: "onboarding.onboarding_3.text",
  },
];

interface OnboardingScreenProps extends AppStackScreenProps<"Onboarding"> {}

// Screen
const OnboardingScreen: FC<OnboardingScreenProps> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<SlideProps> | null>(null);

  type ViewableItemsChanged = { viewableItems: ViewToken[] };
  const _onViewableItemsChanged = ({ viewableItems }: ViewableItemsChanged) => {
    setActiveIndex(viewableItems[0].index as number);
  };

  const onNext = () => {
    if (flatListRef.current && activeIndex < data.length - 1) {
      flatListRef.current.scrollToIndex({ index: activeIndex + 1 });
    } else {
      navigation.navigate("Home");
    }
  };

  const isLast = useMemo(() => activeIndex === data.length - 1, [activeIndex]);

  return (
    <View style={$main}>
      <StatusBar hidden />
      <View style={$slider}>
        <FlatList
          ref={flatListRef}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          style={$list}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={data}
          renderItem={({ item }) => <Slide {...item} />}
        />
      </View>
      <View style={$navigation}>
        <Dots total={data.length} index={activeIndex} />
        <Button
          onPress={onNext}
          buttonTx={isLast ? "onboarding.done" : "onboarding.next"}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const $list: ViewStyle = {
  height: "100%",
};

const $navigation: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  padding: 16,
  width: screenWidth,
  justifyContent: "space-between",
  alignItems: "center",
};

const $slider: ViewStyle = {
  flex: 10,
};

const $main: ViewStyle = {
  flex: 1,
};
