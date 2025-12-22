import { IconsLocation, IconsUser } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import UpdateProfileCard from "@/src/components/ui/UpdateProfileCard";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useUserGetProfileQuery } from "@/src/redux/authApi/authApiSlice";
import { useUserProfileUpdatedMutation } from "@/src/redux/profileApi/profileApi";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const UpdateProfile = () => {

  const { data, isLoading } = useUserGetProfileQuery();
  const [image, setImage] = useState<string[] | any>(null);
  const [nameUser, setName] = useState<string>('');
  const [locations, setLocations] = useState<string>('');


  // console.log(image);




  const [updateProfile, { isLoading: isUpdating }] = useUserProfileUpdatedMutation();


  const handleSubmit = async () => {
    try {
      const formData: any = new FormData();
      formData.append("full_name", nameUser);
      formData.append("location", locations);

      if (image?.assets[0]?.uri) {
        const file = image.assets[0];
        formData.append("avatar", {
          uri: file.uri,
          name: file.fileName || `image.jpg`,
          type: file.mimeType || "image/jpeg",
        } as any);
      }

      const res = await updateProfile(formData).unwrap();

      if (res.status) {
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="My profile" />

      <View style={tw`flex-1 justify-between py-2`}>
        {/* Top Section: Image & Form */}
        <View style={tw`flex-1 pb-4`}>
          {/* Profile Image */}

          <View style={tw`items-center mb-6`}>
            <View style={tw`w-20 h-20 rounded-full bg-gray-300 items-center justify-center`}>
              <Image
                source={{ uri: image?.assets[0].uri || makeImage(data?.data?.avatar) }}
                style={tw`w-20 h-20 rounded-full`}
              />
              <UpdateProfileCard setImage={setImage} />
            </View>
          </View>


          {/* Form Section */}
          <View style={tw`flex-col gap-4`}>
            {/* Full Name Field */}
            <View>
              <Text style={tw`text-base text-[#000] font-roboto-500 mb-2`}>
                Full Name
              </Text>
              <View
                style={tw`bg-input_bg_gray px-4 py-2 flex-row items-center rounded-md`}
              >
                <SvgXml xml={IconsUser} />
                <TextInput
                  placeholder={data?.data?.full_name ?? "Enter your full name"}
                  placeholderTextColor="#888"
                  selectionColor="#888"
                  style={tw`flex-1 text-base ml-2`}
                  value={nameUser}
                  onChangeText={(text) => setName(text)}
                />
              </View>
            </View>

            {/* Location Field */}
            <View>
              <Text style={tw`text-base text-[#000] font-roboto-500 mb-2`}>
                Location
              </Text>
              <View
                style={tw`bg-input_bg_gray px-4 py-2 flex-row items-center rounded-md`}
              >
                <TextInput
                  placeholder={data?.data?.location ?? "Enter your location"}
                  placeholderTextColor="#888"
                  selectionColor="#888"
                  style={tw`flex-1 text-base mr-2`}
                  value={locations}
                  onChangeText={(text) => setLocations(text)}
                />
                <SvgXml xml={IconsLocation} />
              </View>
            </View>

            {/* Change Password */}
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/change-password/[id]",
                  params: { id: Number(data?.data?.id) },
                })
              }
            >
              <Text
                style={tw`text-sm text-[#003B73] underline font-roboto-700 text-right`}
              >
                Change password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={tw`mt-6`}>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={tw`bg-button_color w-full p-4 rounded-full flex-row justify-center items-center gap-2`}
            disabled={isUpdating}
          >
            <Text style={tw`text-white font-roboto-500 text-base`}>
              {isUpdating ? "Loding..." : 'Save changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
};

export default UpdateProfile;
