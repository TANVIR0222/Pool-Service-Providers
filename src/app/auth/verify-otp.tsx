import { IconsBack } from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import AuthHeading from "@/src/components/ui/AuthHeading";
import Wrapper from "@/src/components/Wrapper";
import { OtpVerifyApiResponse, ResendOtpApiResponse } from "@/src/lib/authType";
import { storage } from "@/src/lib/mmkvStorage";
import tw from "@/src/lib/tailwind";
import {
  useResendOTPMutation,
  useUserVerifyOTPMutation,
} from "@/src/redux/authApi/authApiSlice";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SvgXml } from "react-native-svg";

export default function OTPVerify() {
  const [otpVerify, setOtpVerify] = useState<string>("");
  const [verifyOtp, { isLoading }] = useUserVerifyOTPMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOTPMutation();

  const { email, from } = useLocalSearchParams<{ email: string; from: string }>();
  const user_role = storage.getString('role')




  const handleResendOtp = async () => {
    if (!email) {
      Alert.alert("Missing email", "Unable to resend OTP. Email not found.");
      return;
    }

    try {
      const res: ResendOtpApiResponse = await resendOtp({ email }).unwrap();
      if (res?.status) {
        Alert.alert("OTP Sent", res.message);
      }
    } catch (error: any) {
      Alert.alert(
        "Resend Failed",
        error?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (otpVerify.length !== 6) {
      Alert.alert("OTP Error", "Please enter a valid 6-digit OTP code.");
      return;
    }

    try {
      const res: OtpVerifyApiResponse = await verifyOtp({
        otp: otpVerify,
      }).unwrap();

      if (res?.status) {
        storage.set("token", res.access_token);
        //         const destination = user_role === '1' ? '/home-owner' : '/business-provider';

        // const destination = from === 'reset-password' ? '/auth/create-new-password' : '/home-owner';
        // router.push(destination);
        let destination = "/home-owner"; // default

        if (from === "reset-password") {
          destination = "/auth/create-new-password";
        } else if (user_role === "1") {
          destination = "/home-owner";
        } else {
          destination = "/business-provider";
        }

        router.push(destination);

      }
    } catch (error: any) {
      Alert.alert(
        "Verification Failed",
        error?.data?.message || "Invalid OTP or server error"
      );
    }
  };

  return (
    <Wrapper>
      <TouchableOpacity style={tw`absolute left-4 top-5`} onPress={() => router.back()}>
        <SvgXml xml={IconsBack} />
      </TouchableOpacity>
      <KeyboardAvoidingWrapper>
        <View style={tw`justify-center  relative flex-1`}>
          <View style={tw`flex flex-col`}>
            {/* Heading */}
            <AuthHeading
              Heading="Verify OTP"
              SubHeading="We’ve sent a 6-digit code to your email address."
            />

            {/* OTP Input */}
            <View style={tw`flex flex-col gap-2`}>
              <Text
                style={tw`text-base text-lavel_title_color font-roboto-500`}
              >
                Verify
              </Text>
              <View style={tw`flex flex-col gap-2 justify-end items-end`}>
                <OtpInput
                  focusColor="black"
                  placeholder="000000"
                  numberOfDigits={6}
                  type="numeric"
                  onFilled={setOtpVerify}
                  textInputProps={{
                    accessibilityLabel: "One-Time Password",
                  }}
                  textProps={{
                    accessibilityRole: "text",
                    accessibilityLabel: "OTP digit",
                    allowFontScaling: false,
                  }}
                />
                <Pressable
                  onPress={handleResendOtp}
                  disabled={resendLoading}
                >
                  <Text
                    style={tw`text-button_color text-sm font-semibold underline`}
                  >
                    {resendLoading ? "Sending..." : "Send again?"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Submit Button */}
            <View style={tw`w-full rounded-full bg-button_color mt-10`}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                style={tw`py-4 flex-row justify-center items-center`}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={tw`text-center text-white text-xl`}>
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
}
