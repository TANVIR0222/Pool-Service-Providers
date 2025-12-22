import { IconsEdit } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useUserGetProfileQuery } from "@/src/redux/authApi/authApiSlice";
import { makeImage } from "@/src/utils/image_converter";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Profile = () => {

  const { data, isLoading, refetch } = useUserGetProfileQuery();

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );


  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="My profile" />

      <KeyboardAvoidingWrapper>
        <View style={tw` flex-1  flex-col justify-between pb-2 `}>
          <View style={tw` mt-6 `}>
            <View style={tw`items-center gap-9 `}>
              {/* Profile Image */}

              <View style={tw`bg-[#ECF1F6] h-20 w-20 rounded-full items-center justify-center`}>
                <Image
                  source={{ uri: makeImage(data?.data?.avatar) }}
                  style={tw`w-20 h-20 rounded-full`}
                />
              </View>


              {/* Custom Modal for options */}

              <View style={tw` w-full flex-row  justify-between mt-6 `}>
                {/* fd */}
                <View style={tw` flex-col gap-2 `}>
                  <Text
                    style={tw` text-secondary_button_color font-roboto-400  text-base `}
                  >
                    Full Name :
                  </Text>
                  <Text
                    style={tw` text-secondary_button_color font-roboto-400  text-base `}
                  >
                    Email:
                  </Text>
                  <Text
                    style={tw` text-secondary_button_color font-roboto-400  text-base `}
                  >
                    Location:
                  </Text>
                </View>
                {/* fd */}
                <View style={tw` flex-col gap-2 `}>
                  <Text style={tw` text-title_color font-roboto-700  text-base `}>
                    {data?.data?.full_name}
                  </Text>
                  <Text style={tw` text-title_color font-roboto-700  text-base `}>
                    {data?.data?.email}
                  </Text>
                  <Text style={tw` text-title_color font-roboto-700  text-base `}>
                    {data?.data?.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={tw``}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/user-profile/[id]",
                  params: { id: "45787" },
                })
              }
              style={tw`bg-button_color w-full p-4 rounded-full flex-row justify-center items-center gap-2`}
            >
              <SvgXml xml={IconsEdit} />
              <Text style={tw`text-center text-white font-roboto-500`}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
};

export default Profile;
