

// -------------------->>>>>>>>>>>>>>>>>>>>__________________
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import Wrapper from "@/src/components/Wrapper";
import BackButton from "@/src/components/ui/BackButton";
import SetDate from "@/src/components/ui/SetDate";
import UploadImages from "@/src/components/ui/UploadImage";
import { addedValidationSchema } from "@/src/lib/global-validations";
import tw from "@/src/lib/tailwind";
import { useCretedUserQuoteMutation } from "@/src/redux/get_quote/quoteCreateApi";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { initialValues } from "../(drawer)/(tabs)/add";

interface SelectedAsset {
  uri: string;
  fileName?: string;
  type?: string;
  mimeType?: string;
}

// Initial Values
const now = new Date();

// Validation Schema
const validationSchema = Yup.object().shape({
  service: Yup.string().required("Service is required"),
  zipCode: Yup.string().required("ZIP code is required"),
  issue: Yup.string().required("Issue description is required"),
  propertyType: Yup.string().required("Property type is required"),
  address: Yup.string().required("Address is required"),
  budget: Yup.string(), // optional, only required conditionally
  date: Yup.date().required("Date is required"),
});

export default function ServiceRequestForm() {
  const [selectedImages, setSelectedImages] = useState<SelectedAsset[]>([]);
  const { category } = useLocalSearchParams<{ category: string }>();
  const [createQuote, { isLoading }] = useCretedUserQuoteMutation();


  const propertyOptions = [
    "Single family home",
    "Commercial Property",
    "Apartment",
  ];

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      const formData = new FormData();
      const dateObj = new Date(values.date);

      // Format MM/DD/YYYY
      const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;

      // Append form data
      formData.append("service", values?.service);
      formData.append("describe_issue", values.issue);
      formData.append("property_type", values.propertyType);
      formData.append("zip_code", values.zipCode);
      formData.append("address", values.address);
      formData.append("expected_budget", values.budget);
      formData.append("date", formattedDate);
      formData.append("service_type", values?.service);


      // Append files
      selectedImages.forEach((file, index) => {
        const fileData: any = {
          uri: file.uri,
          name: file.fileName || `file_${Date.now()}_${index}`,
          type: file.mimeType || "image/jpeg",
        };
        if (file.type === "video") {
          fileData.type = file.mimeType || "video/mp4";
          formData.append("video", fileData);
        } else {
          formData.append(`photos[${index}]`, fileData);
        }
      });

      const res = await createQuote(formData).unwrap();

      if (res?.status) {
        Alert.alert("Success", "Quote created successfully");
        resetForm();
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Alert.alert("Error", "Failed to create quote. Please try again.");
    }
  };

  return (
    <Wrapper>
      <BackButton title="Back" />
      <KeyboardAvoidingWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={addedValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
            handleBlur,
          }) => {
            React.useEffect(() => {
              if (category) {
                setFieldValue("service", category); // Formik value set
              }
            }, []);

            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`flex-col gap-4 py-3`}>
                  {/* Selected Service (Readonly) */}
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      Selected Service
                    </Text>
                    <TextInput
                      value={values.service}  // Formik value
                      editable={false}        // readonly
                      onBlur={handleBlur("service")}
                      style={tw`bg-[#ECF1F6] p-3 rounded-md text-base text-title_color`}
                    />
                    {touched.service && errors.service && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.service}</Text>
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
                      style={tw`bg-[#ECF1F6] p-3 rounded-md text-base text-title_color`}
                      value={values.zipCode}
                      onChangeText={handleChange("zipCode")}
                      onBlur={handleBlur("zipCode")}
                    />
                    {touched.zipCode && errors.zipCode && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.zipCode}</Text>
                    )}
                  </View>

                  {/* Describe Issue */}
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      Describe the issue <Text style={tw`text-red-500`}>*</Text>
                    </Text>
                    <TextInput
                      placeholder="My pool pump is leaking..."
                      multiline
                      value={values.issue}
                      onChangeText={handleChange("issue")}
                      textAlignVertical="top"
                      style={tw`h-32 bg-[#ECF1F6] rounded-md text-base text-title_color p-3`}
                    />
                    {touched.issue && errors.issue && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.issue}</Text>
                    )}
                  </View>

                  {/* Property Type */}
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      Property type
                    </Text>
                    {propertyOptions.map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setFieldValue("propertyType", type)}
                        style={tw`flex-row items-center mb-2`}
                      >
                        <View
                          style={tw`w-4 h-4 rounded-full border border-sub_title_color mr-2 items-center justify-center`}
                        >
                          {values.propertyType === type && (
                            <View style={tw`w-2 h-2 rounded-full bg-blue-600`} />
                          )}
                        </View>
                        <Text style={tw`text-base text-sub_title_color`}>{type}</Text>
                      </TouchableOpacity>
                    ))}
                    {touched.propertyType && errors.propertyType && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.propertyType}</Text>
                    )}
                  </View>

                  {/* Date Picker */}
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      When do you need the service?
                    </Text>
                    <SetDate
                      onDateChange={(date) => setFieldValue("date", date)}
                      initialDate={values.date ? new Date(values.date) : new Date()}
                    />
                    {touched.date && errors.date && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.date}</Text>
                    )}
                  </View>

                  {/* Address */}
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      Service address
                    </Text>
                    <TextInput
                      placeholder="Enter your address"
                      style={tw`bg-[#ECF1F6] p-3 rounded-md text-base text-title_color`}
                      value={values.address}
                      onChangeText={handleChange("address")}
                    />
                    {touched.address && errors.address && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.address}</Text>
                    )}
                  </View>

                  {/* Conditional Budget */}
                  {category === "Pool Construction" && (
                    <View style={tw`flex-col gap-2`}>
                      <Text style={tw`text-base text-title_color font-roboto-500`}>
                        What's your expected budget?
                      </Text>
                      <TextInput
                        placeholder="ex: $564.00"
                        keyboardType="numeric"
                        style={tw`bg-[#ECF1F6] p-3 rounded-md text-base text-title_color`}
                        value={values.budget}
                        onChangeText={handleChange("budget")}
                      />
                      {touched.budget && errors.budget && (
                        <Text style={tw`text-red-500 text-sm`}>{errors.budget}</Text>
                      )}
                    </View>
                  )}

                  {/* Upload Images / Videos */}
                  <View style={tw`flex-col gap-2`}>
                    <Text style={tw`text-base text-title_color font-roboto-500`}>
                      Upload videos or photos of your pool.
                    </Text>
                    <UploadImages
                      selectedImages={selectedImages}
                      setSelectedImages={setSelectedImages}
                    />
                  </View>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    style={tw`${isLoading ? "bg-[#5d9fe2]" : "bg-[#003366]"} p-4 rounded-full items-center mt-4`}
                  >
                    <Text style={tw`text-white text-base font-roboto-600`}>
                      {isLoading ? "Loading..." : "Add"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )
          }}
        </Formik>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
}
