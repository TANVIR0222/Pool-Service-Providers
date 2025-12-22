import { IconsCloseRed } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { useSrtartQuotsMutation } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

type StartQuoteModelProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  id: string | number;
};



const StartQuoteModel = ({
  setModalVisible,
  modalVisible,
  id,
}: StartQuoteModelProps) => {
  const [startQuote, { isLoading }] = useSrtartQuotsMutation();


  // price = number | null
  const [price, setPrice] = useState<number | null>(null);
  const [outline, setOutline] = useState("");


  // Submit function
  const handleSubmit = async () => {
    if (price === null || isNaN(price) || price <= 0 || !outline.trim()) {
      Alert.alert("Error", "Please enter a valid price and outline");
      return;
    }



    try {
      const res = await startQuote({
        quote_id: id,
        price_offered: price,
        quote_outline: outline.trim(),
      }).unwrap();





      if (res?.status === true) {
        Alert.alert("Success", "Your bid has been submitted!");
        setModalVisible(false);
        router.push({
          pathname: "/business-provider/already-have-plan/biddingList",
          params: { quote_id: id }
        });
        setPrice(0);
        setOutline("")
      } else {
        Alert.alert("Message", res?.message || "Something went wrong");
      }
    } catch (err: any) {
      console.log("Submit error:", err);
      Alert.alert("Message", err?.data?.message || "Server error");
    }
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={tw`flex-1 items-center justify-center`}>
          <View
            style={tw`w-11/12 rounded-2xl bg-white p-6 shadow-2xl elevation-5`}
          >
            {/* Header */}
            <View style={tw`flex-row items-center justify-between mb-4`}>
              <Text style={tw`text-2xl text-title_color font-roboto-600`}>
                Add your bid price
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <SvgXml xml={IconsCloseRed} />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={tw`gap-4`}>
              {/* Bid Price */}
              <View style={tw`gap-2`}>
                <Text style={tw`text-base text-lavel_title_color font-roboto-500`}>
                  Add your bid price
                </Text>
                <View
                  style={tw`flex-row bg-input_bg_gray items-center py-2 px-3 rounded-lg`}
                >
                  <TextInput
                    style={tw`flex-1 text-base text-title_color`}
                    placeholder="$0.00"
                    keyboardType="numeric"
                    value={price !== null ? String(price) : ""}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9.]/g, "");
                      setPrice(numericValue ? parseFloat(numericValue) : null);
                    }}
                  />
                </View>
              </View>

              {/* Quote Outline */}
              <View style={tw`gap-2`}>
                <Text style={tw`text-base text-lavel_title_color font-roboto-500`}>
                  Quote Outline
                </Text>
                <View style={tw`bg-input_bg_gray rounded-lg h-32`}>
                  <TextInput
                    style={tw`p-4 w-full h-full text-base text-title_color`}
                    placeholder="Please enter all the details of your quote..."
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    placeholderTextColor="#888"
                    selectionColor="#888"
                    value={outline}
                    onChangeText={setOutline}
                  />
                </View>
              </View>

              {/* Add Button */}
              <TouchableOpacity
                style={tw`bg-button_color ${isLoading ? 'bg-button_color/50' : 'bg-button_color'} rounded-full py-3 mt-2`}
                onPress={() => handleSubmit}
                disabled={isLoading}
              >
                <Text
                  style={tw`text-white  text-center text-lg font-roboto-600`}
                >
                  {isLoading ? "Submitting..." : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StartQuoteModel;
