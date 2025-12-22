import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useDeviceContext } from "twrnc";
import tw from "../lib/tailwind";
import store from "../redux/redux-store/store";



export default function RootLayout() {


  const { bottom } = useSafeAreaInsets()
  useDeviceContext(tw)


  return (
    <StripeProvider publishableKey={`pk_test_51S19CXDkDoWa6fU63neKFEoXPPzgDkj3L2x6JLYkvElqfFZmNT6x3YGFvdz1QPEG8i5Q81UgiLf8LjgFLSaMEU8w00O03NWCoj`}>
      <Provider store={store}>
        <View style={{ paddingBottom: bottom, flex: 1 }} >
          <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Stack */}
            <Stack.Screen name="index" />
            {/* Not Found Screen */}
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="common" />
          </Stack>
        </View>
      </Provider>
    </StripeProvider>
  );
}
