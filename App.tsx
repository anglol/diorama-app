import React from "react";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
} from "react-native-purchases";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import OnboardingScreen from "app/screens/OnboardingScreen/OnboardingScreen";
import HomeScreen from "app/screens/HomeScreen/HomeScreen";
import { customFontsToLoad } from "app/theme";

const Stack = createNativeStackNavigator();

export type AppStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  // CreateStory: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

export default function App() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [areFontsLoaded] = useFonts(customFontsToLoad);

  useEffect(() => {
    const setup = async () => {
      Purchases.configure({ apiKey: "appl_hpRXDFoKqLZoWjTAatokaTFXJld" });
      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);
    };

    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    setup().catch(console.log);
  }, []);

  if (!areFontsLoaded) return null;

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
