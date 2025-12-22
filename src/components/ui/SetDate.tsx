
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
  const [date, setDate] = useState(initialDate || new Date());
  const [showPicker, setShowPicker] = useState(false);



  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios"); // iOS stays open, Android auto-hides
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate); // Update Formik state
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={tw`bg-[#ECF1F6] p-3 rounded-md flex-row items-center justify-between`}
        onPress={() => setShowPicker(true)}
      >
        <Text style={tw`text-base text-title_color`}>
          {date
            ? new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })
            : "Select date"}
        </Text>
        <SvgXml xml={IconsDate} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default SetDate;