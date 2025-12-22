import {
  IconsActiveChat,
  IconsActiveDoller,
  IconsActiveHome,
  IconsActiveViewQuotes,
  IconsChat,
  IconsDoller,
  IconsHome,
  IconsViewQuotes,
} from "@/assets/icons";
import { HapticTab } from "@/src/components/HapticTab";
import tw from "@/src/lib/tailwind";
import { useUnredMessageQuery } from "@/src/redux/message/messageApi";
import { Tabs, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Platform, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function TabLayout() {

  const { data, refetch } = useUnredMessageQuery(null);
  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  )

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            left: 10,
            right: 10,
            paddingTop: 8,
            paddingBottom: 16,
            paddingHorizontal: 16,
            backgroundColor: "#F9FEFF",
          },
          default: {
            backgroundColor: "#F9FEFF",
            paddingHorizontal: 16,
            paddingVertical: 8,
            paddingTop: 5,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <SvgXml xml={focused ? IconsActiveHome : IconsHome} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="view-quotes"
        options={{
          title: "View quotes",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View>
              <SvgXml xml={focused ? IconsActiveViewQuotes : IconsViewQuotes} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <SvgXml xml={focused ? IconsActiveDoller : IconsDoller} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ marginTop: 4 }}>
              <View style={tw`relative`}>
                <SvgXml xml={focused ? IconsActiveChat : IconsChat} />
                {!focused && data?.unread > 0 && (
                  <View
                    style={tw`absolute bottom-3 left-4 bg-red-600 w-4 h-4 rounded-full items-center justify-center px-1`}
                  >
                    <Text style={tw`text-[10px] text-white font-roboto-500`}>
                      {data.unread > 99 ? '99+' : data.unread}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
