import { View, ViewStyle } from "react-native";
import { Button, Text } from "app/components";
import { Header } from "app/components/Header";

export default function HomeScreen() {
  return (
    <View style={$container}>
      <Header
        style={$header}
        title="Hi, Robin !"
        subtitle="Une petite histoire ?"
      />
      <Button buttonTx="home.button" buttonStyle={$button} onPress={() => {}} />
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
};

const $header: ViewStyle = {
  paddingBottom: 44,
};

const $button: ViewStyle = {
  marginHorizontal: 16,
  marginTop: -28,
  shadowColor: "rgba(0, 0, 0, 0.3)",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 4,
};
