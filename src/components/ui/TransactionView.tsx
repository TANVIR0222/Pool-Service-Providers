import tw from "@/src/lib/tailwind";
import { useViewMyEarningQuery } from "@/src/redux/myServicesApi/myServicesApi";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import GlobalLoading from "../GlobalLoading";

type UserProp = {
  name: string;
  image: string;
  id: number;
  price: number;
  des: string;
};

const TransactionView = () => {

  const { data, isLoading } = useViewMyEarningQuery(null);



  const renderItem = ({ item }: { item: any }) => {


    return (
      <TouchableOpacity
        key={item?.id}
        style={tw`rounded-2xl bg-input_bg_gray my-2`}
        onPress={() =>
          router.push({
            pathname: `/business-provider/transactions-view/[id]`,
            params: { id: item.id, price: item?.price_offered },
          })
        }
      >
        <View style={tw`flex-row items-center justify-between p-4`}>
          {/* Left side: Image + Name + Description */}
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              source={{ uri: makeImage(item?.user?.avatar) }}
              style={tw`w-12 h-12 rounded-2`}
            />
            <View>
              <Text style={tw`text-lg text-title_color font-roboto-600`}>
                {item?.user?.full_name}
              </Text>
              <Text
                style={tw`text-sm text-secondary_button_color font-roboto-400`}
              >
                {item?.describe_issue?.slice(0, 60)}
              </Text>
            </View>
          </View>

          {/* Right side: Price */}
          <Text style={tw`text-lg text-button_color font-roboto-700`}>
            ${item?.price_offered}
          </Text>
        </View>
      </TouchableOpacity>
    )
  };

  return isLoading ? <GlobalLoading /> : (
    <View style={tw`gap-3 flex-1 my-3`}>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-title_color text-xl font-roboto-600`}>
          Quotes Request Near you
        </Text>
        {/* <TouchableOpacity
          style={tw` flex flex-row items-center gap-1`}
        >
          <Text
            style={tw`text-secondary_button_color  text-sm font-roboto-500`}
          >
            Select
          </Text>
          <SvgXml xml={IconsButtomArrow} />
        </TouchableOpacity> */}

        {/* <View>
          <Dropdown />
        </View> */}
      </View>

      <FlatList
        data={data?.data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TransactionView;
