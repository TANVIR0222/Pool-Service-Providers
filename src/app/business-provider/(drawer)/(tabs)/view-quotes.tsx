import {
  IconsActiveComplite,
  IconsActivePanding,
  IconsActiveProgress,
  IconsComplete,
  IconsPanding,
  IconsProgress,
} from "@/assets/icons";
import PandingViewYourQuotes from "@/src/components/ui/PandingViewYourQuotes";
import ProgressViewYourQuotes from "@/src/components/ui/ProgressViewYourQuotes";
import ViewYourQuotes from "@/src/components/ui/ViewYourQuotes";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { width } from "@/src/utils/utils";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

type TabType = {
  key: string;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
};

const TABS: TabType[] = [
  {
    key: "pending",
    label: "Pending",
    activeIcon: IconsActivePanding,
    inactiveIcon: IconsPanding,
  },
  {
    key: "inProgress",
    label: "In Progress",
    activeIcon: IconsActiveProgress,
    inactiveIcon: IconsProgress,
  },
  {
    key: "complete",
    label: "Complete",
    activeIcon: IconsActiveComplite,
    inactiveIcon: IconsComplete,
  },
];

const ViewQuotes = () => {
  const [activeKey, setActiveKey] = useState<string>("pending");

  return (
    <Wrapper>
      <View style={tw` relative`}>
        <Image
          source={require("@/assets/images/View-Quotes.png")}
          style={tw`w-full h-38 rounded-xl`}
        />
        <View
          style={tw`absolute top-[25%] left-0 right-0 px-6 flex-col gap-2.5`}
        >
          <Text style={tw`text-2xl text-white font-roboto-600`}>
            View Your Quotes
          </Text>
          <Text style={tw`text-sm text-white font-roboto-500`}>
            You can track your every quotes to check the working progress.
          </Text>
        </View>
      </View>
      {/* tabs  */}
      <View style={tw`flex-row justify-around items-center py-4`}>
        {TABS.map(({ key, label, activeIcon, inactiveIcon }) => {
          const isActive = key === activeKey;

          return (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveKey(key)}
              style={tw`items-center px-3`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <SvgXml xml={isActive ? activeIcon : inactiveIcon} />
                <Text
                  style={[tw.style(
                    " font-semibold",
                    isActive ? "text-[#003366]" : "text-secondary_button_color",
                    {
                      fontSize: width > 400 ? 16 : 14
                    }
                  )]}
                >
                  {label}
                </Text>
              </View>

              {isActive && <View style={tw`h-0.5 bg-[#003366] w-full `} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/*  */}

      {activeKey === "pending" && <PandingViewYourQuotes />}
      {activeKey === "inProgress" && <ProgressViewYourQuotes />}
      {activeKey === "complete" && <ViewYourQuotes />}
    </Wrapper>
  );
};

export default ViewQuotes;
