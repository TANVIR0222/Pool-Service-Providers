import { IconsLock, IconsMail } from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import AllButtonLoading from "@/src/components/ui/AllButtonLoading";
import GoogleLogin from "@/src/components/ui/GoogleLogin";
import Wrapper from "@/src/components/Wrapper";
import { loginValidationSchema } from "@/src/lib/auth-validationSchema";
import { LoginApiPayloade } from "@/src/lib/authType";
import { storage } from "@/src/lib/mmkvStorage";
import tw from "@/src/lib/tailwind";
import { useUserLoginMutation } from "@/src/redux/authApi/authApiSlice";
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


export default function SignInScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // data send databe rtk 
  const [loginuser, { isLoading }] = useUserLoginMutation();

  const user_role = storage.getString('role')

  const myRole = Number(user_role) === 1 ? "USER" : "PROVIDER"




  const onFormSubmit = async (values: LoginApiPayloade) => {
    const userData: LoginApiPayloade = {
      email: values.email.trim(),
      password: values.password,
      role: myRole
    };

    try {
      const res = await loginuser(userData).unwrap();

      if (res?.token) {
        storage.set('token', res.token);
        storage.set('id', res?.user?.id);
        const destination = user_role === '1' ? '/home-owner' : '/business-provider';
        router.push(destination);
      } else {
        console.warn('No token received from server');
      }

    } catch (error: any) {
      Alert.alert(
        "Login failed",
        error?.data?.message || error.message || error,
        [
          {
            text: "OK",
            onPress: () => {
              // OK click
              router.replace('/welcome')
            },
          },
        ],
        { cancelable: false } // back button press
      );
    }
  };


  return (
    <Wrapper>
      <ScrollView
        contentContainerStyle={tw`flex-grow `}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingWrapper>
          <Formik<LoginApiPayloade>
            initialValues={{
              email: "",
              password: "",
              checkbox: false,
            }}
            validationSchema={loginValidationSchema}
            onSubmit={onFormSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={tw`flex-col flex-1 flex justify-center gap-4`}>
                <View style={tw` `}>
                  {/* Top Heading */}
                  <Text
                    style={tw`text-xl font-roboto-700 text-title_color text-center`}
                  >
                    Sign in
                  </Text>
                  <Text
                    style={tw`text-sm text-sub_title_color font-roboto-400 text-center mb-4`}
                  >
                    Fill correct information to sign in.
                  </Text>

                  {/* Email */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Email
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-2 rounded-lg`}
                    >
                      <SvgXml xml={IconsMail} />
                      <TextInput
                        style={tw`flex-1 text-base text-title_color ml-2`}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="example@gmail.com"

                        keyboardType="email-address"
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={tw`text-red-500 text-sm`}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Password */}
                  <View style={tw`flex-col gap-2`}>
                    <Text
                      style={tw`text-base text-lavel_title_color font-roboto-500`}
                    >
                      Password
                    </Text>
                    <View
                      style={tw`flex-row bg-input_bg_gray items-center px-4 py-2 rounded-lg`}
                    >
                      <SvgXml xml={IconsLock} />
                      <TextInput
                        style={tw`flex-1 text-base text-title_color ml-2`}
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        placeholder="* * * * * * *"
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

                  {/* Checkbox + Forgot */}
                  <View style={tw`flex-row justify-between items-center mt-2`}>
                    <View style={tw`flex-row items-center`}>
                      <Checkbox
                        value={values.checkbox}
                        onValueChange={(val) => setFieldValue("checkbox", val)}
                        color="#B0B0B0"
                        style={{ width: 16, height: 16 }}
                      />
                      <Text
                        style={tw`text-sm ml-2 font-roboto-400 text-lavel_title_color`}
                      >
                        Remember me
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => router.push("/auth/reset-password")}
                    >
                      <Text
                        style={tw`text-button_color font-roboto-500 underline text-xs`}
                      >
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sign in + Google */}
                  <View style={tw`flex-col gap-5 mt-4`}>
                    <TouchableOpacity
                      // onPress={() => handleSubmit()}
                      onPress={() => handleSubmit()}
                      style={tw`bg-button_color p-4 rounded-full`}
                    >
                      <AllButtonLoading isLoading={isLoading} name="Sing in" />
                    </TouchableOpacity>

                    <Text style={tw`text-center text-text_gray text-sm`}>
                      Or
                    </Text>

                    {/* Continue with Google */}
                    <GoogleLogin />
                  </View>
                </View>

                <View style={tw`absolute bottom-6 w-full items-center`}>
                  <Text style={tw`text-[#121212]`}>
                    Don’t have an account?
                    <Text
                      style={tw`text-button_color font-roboto-500 underline`}
                      onPress={() => router.push("/auth/register")}
                    >
                      {' Register'}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingWrapper>
      </ScrollView>
    </Wrapper>
  );
}
