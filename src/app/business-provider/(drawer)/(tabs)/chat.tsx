import CustomHeader from "@/src/components/CustomHeader";
import ChatView from "@/src/components/ui/ChatView";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import React from "react";
import { View } from "react-native";

const Chat = () => {
  return (
    <Wrapper>
      <View style={tw` flex-1`}>
        <CustomHeader />
        <ChatView />
      </View>
    </Wrapper>
  );
};

export default Chat;
