import { IconsDone } from "@/assets/icons";
import { ViewMyQuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useLazyGetMyViewQuotesQuery } from "@/src/redux/myServicesApi/myServicesApi";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import GlobalLoading from "../GlobalLoading";


const ViewYourQuotes = () => {


  // const renderItem = (item) => (
  //   <TouchableOpacity
  //     key={item?.id}
  //     style={tw`rounded-2xl bg-input_bg_gray my-2`}
  //     onPress={() =>
  //       router.push({
  //         pathname: "/business-provider/view-quotes/complete-view/[id]",
  //         params: { id: String(item.id) },
  //       })
  //     }
  //   >
  //     <View style={tw`flex-row items-center justify-between p-4 relative`}>
  //       {/* Left side: Image + Name + Description */}
  //       <View style={tw`flex-row items-center gap-2`}>
  //         <Image
  //           source={{ uri: item?.image }}
  //           style={tw`w-12 h-12 rounded-2`}
  //         />
  //         <View>
  //           <Text style={tw`text-lg text-title_color font-roboto-600`}>
  //             {item.name}
  //           </Text>
  //           <Text
  //             style={tw`text-sm text-secondary_button_color font-roboto-400`}
  //           >
  //             {item.des.slice(0, 30)}...
  //           </Text>
  //         </View>
  //       </View>

  //       {/* Right side: Price */}
  //       <Text style={tw`text-lg text-[#003B73] font-roboto-700`}>
  //         ${item.price}
  //       </Text>

  //       <View style={tw` absolute -top-1 -left-0`}>
  //         <SvgXml xml={IconsDone} />
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );




  const [posts, setPosts] = useState<ViewMyQuoteItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [fetchPosts, { isLoading }] = useLazyGetMyViewQuotesQuery();

  // Load posts function
  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ page: pageNum, status: "Completed" }).unwrap();
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
  }, []);


  return (
    <View style={tw`gap-3 flex-1`}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={tw`rounded-2xl bg-input_bg_gray my-2`}
              onPress={() =>
                router.push({
                  pathname: "/business-provider/view-quotes/complete-view/[id]",
                  params: { id: item?.quote?.id },
                })
              }
            >
              <View style={tw`flex-row items-center justify-between p-4 relative`}>
                {/* Left side: Image + Name + Description */}
                <View style={tw`flex-row items-center gap-2`}>
                  <Image
                    source={{ uri: item?.quote.avatar }}
                    style={tw`w-12 h-12 rounded-2`}
                  />
                  <View>
                    <Text style={tw`text-lg text-title_color font-roboto-600`}>
                      {item?.quote?.user?.full_name}

                    </Text>
                    <Text
                      style={tw`text-sm text-secondary_button_color font-roboto-400`}
                    >
                      {item?.quote_outline.slice(0, 30)}...
                    </Text>
                  </View>
                </View>

                {/* Right side: Price */}
                <Text style={tw`text-lg text-[#003B73] font-roboto-700`}>
                  ${item?.price_offered}
                </Text>

                {item?.quote?.is_paid === 1 && <View style={tw` absolute -top-1 -left-0`}>
                  <SvgXml xml={IconsDone} />
                </View>}
              </View>
            </TouchableOpacity>
          )
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() =>
          loadingMore ? (
            <GlobalLoading />
          ) : null
        }
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />



    </View>
  );
};

export default ViewYourQuotes;
