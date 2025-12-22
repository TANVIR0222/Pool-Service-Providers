import CustomHeader from "@/src/components/CustomHeader";
import UserChatView from "@/src/components/ui/UserChatView";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import React from "react";
import { View } from "react-native";

const Chat = () => {
  return (
    <Wrapper>
      <CustomHeader />
      <View style={tw` flex-1`}>
        <UserChatView />
      </View>
    </Wrapper>
  );
};

export default Chat;
