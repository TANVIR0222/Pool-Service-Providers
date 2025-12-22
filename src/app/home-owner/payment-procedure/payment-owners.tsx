import { IconsButtomArrow, IconsMasteCard, IconsVisa } from "@/assets/icons"; // placeholder icons
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingWrapper";
import BackButton from "@/src/components/ui/BackButton";
import ReviewModal from "@/src/components/ui/ReviewModal";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind"; // Your twrnc setup path
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function PaymentOwners() {
  const [successmodalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  return (
    <Wrapper>
      <BackButton title="Payment procedure" />

      <KeyboardAvoidingWrapper>
        <View style={tw`flex-1 justify-between py-2`}>
          {/* Upper Section */}
          <View>
            <Text style={tw`text-xl text-title_color font-roboto-600 mb-6`}>
              Add card
            </Text>

            {/* Card Info */}
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-sm font-roboto-500 text-[#6D6D6D]`}>
                Card information
              </Text>
            </View>

            <View style={tw`border border-[#D1D1D1] rounded-lg mb-4`}>
              <TextInput
                placeholder="Card information"
                placeholderTextColor="#888"
                style={tw`text-base text-title_color font-roboto-500 border-b border-[#D1D1D1] px-2 py-3`}
              />
              <View style={tw`absolute right-3 top-3 flex-row gap-1`}>
                <SvgXml xml={IconsVisa} />
                <SvgXml xml={IconsMasteCard} />
              </View>

              <View style={tw`flex-row justify-between gap-2`}>
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor="#888"
                  style={tw`flex-1 p-3 text-base border-r border-[#D1D1D1]`}
                />
                <TextInput
                  placeholder="CVC"
                  placeholderTextColor="#888"
                  style={tw`flex-1 p-3 text-base`}
                />
              </View>
            </View>

            {/* Billing Address */}
            <Text style={tw`text-sm font-roboto-500 text-[#6D6D6D] mb-2`}>
              Billing address
            </Text>

            <View style={tw`border border-[#D1D1D1] rounded-lg`}>
              <Text
                style={tw`pt-2 px-2 text-sm text-[#888888] font-roboto-400`}
              >
                Country or region
              </Text>

              <View>
                <TouchableOpacity
                  style={tw`p-2 flex-row justify-between border-b border-[#D1D1D1] items-center`}
                >
                  <Text style={tw`text-base text-title_color`}>
                    United States
                  </Text>
                </TouchableOpacity>

                <View style={tw`absolute right-3 top-3`}>
                  <SvgXml xml={IconsButtomArrow} />
                </View>
              </View>

              <TextInput
                placeholder="ZIP"
                placeholderTextColor="#888"
                style={tw`p-3 text-base`}
              />
            </View>

            {/* Save Card */}
            <View style={tw`flex-row items-center justify-between mt-6`}>
              <View style={tw`flex-row items-center`}>
                <Checkbox color="#B0B0B0" style={{ width: 16, height: 16 }} />
                <Text style={tw`text-sm ml-2 font-roboto-500 text-[#6D6D6D]`}>
                  Save this card for future payment
                </Text>
              </View>
            </View>
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            style={tw`bg-button_color py-3 rounded-full items-center mt-8`}
            onPress={() => setSuccessModalVisible(!successmodalVisible)}
          >
            <Text style={tw`text-white text-lg font-roboto-600`}>Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Success Modal */}
        <ReviewModal
          setSuccessModalVisible={setSuccessModalVisible}
          successmodalVisible={successmodalVisible}
        />
      </KeyboardAvoidingWrapper>
    </Wrapper>
  );
}
