


import { MyQuotesResponse, QuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useLazyGetMyQuotesInPreogreeQuery } from "@/src/redux/my_quote_api/myQuoteApi";
import { formatDate } from "@/src/utils/formatDate";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const HomeProgressViewYourQuotes = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [posts, setPosts] = useState<QuoteItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [fetchPosts, { isLoading }] = useLazyGetMyQuotesInPreogreeQuery<MyQuotesResponse>();



  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ status: "In progress", page: pageNum }).unwrap();


      // Extra safe data handling
      const responseData = res?.data || {};
      const newPosts = Array.isArray(responseData.data)
        ? res.data.data.filter((item: QuoteItem) => item?.id)
        : [];

      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...(prev || []), ...newPosts]);
      }

      // Fixed pagination - using responseData instead of res?.quotes
      setHasMore(
        (responseData.current_page ?? 0) < (responseData.last_page ?? 0)
      );
      setPage((responseData.current_page ?? 0) + 1);
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




  const renderItem = ({ item }: { item: QuoteItem }) => {
    // Null check for item
    if (!item?.id) return null;
    return (
      <TouchableOpacity
        style={tw`rounded-2xl bg-input_bg_gray my-2`}
        onPress={() =>
          router.push({
            pathname: "/home-owner/process/[id]",
            params: { id: String(item?.quote_id), provider_id: item?.provider_id },
          })
        }
      >
        <View style={tw`flex-row items-center justify-between p-4`}>
          <View style={tw`flex-row items-center gap-2`}>
            {item && (
              <Image
                source={{ uri: makeImage(item?.avatar) }}
                style={tw`w-12 h-12 rounded-2`}
              />
            )}
            <View>
              <Text style={tw`text-lg text-title_color font-roboto-600`}>
                {item?.quote_outline || 'No description available'}
              </Text>
              <Text
                style={tw`text-sm text-secondary_button_color font-roboto-400`}
              >
                Select a date:
                <Text style={tw`text-sm text-button_color font-roboto-400`}>
                  {formatDate(item.created_at) || 'No date selected'}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`gap-3 flex-1`}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => String(index + 1)}
        renderItem={renderItem}
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
    </View>
  );
};

export default HomeProgressViewYourQuotes;
