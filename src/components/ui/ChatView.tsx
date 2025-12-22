
import { instagramTime } from "@/src/lib/lib";
import tw from "@/src/lib/tailwind";
import { useUserGetProfileQuery } from "@/src/redux/authApi/authApiSlice";
import { useGetAllChateUserQuery, useMarkAsReadMutation } from "@/src/redux/message/messageApi";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { io } from "socket.io-client";
import GlobalLoading from "../GlobalLoading";

const ChatView = () => {
  const { data, isLoading, refetch } = useGetAllChateUserQuery(null);
  const [messageRead] = useMarkAsReadMutation();
  const [refreshing, setRefreshing] = useState(false);

  const { data: userProfile, isLoading: userLoading } = useUserGetProfileQuery();


  const socket = io(`https://poolvalet.com:3000?userId=${userProfile?.data?.id}`, {
    transports: ["websocket"], // or ['polling', 'websocket'] depending on your server configuration
  });
  // const socket = io(`http://10.10.10.65:3000?userId=${userProfile?.data?.id}`, {
  //   transports: ["websocket"], // or ['polling', 'websocket'] depending on your server configuration
  // });

  React.useEffect(() => {
    socket.on("connect", () => {
      socket.on("privateMessage", (data) => {
        refetch()
      })
    });

    socket.on("disconnect", () => { });

    socket.on("error", (error) => {
      console.warn("Socket Error:", error);
      // Handle general socket errors
    });
  }, [socket])


  const handleMarkAsRead = async (item: any) => {

    try {
      // Optimistic UI update

      // API call
      await messageRead({ sender_id: item?.id }).unwrap();

      // Navigate to chat
      router.push({
        pathname: "/common/[id]",
        params: { id: item?.id },
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
      // Rollback if API fails
    }
  };



  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  if (!data?.data?.length) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-title_color`}>No chats available</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    const isUnread = item?.unreadCount > 0;



    return isLoading ? <GlobalLoading /> : (
      <TouchableOpacity onPress={() => handleMarkAsRead(item)} style={tw`my-2`}>
        <View style={tw`flex-row items-center justify-between`}>
          {/* Left side: Avatar + Name + Last Message */}
          <View style={tw`flex-row items-center gap-2 flex-1`}>
            <Image source={{ uri: makeImage(item?.avatar) }} style={tw`w-12 h-12 rounded-full`} />

            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center`}>
                <Text
                  style={tw`text-base ${isUnread
                    ? "text-title_color font-roboto-700"
                    : "text-secondary_button_color font-roboto-600"
                    }`}
                  numberOfLines={1}
                >
                  {item?.full_name}
                </Text>
              </View>
              <Text
                style={tw`text-base ${isUnread
                  ? "text-title_color font-roboto-700"
                  : "text-secondary_button_color font-roboto-600"
                  }`}
                numberOfLines={1}
              >
                {item?.last_message}
              </Text>
            </View>
          </View>

          {/* Right side: Unread Badge + Date */}
          <View style={tw`items-end`}>
            {isUnread && (
              <View style={tw`bg-red-500 px-2 py-0.5 rounded-full mb-1`}>
                <Text style={tw`text-white text-xs font-roboto-500`}>{item?.unreadCount}</Text>
              </View>
            )}
            <Text
              style={tw`text-xs ${isUnread ? "text-secondary_button_color  font-roboto-500" : "text-gray-400 font-roboto-400"
                }`}
            >
              {instagramTime(item?.last_message_date)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`gap-3 flex-1 my-3`}>
      <FlatList

        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"   // iOS spinner color
            colors={["#000"]}  // Android spinner color
          />
        }
      />
    </View>
  );
};

export default ChatView;
