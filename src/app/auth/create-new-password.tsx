import { IconsLock } from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import AuthHeading from "@/src/components/ui/AuthHeading";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import { createNewPasswordValidationSchema } from "@/src/lib/auth-validationSchema";
import { ChangePasswordApiPayload } from "@/src/lib/authType";
import { storage } from "@/src/lib/mmkvStorage";
import tw from "@/src/lib/tailwind";
import { useChangePasswordMutation } from "@/src/redux/authApi/authApiSlice";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";


export default function CreateNewPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userRole = storage.getString('role');



  const [change_passwor, { isLoading }] = useChangePasswordMutation()

  const onFormSubmit = async (values: ChangePasswordApiPayload) => {



    const payload: ChangePasswordApiPayload = {
      password: values.password,
      password_confirmation: values.password_confirmation,
    };



    try {
      const response = await change_passwor(payload).unwrap();




      // Type Guard (optional but safer)
      if (response?.status) {
        // Optional: Navigate or show toast here
        const destination = userRole === '1' ? '/home-owner' : '/business-provider';
        router.push(destination);
      }
    } catch (err: any) {
      if (err?.data?.message) {
        console.error("Server error:", err.data.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }

  };

  return (
    <Wrapper>
      <KeyboardAvoidingWrapper>
        <BackButton />
        <View style={tw`flex-1 justify-center items-center flex-row`}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Formik<ChangePasswordApiPayload>
              initialValues={{
                password_confirmation: "",
                password: "",
              }}
              validationSchema={createNewPasswordValidationSchema}
              onSubmit={onFormSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={tw`flex-col gap-4`}>
                  {/* Top Heading */}

                  <AuthHeading
                    Heading="Create new password"
                    SubHeading="You have create a new password after reset."
                  />

                  {/* Password */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Password
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-1.5  rounded-lg`}
                    >
                      <SvgXml xml={IconsLock} />
                      <TextInput
                        style={tw`flex-1 text-base text-title_color ml-2`}
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="* * * * * * *"
                        placeholderTextColor="#888"
                        selectionColor="#888"
                      />
                      <Feather
                        onPress={() => setShowPassword((prev) => !prev)}
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  {/* Confirm Password */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Confirm Password
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-1.5  rounded-lg`}
                    >
                      <SvgXml xml={IconsLock} />
                      <TextInput
                        style={tw`flex-1 text-base text-title_color ml-2`}
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleChange("password_confirmation")}
                        onBlur={handleBlur("password_confirmation")}
                        value={values.password_confirmation}
                        placeholder="* * * * * * *"
                        placeholderTextColor="#888"
                        selectionColor="#888"
                      />
                      <Feather
                        onPress={() => setShowConfirmPassword((prev) => !prev)}
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                      />
                    </View>
                    {touched.password_confirmation && errors.password_confirmation && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.password_confirmation}
                      </Text>
                    )}
                  </View>

                  {/* Sign in + Google */}
                  <View style={tw`flex-col gap-4 `}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={tw`bg-button_color p-4 rounded-full`}
                    >
                      <Text style={tw`text-center text-white font-roboto-500`}>
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
}
