import { IconsDate } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface SetDateProps {
  initialDate: Date;
  onDateChange: (date: Date) => void;
}

const SetDate = ({ initialDate, onDateChange }: SetDateProps) => {
  const [time, setTime] = useState(initialDate || new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setTime(selectedDate);
      onDateChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={tw`bg-[#ECF1F6] p-3 rounded-md flex-row items-center justify-between`}
        onPress={() => setShowPicker(true)}
      >
        <Text style={tw`text-base text-title_color`}>
          {time
            ? new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // optional: for AM/PM format
            })
            : "Select time"}
        </Text>

        <SvgXml xml={IconsDate} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default SetDate;
