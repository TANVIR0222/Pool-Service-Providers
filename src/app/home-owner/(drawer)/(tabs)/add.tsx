import {
  IconsButtomArrow
} from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import SetDate from "@/src/components/ui/SetDate";
import SuccessMode from "@/src/components/ui/SuccessMode";
import UploadImages from "@/src/components/ui/UploadImage";
import Wrapper from "@/src/components/Wrapper";
import { addedValidationSchema } from "@/src/lib/global-validations";
import tw from "@/src/lib/tailwind";
import { useGetAllCategoryQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { useCretedUserQuoteMutation } from "@/src/redux/get_quote/quoteCreateApi";
import { makeImage } from "@/src/utils/image_converter";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

export const propertyOptions = [
  "Single family home",
  "Commercial Property",
  "Apartment",
];

export type SelectedAsset = {
  uri: string | null;
  type: "image" | "video";
  mimeType: string | undefined;
  fileName?: string | null; // added for type safety

}[];

const now = new Date();

export default function AddNewServices() {
  const { category } = useLocalSearchParams();


  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [successmodalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<SelectedAsset>([]);

  const [create_quote, { isLoading }] = useCretedUserQuoteMutation();
  const { data } = useGetAllCategoryQuery();

  const initialValues = {
    service: category || "",
    zipCode: "",
    issue: "",
    propertyType: "",
    address: "",
    budget: "",
    date: now.toISOString(),
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    const dateObj = new Date(values?.date);
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

    const formData = new FormData();
    formData.append("service", values?.service);
    formData.append("describe_issue", values?.issue);
    formData.append("property_type", values?.propertyType);
    formData.append("zip_code", values?.zipCode);
    formData.append("address", values?.address);
    formData.append("expected_budget", values?.budget);
    formData.append("service_type", values?.service);
    formData.append("date", formattedDate);

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
      const res = await create_quote(formData).unwrap();
      if (res?.status) {
        resetForm();
        setSelectedImages([]);
        setSuccessModalVisible(true); // ✅ show modal on success
      }
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Text style={tw`text-2xl my-2 text-title_color font-roboto-600`}>
        Get Quotes
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={addedValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingWrapper>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw``}
            >
              <View style={tw`flex-col gap-4 py-3`}>
                {/* Selected Service */}
                <View style={tw`flex-col gap-4`}>
                  <View style={tw`gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      What service do you need?
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowCategories((prev) => !prev)}
                      style={tw`bg-[#ECF1F6] h-12 px-2 flex-1 rounded-lg flex-row items-center justify-between gap-2`}
                    >
                      <Text style={tw`text-base text-title_color`}>
                        {values?.service || "Select service"}
                      </Text>
                      <SvgXml xml={IconsButtomArrow} width={32} height={32} />
                    </TouchableOpacity>
                    {touched.service && errors.service && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.service}
                      </Text>
                    )}
                  </View>
                  {showCategories && (
                    <View style={tw`flex-col gap-2`}>
                      {data?.data?.map((item) => (
                        <TouchableOpacity
                          key={item?.id}
                          onPress={() => {
                            setFieldValue("service", item?.name);
                            setShowCategories(false);
                          }}
                          style={[
                            tw`p-2 rounded-lg  flex-row items-center gap-2`,
                            values.service === item?.name &&
                            tw`bg-blue-200 shadow-sm`,
                          ]}
                        >
                          <Image
                            source={{ uri: makeImage(item?.icon) }}
                            style={tw`h-12 w-12`}
                          />
                          <Text style={tw`text-title_color text-base`}>
                            {item?.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* ZIP Code */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-base text-title_color font-roboto-500`}>
                    Add ZIP Code
                  </Text>
                  <TextInput
                    placeholder="Write ZIP code"
                    keyboardType="numeric"
                    style={tw`bg-[#ECF1F6] h-12 px-2 flex-1 rounded-md text-base text-title_color`}
                    value={values.zipCode}
                    onChangeText={handleChange("zipCode")}
                    onBlur={handleBlur("zipCode")}
                  />
                  {touched.zipCode && errors.zipCode && (
                    <Text style={tw`text-red-500 text-sm`}>
                      {errors.zipCode}
                    </Text>
                  )}
                </View>

                {/* Issue */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-base text-title_color font-roboto-500`}>
                    Describe the issue.<Text style={tw`text-red-500`}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="My pool pump is leaking & not working correctly…"
                    multiline
                    value={values.issue}
                    onChangeText={handleChange("issue")}
                    onBlur={handleBlur("issue")}
                    numberOfLines={10}
                    textAlignVertical="top"
                    style={tw`h-32 bg-[#ECF1F6] rounded-md text-base text-title_color px-2`}
                  />
                  {touched.issue && errors.issue && (
                    <Text style={tw`text-red-500 text-sm`}>{errors.issue}</Text>
                  )}
                </View>

                {/* Property Type */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-base text-title_color font-roboto-500`}>
                    Property type.
                  </Text>
                  {propertyOptions?.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setFieldValue("propertyType", type)}
                      style={tw`flex-row items-center`}
                    >
                      <View
                        style={tw`w-4 h-4 rounded-full border-[1px] border-sub_title_color mr-2 items-center justify-center`}
                      >
                        {values.propertyType === type && (
                          <View style={tw`w-2 h-2 rounded-full bg-blue-600`} />
                        )}
                      </View>
                      <Text style={tw`text-base text-sub_title_color`}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {touched.propertyType && errors.propertyType && (
                    <Text style={tw`text-red-500 text-sm`}>
                      {errors.propertyType}
                    </Text>
                  )}
                </View>

                {/* Date Picker */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-base text-title_color font-roboto-500`}>
                    When do you need the service?
                  </Text>
                  <SetDate
                    onDateChange={(date) => setFieldValue("date", date)}
                    initialDate={
                      values.date ? new Date(values.date) : new Date()
                    }
                  />
                </View>

                {/* Address */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-base text-title_color font-roboto-500`}>
                    Service address
                  </Text>
                  <TextInput
                    placeholder="Enter your address"
                    style={tw`bg-[#ECF1F6] h-12 px-2 flex-1 rounded-md text-base text-title_color`}
                    value={values.address}
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                  />
                  {touched.address && errors.address && (
                    <Text style={tw`text-red-500 text-sm`}>
                      {errors.address}
                    </Text>
                  )}
                </View>

                {/* Budget */}
                {values.service === "Pool Construction" && (
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      What's your expected budget?
                    </Text>
                    <TextInput
                      placeholder="ex: $564.00"
                      keyboardType="numeric"
                      style={tw`bg-[#ECF1F6] h-12 px-2 flex-1 rounded-md text-base text-title_color`}
                      value={values.budget}
                      onChangeText={handleChange("budget")}
                      onBlur={handleBlur("budget")}
                    />
                    {touched.budget && errors.budget && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.budget}
                      </Text>
                    )}
                  </View>
                )}

                {/* Upload */}
                <View style={tw`flex-col gap-2`}>
                  <Text style={tw`text-base text-title_color font-roboto-500`}>
                    Upload videos or photos of your pool.
                  </Text>
                  <UploadImages
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                  />
                </View>

                {/* Submit */}
                <TouchableOpacity
                  style={tw`${isLoading ? "bg-[#5d9fe2]" : "bg-[#003366]"
                    } p-4 rounded-full items-center`}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={tw`text-white text-base font-roboto-600`}>
                      Add
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingWrapper>
        )}
      </Formik>

      {/* Success Modal */}
      <SuccessMode
        setSuccessModalVisible={setSuccessModalVisible}
        successmodalVisible={successmodalVisible}
      />
    </Wrapper>
  );
}
