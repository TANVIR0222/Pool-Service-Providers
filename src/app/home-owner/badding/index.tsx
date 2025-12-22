
import { IconsStar } from "@/assets/icons";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import { QuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useLazyGetListProviderQuery } from "@/src/redux/my_quote_api/myQuoteApi";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function BiddingHistory() {  // Fixed typo in function name (BaddingHistrory -> BiddingHistory)

  const { id } = useLocalSearchParams<{ id: string }>();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState<QuoteItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);


  const [fetchPosts, { isLoading }] = useLazyGetListProviderQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      if (isLoading) return;  // Prevent multiple simultaneous requests

      const res = await fetchPosts({
        status: 'pending',
        page: pageNum,
        quote_id: id
      }).unwrap();



      const newPosts = res?.data?.data ?? [];


      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore((res?.data?.current_page ?? 0) < (res?.data?.last_page ?? 0));
      setPage((res?.data?.current_page ?? 0) + 1);

    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isLoading) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={tw`my-2`}
        onPress={() =>
          router.push({
            pathname: `/home-owner/badding/[id]`,
            params: { id: item?.provider?.id, custom_status: item?.button, myquots: item?.id },
          })
        }
      >
        <View style={tw`flex-row items-start bg-[#ECF1F6] rounded-2xl justify-between p-2`}>
          <View style={tw`flex-col gap-4`}>
            <View style={tw`flex-row justify-between gap-1 items-start`}>
              <View style={tw`flex-row gap-2 w-[15%]`}>
                <Image
                  source={{ uri: makeImage(item?.provider?.avatar) }}
                  style={tw`w-12 h-12 rounded-full`}
                  resizeMode="cover"  // Added resizeMode for better image handling
                />
              </View>

              <View style={tw`flex-col gap-1 w-[60%]`}>
                <View style={tw`justify-center`}>
                  <Text style={tw`text-lg text-sub_title_color font-roboto-600`}>
                    {item?.provider?.full_name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={tw`text-base text-[#696969] font-roboto-400`}
                    numberOfLines={2}  // Added to prevent text overflow
                    ellipsizeMode="tail"
                  >
                    {item?.quote_outline?.slice(0, 80)}
                  </Text>
                </View>
              </View>

              <View style={tw`flex-col items-start gap-1 w-[25%]`}>
                <Text style={tw`text-base text-button_color font-roboto-700`}>
                  ${item?.price_offered ?? '0.00'}
                </Text>
                <View style={tw`flex-row items-center gap-1`}>
                  <SvgXml xml={IconsStar} />
                  <Text style={tw`text-sm text-title_color font-roboto-500`}>
                    {item?.average_rating ?? '0'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <Wrapper>
      <BackButton title="Back" />
      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between py-2`}>
          <Text style={tw`text-title_color text-xl font-roboto-600`}>
            List of bidding providers
          </Text>
          <Text style={tw`text-[#003B73] text-sm font-roboto-400`}>
            Total bids:
            <Text style={tw`text-[#003B73] text-sm font-roboto-700`}>
              {posts?.length}
            </Text>
          </Text>
        </View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          onRefresh={handleRefresh}  // Added pull-to-refresh functionality
          refreshing={refreshing}
          onEndReached={handleLoadMore}  // Added infinite scroll
          onEndReachedThreshold={0.5}
          ListEmptyComponent={  // Added empty state
            <Text style={tw`text-center mt-4 text-gray-500`}>
              No bids available
            </Text>
          }
        />
      </View>
    </Wrapper>
  );
}