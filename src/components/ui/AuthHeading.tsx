import tw from "@/src/lib/tailwind";
import { Text, View } from "react-native";

type AuthHeadingProps = {
  Heading: string;
  SubHeading: string;
};

const AuthHeading = ({ Heading, SubHeading }: AuthHeadingProps) => {
  return (
    <View>
      <View style={tw` w-full flex-col gap-3 mb-10`}>
        <Text style={tw`text-xl font-roboto-700 text-title_color text-center `}>
          {Heading}
        </Text>

        <Text
          style={tw`text-sm text-sub_title_color font-roboto-400 text-center `}
        >
          {SubHeading}
        </Text>
      </View>
    </View>
  );
};

export default AuthHeading;
