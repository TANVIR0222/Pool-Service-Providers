import tw from "@/src/lib/tailwind";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Wrapper from "../components/Wrapper";

export default function NotFoundScreen() {

  return (
    <Wrapper>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Feather name="alert-triangle" size={64} color="#FF6B6B" />
        <Text style={tw`text-3xl font-roboto-700 text-title_color mt-6`}>
          Page Not Found
        </Text>
        <Text style={tw`text-base text-sub_title_color text-center mt-2`}>
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={tw`mt-6 bg-button_color px-6 py-3 rounded-full`}
        >
          <Text style={tw`text-white font-roboto-500 text-base`}>
            Go Back Home
          </Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
}
