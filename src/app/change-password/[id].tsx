import { IconsChangePasss, IconsLock } from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import { changePasswordalidationSchema } from "@/src/lib/auth-validationSchema";
import { updatePasswordApiPayload } from "@/src/lib/authType";
import tw from "@/src/lib/tailwind";
import { useUserPasswordChangeMutation } from "@/src/redux/authApi/authApiSlice";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";




const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { id } = useLocalSearchParams();

  const [user_password_change, { isLoading }] = useUserPasswordChangeMutation();






  const chnage_password = async (values: updatePasswordApiPayload, { resetForm }) => {


    const payload = {
      password: values.password,
      current_password: values.current_password,
      password_confirmation: values.password_confirmation,
    };
    try {
      const response = await user_password_change(payload).unwrap();


      // Type Guard (optional but safer)
      // Optional: Navigate or show toast here
      Alert.alert(response?.status === false ? "Error" : "Success", response?.message);
      resetForm()
      router.back()
    } catch (err: any) {
      if (err?.data?.message) {
        console.error("Server error:", err.data.message);
      } else {
        console.error("Unexpected error:", err);
        Alert.alert("Error", err.message);

      }
    }

  };




  return (
    <Wrapper>
      <BackButton title={"Change Password"} />

      <KeyboardAvoidingWrapper>
        <Formik<updatePasswordApiPayload>
          initialValues={{
            current_password: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={changePasswordalidationSchema}
          onSubmit={chnage_password}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={tw` flex-1 `}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
              // keyboardShouldPersistTaps="handled"
              >
                <View style={tw`flex-1  py-2  `}>
                  {/* Back and Title */}
                  {/* Image */}
                  <View style={tw`items-center`}>
                    <SvgXml xml={IconsChangePasss} />
                  </View>

                  <View style={tw` flex-col flex-1  justify-between`}>
                    {/* Inputs */}
                    <View style={tw`flex-col gap-4 mt-5`}>
                      {/* Current Password */}
                      <View style={tw`flex-col gap-2`}>
                        <Text
                          style={tw` text-[#000] text-base font-roboto-500 `}
                        >
                          Current Password
                        </Text>
                        <View
                          style={tw`flex-row justify-center items-center  bg-input_bg_gray rounded-2 px-3 py-1`}
                        >
                          <SvgXml xml={IconsLock} />
                          <TextInput
                            secureTextEntry={!showCurrent}
                            style={tw`flex-1 text-base `}
                            placeholder="* * * * * * *"
                            onChangeText={handleChange("current_password")}
                            onBlur={handleBlur("current_password")}
                            value={values.current_password}
                          />
                          <Feather
                            onPress={() => setShowCurrent(!showCurrent)}
                            name={showCurrent ? "eye-off" : "eye"}
                            size={18}
                            style={tw`text-[#888888]`}
                          />
                        </View>
                        {touched.current_password && errors.current_password && (
                          <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                            {errors.current_password}
                          </Text>
                        )}
                      </View>

                      {/* New Password */}
                      <View style={tw`flex-col gap-2`}>
                        <Text
                          style={tw` text-[#000] text-base font-roboto-500 `}
                        >
                          New Password
                        </Text>
                        <View
                          style={tw`flex-row justify-center items-center  bg-input_bg_gray rounded-2 px-3 py-1`}
                        >
                          <SvgXml xml={IconsLock} />
                          <TextInput
                            secureTextEntry={!showNew}
                            style={tw`flex-1 text-base `}
                            placeholder="* * * * * * *"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                          />
                          <Feather
                            onPress={() => setShowNew(!showNew)}
                            name={showNew ? "eye-off" : "eye"}
                            size={18}
                            style={tw`text-[#888888]`}
                          />
                        </View>
                        {touched.password && errors.password && (
                          <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                            {errors.password}
                          </Text>
                        )}
                      </View>

                      {/* Confirm Password */}
                      <View style={tw`flex-col gap-2`}>
                        <Text
                          style={tw` text-[#000] text-base font-roboto-500 `}
                        >
                          Confirm Password
                        </Text>
                        <View
                          style={tw`flex-row justify-center items-center  bg-input_bg_gray rounded-2 px-3 py-1`}
                        >
                          <SvgXml xml={IconsLock} />
                          <TextInput
                            secureTextEntry={!showConfirm}
                            style={tw`flex-1 text-base `}
                            placeholder="* * * * * * *"
                            onChangeText={handleChange("password_confirmation")}
                            onBlur={handleBlur("password_confirmation")}
                            value={values.password_confirmation}
                          />
                          <Feather
                            onPress={() => setShowConfirm(!showConfirm)}
                            name={showConfirm ? "eye-off" : "eye"}
                            size={18}
                            style={tw`text-[#888888]`}
                          />
                        </View>
                        {touched.password_confirmation && errors.password_confirmation && (
                          <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                            {errors.password_confirmation}
                          </Text>
                        )}
                      </View>
                    </View>

                    {/* Submit Button */}
                    <View style={tw` `}>

                      <TouchableOpacity
                        style={tw`bg-button_color w-full p-4 rounded-full flex-row justify-center items-center gap-2`}
                        onPress={() => handleSubmit()}
                      >
                        {/* <SvgXml xml={IconsEdit} /> */}
                        <Text
                          style={tw`text-center text-white font-roboto-500`}
                        >
                          {isLoading ? "Loading..." : "Edit Profile"}

                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ChangePassword;
