
import GlobalLoading from "@/src/components/GlobalLoading";
import Wrapper from "@/src/components/Wrapper";
import BackButton from "@/src/components/ui/BackButton";
import CategoryUser from "@/src/components/ui/CategoryUser";
import { QuoteItemCategory } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useLazyGetAllSingleCategoryQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";

const SingleCategory = () => {
  const { category } = useLocalSearchParams();




  const [posts, setPosts] = useState<QuoteItemCategory[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [fetchPosts, { isLoading }] = useLazyGetAllSingleCategoryQuery();

  // Load posts function
  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ page: pageNum, category: 'plambing' }).unwrap();
      const newPosts = res?.data?.data ?? [];

      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      const currentPage = res?.data?.current_page ?? 0;
      const lastPage = res?.data?.last_page ?? 0;

      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // Pull-to-refresh handler
  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
  };

  // Load more handler
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  // Initial load
  useEffect(() => {
    loadPosts();
  }, []); // reload when category changes

  return (
    <Wrapper>
      <BackButton title="Back" />

      <View style={tw`flex-1`}>
        {/* Category Banner */}
        <View style={tw`flex-col gap-2.5 justify-center relative`}>
          <Image
            source={require("@/assets/images/view-catagory-banner.png")}
            style={tw`w-[370px] h-[102px] rounded-xl`}
            resizeMode="cover"
          />
          <View style={tw`absolute top-1/4 left-6 w-full`}>
            <Text style={tw`text-2xl font-roboto-700 text-white`}>
              {/* {category} TODO  */}
            </Text>
            <Text style={tw`text-sm font-roboto-500 text-white`}>
              You have to clean pool with your best.
            </Text>
          </View>
        </View>

        {/* Quotes List */}
        <FlatList
          data={posts}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`rounded-2xl bg-input_bg_gray my-2`}
              onPress={() =>
                router.push(`/business-provider/view-user-quotes/${item.id}`)
              }
            >
              <View style={tw`flex-row items-center justify-between p-4`}>
                {/* Left: Image + Name + Description */}
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    source={{ uri: item.user.avatar }}
                    style={tw`w-12 h-12 rounded-2`}
                  />
                  <View>
                    <Text style={tw`text-lg text-title_color font-roboto-600`}>
                      {item.user.full_name}
                    </Text>
                    <Text
                      style={tw`text-sm text-secondary_button_color font-roboto-400`}
                    >
                      {item.describe_issue.slice(0, 70)}
                    </Text>
                  </View>
                </View>
                {/* <Text style={tw`text-lg text-button_color font-roboto-700`}>
                  ${item.expected_budget ?? '--'}
                </Text> */}
              </View>
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={() =>
            loadingMore ? (
              <View style={tw`py-4 items-center justify-center`}>
                <GlobalLoading />
              </View>
            ) : null
          }
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />

        {/* Category Info / Component */}
        <CategoryUser />
      </View>
    </Wrapper>
  );
};

export default SingleCategory;
