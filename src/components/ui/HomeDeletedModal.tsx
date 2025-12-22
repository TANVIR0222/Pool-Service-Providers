import tw from "@/src/lib/tailwind";
import React, { useEffect } from "react";
import { Image, Modal, Text, View } from "react-native";

type DeletesModeProps = {
  deletesmodalVisible: boolean;
  setDeletesModalVisible: (visible: boolean) => void;
  userId?: number; // Optional prop for userId if needed
};

const HomeDeletedModal = ({
  deletesmodalVisible,
  setDeletesModalVisible,
  userId, // Optional prop for userId if needed
}: DeletesModeProps) => {
  useEffect(() => {
    if (deletesmodalVisible) {
      const timeout = setTimeout(() => {
        setDeletesModalVisible(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [deletesmodalVisible]);

  return (
    <Modal animationType="fade" transparent visible={deletesmodalVisible}>
      <View style={tw`flex-1 items-center justify-center bg-black/30`}>
        {/* <View style={tw`flex-row items-center justify-end `}>
            <TouchableOpacity onPress={handleClose}>
              <SvgXml xml={IconsCloseRed} />
            </TouchableOpacity>
          </View> */}
        <View style={tw` flex-col  bg-white p-4 rounded `}>
          <Image
            source={require(`@/assets/images/64de59691b97baf919c8bc0327507b191e4624ca.gif`)}
            style={tw`w-28 h-28 mx-auto`}
          />
          <View style={tw` flex-col items-center gap-4`}>
            <Text
              style={tw`text-title_color text-center text-2xl font-roboto-600`}
            >
              deletesful!
            </Text>
            <Text
              style={tw`text-title_color text-center text-base font-roboto-600`}
            >
              Your request for service add successfully.
            </Text>
          </View>
          {/* <TouchableOpacit
              style={tw`bg-button_color rounded-full py-3 mt-2`}
              onPress={handleClose}
            >
              <Text style={tw`text-white text-center text-lg font-roboto-600`}>
                View Quotes
              </Text>
            </TouchableOpacit> */}
        </View>
      </View>
    </Modal>
  );
};

export default HomeDeletedModal;
