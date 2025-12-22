

import { Icons3Dot, IconsBack, IconsDleled, IconsImageDeleted, IconsSend } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import GallaryImage from "@/src/components/ui/GallaryImage";
import Wrapper from "@/src/components/Wrapper";
import { instagramTime } from "@/src/lib/lib";
import tw from "@/src/lib/tailwind";
import { useUserGetProfileQuery } from "@/src/redux/authApi/authApiSlice";
import { useDeletedMySingleMessageMutation, useGetMySingleMessageQuery, useImageSendRandomuserMutation } from "@/src/redux/message/messageApi";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { SvgXml } from "react-native-svg";
import { io } from "socket.io-client";

type SelectedAsset = {
  uri: string;
  type: "image" | "video";
  mimeType: string; //add this so it matches
};

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [deletedView, setDeletedView] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, refetch } = useGetMySingleMessageQuery({ receiver_id: id });
  const { data: userProfile, isLoading: userLoading } = useUserGetProfileQuery();
  const [selectedImages, setSelectedImages] = useState<SelectedAsset[]>([]);
  const [deletedMySingleMessage] = useDeletedMySingleMessageMutation();
  const [image_send_random, { isLoading }] = useImageSendRandomuserMutation()


  // const socket = io(`http://10.10.10.65:3000?userId=${userProfile?.data?.id}`, {
  //   transports: ["websocket"], // or ['polling', 'websocket'] depending on your server configuration
  // });
  const socket = io(`https://poolvalet.com:3000?userId=${userProfile?.data?.id}`, {
    transports: ["websocket"], // or ['polling', 'websocket'] depending on your server configuration
  });


  const myUserId = userProfile?.data?.id;


  const handleDeleteConversation = async () => {
    try {
      Alert.alert(
        "Delete Conversation",
        "Are you sure you want to delete this conversation?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                const res = await deletedMySingleMessage({ receiver_id: Number(id) }).unwrap();
                if (res.status) {
                  setDeletedView(false);
                  refetch(); // Refresh messages
                }
              } catch (error) {
                console.error("Error deleting conversation:", error);
              }
            },
          },
        ]
      );
    }
    catch (error) {
      console.error("Error deleting conversation:", error);
    }
  }

  const flatListRef = useRef<FlatList>(null);


  const renderItem = ({ item }: any) => {
    const isMe = item.sender_id === myUserId;

    return (
      <View
        style={tw.style(
          "flex-row items-end my-2 ",
          isMe ? "justify-end" : "justify-start"
        )}
      >
        {/* Avatar for other person */}
        {!isMe && (
          <Image
            source={{ uri: makeImage(data?.receiver_user?.avatar) }}
            style={tw`w-8 h-8 rounded-full mr-2`}
          />
        )}

        <View style={tw`flex-col gap-2 max-w-[70%]`}>
          {/* Image messages */}
          {item?.files?.length > 0 && (
            <View style={tw`flex-col gap-2`}>
              {item.files.map((file: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: makeImage(file) }}
                  style={tw`w-52 h-52 rounded-xl`}
                />
              ))}
            </View>
          )}
          {/* Message bubble */}
          {item?.message && (
            <View
              style={tw.style(
                "px-3 py-2 rounded-xl",
                isMe
                  ? "bg-blue-500 rounded-tr-none"
                  : "bg-gray-200 rounded-tl-none"
              )}
            >
              <Text style={tw.style(isMe ? "text-white" : "text-black")}>
                {item.message}
              </Text>
              <Text style={tw`text-xs mt-1 ${isMe ? "text-white/70" : "text-black/50"}`}>
                {instagramTime(item.created_at)}
              </Text>
            </View>
          )}


        </View>

        {/* Avatar for current user */}
        {isMe && (
          <Image
            source={{ uri: makeImage(userProfile?.data?.avatar) }}
            style={tw`w-8 h-8 rounded-full ml-2`}
          />
        )}
      </View>

    );
  };

  const handleImageRemoved = (uri: string) => {
    const updated = selectedImages.filter((item) => item.uri !== uri);
    setSelectedImages(updated);
  };


  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("photos", selectedImages as any);
    formData.append("receiver_id", id as any);
    formData.append(" message", input as any);


    if (selectedImages.length > 0) {
      const file = selectedImages[0];

      if (file?.type === "video") {
        formData.append("video", {
          uri: file.uri,
          name: file.fileName || `video_${Date.now()}.mp4`,
          type: file.mimeType || "video/mp4",
        } as any);
      } else {
        selectedImages.forEach((img, index) => {
          formData.append(`photos[${index}]`, {
            uri: img.uri,
            name: img.fileName || `image_${Date.now()}_${index}.jpg`,
            type: img.mimeType || "image/jpeg",
          } as any);
        });
      }
    }

    try {
      const res = await image_send_random(formData).unwrap();
      if (res?.status) {
        socket.emit("privateMessage", {
          "receiverId": id,
          "message": input
        })
        setSelectedImages([]);
        setInput("");
      }
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Contect True")
      socket.on("privateMessage", (data) => {
        // console.log(data)
        refetch()
      })
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    socket.on("error", (error) => {
      console.warn("Socket Error:", error);
      // Handle general socket errors
    });
  }, [socket])

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (userLoading) {
    return <GlobalLoading />;

  }

  return (

    <Wrapper>
      <KeyboardAvoidingWrapper>
        <View style={tw`flex-1`}>
          <View
            style={tw`flex-row items-center px-2 border-b-4 border-gray-200/15  pb-1  gap-1 justify-between `}>
            {/* Left Side */}
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity onPress={() => router.back()} style={tw`mr-2`}>
                <SvgXml xml={IconsBack} />
              </TouchableOpacity>

              <Image
                source={{ uri: makeImage(data?.receiver_user?.avatar) }}
                style={tw`w-10 h-10 rounded-full mr-3`}
              />

              <Text style={tw`text-lg font-roboto-500 text-title_color`}>
                {data?.receiver_user?.full_name}
              </Text>
            </View>

            {/* Right Side */}
            <TouchableOpacity onPress={() => setDeletedView(!deletedView)} style={tw`p-2`}>
              <SvgXml xml={Icons3Dot} />
            </TouchableOpacity>
          </View>
          {/* Header */}
          {deletedView && (
            <TouchableOpacity
              style={tw` flex-row items-end justify-end shadow-2xl px-4 py-2 rounded-lg absolute right-0 top-16 bg-white`}
              onPress={() => { setDeletedView(!deletedView); handleDeleteConversation() }}
            >
              <SvgXml xml={IconsDleled} />
              <Text>Delete conversation</Text>
            </TouchableOpacity>
          )}

          {/* Messages */}
          <FlatList
            inverted
            ref={flatListRef}
            data={data?.data?.length ? ([...data?.data].reverse()) : []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={tw`py-3`}
            showsVerticalScrollIndicator={false}

          />


          {selectedImages.length > 0 && (
            <View style={tw`flex-row py-2`}>
              {selectedImages.map((item, index) => (
                <View key={index} style={tw`relative gap-3 mr-3`}>
                  {item.type === "image" ? (
                    <Image
                      source={{ uri: item.uri }}
                      style={tw`w-16 h-16 rounded`}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={tw`w-16 h-16 bg-black rounded justify-center items-center`}
                    >
                      <Text style={tw`text-white text-xs`}> Video</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => handleImageRemoved(item.uri)}
                    style={tw`absolute top-1 right-1 bg-orange rounded p-0.5`}
                  >
                    <SvgXml xml={IconsImageDeleted} width={16} height={16} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}


          {/* Input Box */}
          <View style={tw`flex-row items-center  ${keyboardVisible ? " mb-16" : "mb-2"} bg-white flex justify-center rounded-2xl `}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Write your message..."
              placeholderTextColor="#454545"
              style={tw`flex-1 text-base py-3 px-2.5 rounded-full text-black`}
            />

            <TouchableOpacity style={tw`ml-3`}>
              <GallaryImage
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            </TouchableOpacity>
            <TouchableOpacity style={tw`ml-3`} onPress={() => handleSubmit()} >
              {isLoading ? <ActivityIndicator size="small" color="#000" /> : <SvgXml xml={IconsSend} />}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
};

export default ChatScreen;
