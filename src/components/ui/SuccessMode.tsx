import { IconsCloseRed } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
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

const SuccessMode = ({
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
  }, [successmodalVisible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
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
            <TouchableOpacity onPress={handleClose}>
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
                Successful!
              </Text>
              <Text
                style={tw`text-title_color text-center text-base font-roboto-600`}
              >
                Your request for service add successfully.
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-button_color rounded-full py-3 mt-2`}
              onPress={handleClose}
            >
              <Text style={tw`text-white text-center text-lg font-roboto-600`}>
                View Quotes
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SuccessMode;
