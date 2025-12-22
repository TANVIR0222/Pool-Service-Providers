import { IconsButtomArrow } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const data: string[] = ["This month", "This week", "This year", "Select"];

export default function Dropdown() {
  const [selected, setSelected] = useState<string>("Select");
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View style={tw`w-full`}>
      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={tw`flex-row items-center justify-between`}
      >
        <Text style={tw`text-base text-gray-600`}>{selected}</Text>
        <SvgXml xml={IconsButtomArrow} />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={tw`flex-1 justify-center items-center bg-black/30`}
        >
          <View style={tw`bg-white rounded-md w-3/4 max-h-60 p-4`}>
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw`p-2`}
                  onPress={() => {
                    setSelected(item);
                    setVisible(false);
                  }}
                >
                  <Text style={tw`text-base text-gray-700`}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
