import React from "react";
import { ScrollView } from "react-native";
import tw from "../lib/tailwind";

const ScrollViewWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw``}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewWrapper;
