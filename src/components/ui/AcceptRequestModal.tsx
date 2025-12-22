import { IconsCloseRed } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

type SuccessModeProps = {
  successmodalVisible: boolean;
  setSuccessModalVisible: (visible: boolean) => void;
};

const AcceptRequestModal = ({
  successmodalVisible,
  setSuccessModalVisible,
}: SuccessModeProps) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Start offscreen right




  useEffect(() => {
    if (successmodalVisible) {
      slideAnim.setValue(300); // Reset position
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 300,
      useNativeDriver: false, // layout animation হলে false রাখো
    }).start(() => {
      router.replace('/home-owner/(drawer)/(tabs)/view-quotes');
      setSuccessModalVisible(false);
    });
  };




  return (
    <Modal animationType="fade" transparent visible={successmodalVisible}>
      <View style={tw`flex-1 items-center justify-center bg-black/30`}>
        <Animated.View
          style={[
            tw`w-11/12 rounded-xl bg-white p-6 shadow-2xl elevation-5`,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={tw`flex-row items-center justify-end `}>
            <TouchableOpacity onPress={() => {
              handleClose();
              router.replace('/home-owner/(drawer)/(tabs)/view-quotes');
            }}
            >
              <SvgXml xml={IconsCloseRed} />
            </TouchableOpacity>
          </View>
          <View style={tw` flex-col  gap-6`}>
            <Image
              source={require(`@/assets/images/575da948dd6220c3a28c39e2948c92663934f663.gif`)}
              style={tw`w-28 h-28 mx-auto`}
            />
            <View style={tw` flex-col items-center gap-4`}>
              <Text
                style={tw`text-title_color text-center text-2xl font-roboto-600`}
              >
                Thank you
              </Text>
              <Text
                style={tw`text-title_color text-center text-base font-roboto-600`}
              >
                You have successfully accepted a provider for your pool service.
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-button_color rounded-full py-3 mt-2`}
              onPress={() => {
                handleClose();
                router.replace('/home-owner/(drawer)/(tabs)/view-quotes');
              }}

            >
              <Text style={tw`text-white text-center text-lg font-roboto-600`}>
                Thank you
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AcceptRequestModal;
