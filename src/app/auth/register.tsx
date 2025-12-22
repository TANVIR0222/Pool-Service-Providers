
import { IconsLock, IconsMail, IconsUser } from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import GoogleLogin from "@/src/components/ui/GoogleLogin";
import Wrapper from "@/src/components/Wrapper";
import { registerValidationSchema } from "@/src/lib/auth-validationSchema";
import { RegisterApiPayloade } from "@/src/lib/authType";
import { storage } from "@/src/lib/mmkvStorage";
import tw from "@/src/lib/tailwind";
import { useUserRegisterMutation } from "@/src/redux/authApi/authApiSlice"; // Correct mutation hook
import Feather from "@expo/vector-icons/Feather";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";




export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [register, { isLoading }] = useUserRegisterMutation();
  const userRole = storage.getString('role')


  const handleRegister = async (values: RegisterApiPayloade): Promise<void> => {
    const userData = {
      email: values.email,
      full_name: values.full_name,
      password: values.password,
      password_confirmation: values.password_confirmation,
      role: userRole,
    };


    try {

      const response = await register(userData).unwrap();
      if (response?.status) {
        router.replace({
          pathname: '/auth/verify-otp',
          params: { email: values.email },
        });
      }

    } catch (error: any) {
      console.error(" Registration error:", error?.message);
      const emailError = error?.message?.email?.[0];
      Alert.alert(
        "Registration Failed",
        emailError || "An unexpected error occurred."
      );

    }
  };

  return (
    <Wrapper>
      <KeyboardAvoidingWrapper>
        <ScrollView
          contentContainerStyle={tw`flex-grow  relative `} // Added padding
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Formik<RegisterApiPayloade>
            initialValues={{
              email: "",
              full_name: "",
              password: "",
              password_confirmation: "",
              checkbox: false,
            }}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isValid,
            }) => (
              <View style={tw`flex-col flex-1 flex justify-center gap-4`}>
                <View style={tw`flex-col gap-4`}>
                  <Text
                    style={tw`text-xl font-roboto-700 text-title_color text-center`}
                  >
                    Register
                  </Text>
                  <Text
                    style={tw`text-sm text-sub_title_color font-roboto-400 text-center mb-4`}
                  >
                    Filled correct information to create an account.
                  </Text>

                  {/* Full name  */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Full Name
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-1.5 rounded-lg`}
                    >
                      <SvgXml xml={IconsUser} />
                      <TextInput
                        style={tw`flex-1 text-base text-title_color ml-2`}
                        onChangeText={handleChange("full_name")}
                        onBlur={handleBlur("full_name")}
                        value={values.full_name}
                        placeholder="Enter your full name"
                        placeholderTextColor="#888"
                        selectionColor="#888"
                        keyboardType="name-phone-pad"
                        autoCapitalize="none"
                      />
                    </View>
                    {touched.full_name && errors.full_name && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.full_name}
                      </Text>
                    )}
                  </View>

                  {/* Email */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Email
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-1.5  rounded-lg`}
                    >
                      <SvgXml xml={IconsMail} />
                      <TextInput
                        style={tw`flex-1 text-base text-title_color ml-2`}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="example@gmail.com"
                        placeholderTextColor="#888"
                        selectionColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="words"
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Password */}
                  {/* Password */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Password
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-1.5 rounded-lg`}
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
                        accessibilityLabel="Password input"
                      />
                      <Feather
                        onPress={() => setShowPassword((prev) => !prev)}
                        name={showPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                        accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.password}</Text>
                    )}
                  </View>

                  {/* Confirm Password */}
                  {/* Confirm Password */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Confirm Password
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-1.5 rounded-lg`}
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
                        accessibilityLabel="Confirm password input"
                      />
                      <Feather
                        onPress={() => setShowConfirmPassword((prev) => !prev)}
                        name={showConfirmPassword ? "eye-off" : "eye"}
                        size={18}
                        color="#888"
                        accessibilityLabel={showConfirmPassword ? "Hide password" : "Show password"}
                      />
                    </View>
                    {touched.password_confirmation && errors.password_confirmation && (
                      <Text style={tw`text-red-500 text-sm`}>{errors.password_confirmation}</Text>
                    )}
                  </View>

                  {/* Checkbox + Forgot */}
                  <View style={tw`flex-col `}>
                    {/* Checkbox */}
                    <View style={tw`flex-row items-start w-full`}>
                      <Checkbox
                        value={values.checkbox}
                        onValueChange={(val) => setFieldValue("checkbox", val)}
                        color="#888888"
                        style={tw`mt-1 mr-2 w-4 h-4`}
                      />

                      <Text style={tw`flex-1 text-sm text-lavel_title_color font-roboto-500`}>
                        By creating this account, you agree to the
                        <Text
                          style={tw`text-button_color`}
                          onPress={() => router.push('/common')}
                        >
                          {" "}Terms of Use{" "}
                        </Text>
                        &
                        <Text
                          style={tw`text-button_color`}
                          onPress={() => router.push('/common/privacy-policy')}
                        >
                          {" "}Privacy Policy
                        </Text>
                        .
                      </Text>

                    </View>
                    {touched.checkbox && errors.checkbox && (
                      <Text style={tw`text-red-500 text-sm mt-1`}>
                        {errors.checkbox}
                      </Text>
                    )}

                  </View>

                  {/* Sign in + Google */}
                  <View style={tw`flex-col gap-4 pb-10`}>
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      style={tw`bg-button_color p-4 rounded-full`}
                      disabled={isLoading}
                      accessibilityLabel="Register button"
                    >
                      <Text style={tw`text-center text-white font-roboto-500`}>
                        {isLoading ? "Registering..." : "Register"}
                      </Text>
                    </TouchableOpacity>

                    <Text style={tw`text-center text-text_gray text-sm`}>Or</Text>

                    {/* Continue with Google */}
                    <GoogleLogin />
                  </View>
                </View>
                {/* Register link */}
                <View style={tw`absolute bottom-2 w-full items-center `}>
                  <Text style={tw`text-[#121212]`}>
                    Have an account?
                    <Text
                      style={tw`text-button_color font-roboto-500 underline`}
                      onPress={() => router.back()}
                    >
                      {' Sign in'}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
}
