import { IconsMenu, IconsMenuNotification } from "@/assets/icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../lib/tailwind";
import { useUserGetProfileQuery } from "../redux/authApi/authApiSlice";
import { useGetAllNotificationsQuery } from "../redux/notifications/notificationsApi";
import { makeImage } from "../utils/image_converter";

type NavigationProp = DrawerNavigationProp<Record<string, object | undefined>>;

export default function CustomHeader() {
  const navigation = useNavigation<NavigationProp>();

  const { data } = useUserGetProfileQuery();
  const { data: messageCount, refetch } = useGetAllNotificationsQuery(null);


  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  )

  return (
    <View style={tw`flex-row justify-between items-center  py-2`}>
      <View style={tw`flex-row  gap-2`}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <SvgXml xml={IconsMenu} />
        </TouchableOpacity>

        <View style={tw`flex-col gap-1 `}>
          <Text style={tw` text-2xl text-title_color font-roboto-600`}>
            {data?.data?.full_name}
          </Text>
          <Text style={tw`text-xs text-sub_title_color font-roboto-400`}>
            {data?.data?.location?.slice(0, 40) || " updated location"}

          </Text>
        </View>
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity
          style={tw`bg-[#ECF1F6] relative w-11 h-11 rounded-full items-center justify-center`}
          onPress={() => router.push("/common/notification")}
        >
          <SvgXml xml={IconsMenuNotification} />

          {messageCount?.unread_count > 0 && (
            <View
              style={tw`absolute -top-1 -right-1 bg-red-600 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1`}
            >
              <Text style={tw`text-[10px] text-white font-roboto-500`}>
                {messageCount?.unread_count > 99
                  ? "99+"
                  : messageCount?.unread_count}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-[#ECF1F6] h-12 w-12 rounded-full items-center justify-center`}
          onPress={() => router.push("/user-profile")}
        >
          <Image
            source={{ uri: makeImage(data?.data?.avatar) }}
            style={tw`w-10 h-10 rounded-full`}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
}
