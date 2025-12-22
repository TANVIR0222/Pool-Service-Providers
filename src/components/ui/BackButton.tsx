import { IconsBack } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

type BackButtonProps = {
  title?: string;
};

const BackButton = ({ title }: BackButtonProps) => {
  const router = useRouter();

  return (
    <View style={tw`flex-row items-center gap-2 my-4 `}>
      <TouchableOpacity onPress={() => router.back()}>
        <SvgXml xml={IconsBack} />
      </TouchableOpacity>
      <Text style={tw`text-2xl text-title_color font-roboto-600`}>{title}</Text>
    </View>
  );
};

export default BackButton;
