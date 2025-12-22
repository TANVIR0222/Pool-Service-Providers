import TransactionView from "@/src/components/ui/TransactionView";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import React from "react";
import { Image, Text, View } from "react-native";

const Earnings = () => {




  return (
    <Wrapper>
      <View style={tw` flex-1`}>
        <View style={tw` relative`}>
          <Image
            source={require("@/assets/images/Transaction-ViewI-Image.png")}
            style={tw`w-full h-38 rounded-xl`}
          />
          <View
            style={tw`absolute top-[25%] left-0 right-0 px-6 flex-col gap-2.5`}
          >
            <Text style={tw`text-2xl text-white font-roboto-600`}>
              Transaction
            </Text>
            <Text style={tw`text-sm text-white font-roboto-500`}>
              You have to wait for service owners can accept your bid request.
            </Text>
          </View>
        </View>

        <View style={tw` flex-1`}>
          <TransactionView />
        </View>
      </View>
    </Wrapper>
  );
};

export default Earnings;
