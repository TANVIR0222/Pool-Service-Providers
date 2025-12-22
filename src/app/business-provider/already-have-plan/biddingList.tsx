import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import EditeQuoteModel from "@/src/components/ui/EditeQuoteModel";
import Wrapper from "@/src/components/Wrapper";
import { QuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useBiddisCompliteMutation, useLazySingleBiddingListViewQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import dateFormate from "@/src/utils/dateFormate";
import { makeImage } from "@/src/utils/image_converter";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";

const BiddingList = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { quote_id, price } = useLocalSearchParams<{ quote_id: string; price: string }>()


  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [posts, setPosts] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [viewBidts, setviewBidts] = useState<string[]>([]);

  const [fetchPosts, { isLoading }] = useLazySingleBiddingListViewQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ page: pageNum, quote_id: quote_id }).unwrap();
      // Extra safe data handling
      const newPosts: any = Array.isArray(res?.data)
        ? res.data.filter((item: QuoteItem) => item?.id)
        : [];

      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...(prev || []), ...newPosts]);
      }

      setHasMore(
        (res?.data?.current_page ?? 0) < (res?.data?.last_page ?? 0)
      );
      setPage((res?.data?.current_page ?? 0) + 1);
      setviewBidts(res?.your_bid_value);

    } catch (err) {
      console.error("Fetch Error:", err);
      setPosts([]); // Reset on error
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
    if (!loadingMore && hasMore && !isLoading && !refreshing) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);


  const [mark_complite, { isLoading: compliteLoading }] = useBiddisCompliteMutation()


  const handleSubmit = async () => {

    try {
      const res = await mark_complite({ quote_id }).unwrap();



      if (res?.status === true) {
        router.push("/business-provider/(drawer)/(tabs)/view-quotes",);
      } else {
        Alert.alert("Message", res?.message || "Something went wrong");
      }
    } catch (err: any) {
      Alert.alert("Message", err?.data?.message || "Server error");
    }
  };


  return isLoading ? <GlobalLoading /> : (
    <Wrapper>
      <BackButton title="Bidding list" />
      <Text style={tw` text-[#000] text-xl font-roboto-600 my-2`}>
        Your asking bid price : ${viewBidts}
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) =>

        (
          <TouchableOpacity
            style={tw`rounded-2xl bg-input_bg_gray my-1`}
            onPress={() =>
              router.push(`/business-provider/view-user-quotes/${item?.id}`)
            }
          >
            <View style={tw`flex-row items-center justify-between p-4`}>
              {/* Left side: Image + Name + Description */}
              <View style={tw`flex-row items-center gap-2`}>
                <Image
                  source={{ uri: makeImage(item?.provider?.avatar) }}
                  style={tw`w-12 h-12 rounded-2`}
                />
                <View>
                  <Text style={tw`text-lg text-title_color font-roboto-600`}>
                    {item?.provider?.full_name}
                  </Text>
                  <Text
                    style={tw`text-sm text-secondary_button_color font-roboto-400`}
                  >
                    Asking price: ${item?.price_offered}
                  </Text>
                </View>
              </View>

              {/* Right side: Price */}
              <Text style={tw`text-sm text-button_color font-roboto-700`}>
                {dateFormate(item?.created_at)}
              </Text>
            </View>
          </TouchableOpacity>


        )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#000"]}
            tintColor="#000"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#000" style={tw`my-4`} />
          ) : null
        }
        ListEmptyComponent={
          !isLoading && !refreshing && posts.length === 0 ? (
            <Text style={tw`text-center mt-10 text-gray-500`}>
              No recent activity found.
            </Text>
          ) : null
        }
      />

      {/*  */}
      {/* Chat & Quote Buttons - Fixed bottom */}
      <View style={tw` mb-5  flex-col gap-2`}>
        <TouchableOpacity
          style={tw` border border-[#8F8F8F] rounded-full py-3 items-center`}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={tw`text-secondary_button_color text-base font-roboto-600`}
          >
            Edit your bid
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw` bg-button_color rounded-full py-3 items-center`}
          disabled={compliteLoading}
          onPress={() =>
            // router.push("/business-provider/already-have-plan/finalBidding")
            handleSubmit()
          }
        >
          <Text style={tw`text-white text-base font-roboto-600`}>
            Make Final & Save
          </Text>
        </TouchableOpacity>
      </View>
      {/* View mode */}
      <EditeQuoteModel
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(!modalVisible)}
        id={quote_id}
      />
    </Wrapper>
  );
};

export default BiddingList;
