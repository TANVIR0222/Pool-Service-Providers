import { IconsLogout } from "@/assets/icons";
import { storage } from "@/src/lib/mmkvStorage";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Alert, Pressable, Text } from "react-native";
import { SvgXml } from "react-native-svg";

const Logout = () => {

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await storage.delete("token");
          router.replace("/welcome");
        },
      },
    ]);
  };


  return (
    <Pressable onPress={() => handleLogout()} style={tw`flex-row items-center gap-2`}>
      <SvgXml xml={IconsLogout} />
      <Text style={tw` text-[#E53E3E] text-base  font-roboto-700`}>
        Log out
      </Text>
    </Pressable>
  );
};

export default Logout;
