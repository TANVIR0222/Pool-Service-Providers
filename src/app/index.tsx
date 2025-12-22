import * as Font from 'expo-font';
import { router, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from 'react-native';
import { storage } from '../lib/mmkvStorage';
import tw from '../lib/tailwind';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Load fonts first
        await Font.loadAsync({
          RobotoBlack: require("@/assets/fonts/Roboto-Black.ttf"),
          RobotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
          RobotoSemiBold: require("@/assets/fonts/Roboto-SemiBold.ttf"),
          RobotoLight: require("@/assets/fonts/Roboto-Light.ttf"),
          RobotoRegular: require("@/assets/fonts/Roboto-Regular.ttf"),
          RobotoMedium: require("@/assets/fonts/Roboto-Medium.ttf"),
        });

        // Wait for 800ms for a smooth experience
        await new Promise((resolve) => setTimeout(resolve, 800));

        //  Now navigate based on auth
        const [user_token, user_role] = [
          storage.getString("token"),
          storage.getString("role"),
        ];

        if (!user_token) {
          return router.replace('/welcome');
        }

        const destination =
          user_role === "1" ? "/home-owner" : "/business-provider";

        router.replace(destination);
      } catch (error) {
        console.error("App preparation failed:", error);
        router.replace('/welcome');
      } finally {
        SplashScreen.hideAsync(); //  Ensure splash screen hides
      }
    };

    prepareApp();
  }, []);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image source={require(`../../assets/images/image.png`)} />
      <View style={tw`absolute bottom-20`}>
        <ActivityIndicator size="large" color="#3E3E3F" />
      </View>
    </View>
  );
}
