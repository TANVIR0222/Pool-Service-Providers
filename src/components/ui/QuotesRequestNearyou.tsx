// import { QuoteItem } from "@/src/lib/global-type";
// import tw from "@/src/lib/tailwind";
// import { useLazyGetAllQuetsRequestQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
// import GlobalLoading from "../GlobalLoading";

// const QuotesRequestNearyou = () => {
//   const [posts, setPosts] = useState<QuoteItem[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [loadingMore, setLoadingMore] = useState<boolean>(false);

//   const [fetchPosts, { isLoading }] = useLazyGetAllQuetsRequestQuery();

//   // Load posts function
//   const loadPosts = async (pageNum = 1, isRefresh = false) => {
//     try {
//       const res = await fetchPosts({ page: pageNum }).unwrap();
//       // console.log(res);


//       const newPosts = res?.data?.data ?? [];

//       if (isRefresh) {
//         setPosts(newPosts);
//       } else {
//         setPosts((prev) => [...prev, ...newPosts]);
//       }

//       const currentPage = res?.data?.current_page ?? 0;
//       const lastPage = res?.data?.last_page ?? 0;

//       setHasMore(currentPage < lastPage);
//       setPage(currentPage + 1);
//     } catch (err) {
//       console.log("Fetch Error:", err);
//     } finally {
//       setRefreshing(false);
//       setLoadingMore(false);
//     }
//   };

//   // Pull-to-refresh handler
//   const handleRefresh = () => {
//     setRefreshing(true);
//     loadPosts(1, true);
//   };

//   // Load more handler
//   const handleLoadMore = () => {
//     if (!loadingMore && hasMore) {
//       setLoadingMore(true);
//       loadPosts(page);
//     }
//   };

//   // Initial load
//   useEffect(() => {
//     loadPosts();
//   }, []);



//   return (
//     <View style={tw`gap-3 flex-1 my-3`}>
//       {/* Header */}
//       <View style={tw`flex-row items-center justify-between`}>
//         <Text style={tw`text-title_color text-xl font-roboto-600`}>
//           Quotes Request Near you
//         </Text>
//         <TouchableOpacity
//           onPress={() => router.push("/business-provider/see-all-quotes")}
//         >
//           <Text style={tw`text-button_color underline text-xl font-roboto-600`}>
//             See all
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Quotes List */}
//       <FlatList
//         data={posts}
//         keyExtractor={(_, index) => String(index)}
//         renderItem={({ item }) => {

//           console.log(item?.user?.avatar);


//           return (
//             <TouchableOpacity
//               style={tw`rounded-2xl bg-input_bg_gray my-2`}
//               onPress={() =>
//                 router.push(`/business-provider/view-user-quotes/${item?.id}`)
//               }
//             >
//               <View style={tw`flex-row items-center justify-between p-4`}>
//                 {/* Left: Image + Name + Description */}
//                 <View style={tw`flex-row items-center gap-2`}>
//                   <Image
//                     source={{ uri: item?.user?.avatar }}
//                     style={tw`w-12 h-12 rounded-2`}
//                   />
//                   <View>
//                     <Text style={tw`text-lg text-title_color font-roboto-600`}>
//                       {item?.user?.full_name?.slice(0, 15)}
//                     </Text>
//                     <Text
//                       style={tw`text-sm text-secondary_button_color font-roboto-400`}
//                     >
//                       {item?.describe_issue?.slice(0, 70)}
//                     </Text>
//                   </View>
//                 </View>

//                 {/* Right: Expected Budget */}
//                 <Text style={tw`text-lg text-button_color font-roboto-700`}>
//                   ${item?.expected_budget ?? '--'}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           )
//         }}
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.5}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//         ListFooterComponent={() =>
//           loadingMore ? (
//             <GlobalLoading />
//           ) : null
//         }
//         nestedScrollEnabled={false}
//       />
//     </View>
//   );
// };

// export default QuotesRequestNearyou;


import { QuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useLazyGetAllQuetsRequestQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { makeImage } from "@/src/utils/image_converter";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import GlobalLoading from "../GlobalLoading";

const QuotesRequestNearyou = () => {
  const [posts, setPosts] = useState<QuoteItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [fetchPosts, { isLoading }] = useLazyGetAllQuetsRequestQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ page: pageNum }).unwrap();
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

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={tw`gap-3 flex-1 my-3`}>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-title_color text-xl font-roboto-600`}>
          Quotes Request Near you
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/business-provider/see-all-quotes")}
        >
          <Text style={tw`text-button_color underline text-xl font-roboto-600`}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item?.id ?? Math.random())}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`rounded-2xl bg-input_bg_gray my-2`}
            onPress={() =>
              router.push(`/business-provider/view-user-quotes/${item?.id}`)
            }
          >
            <View style={tw`flex-row items-center justify-between p-4`}>
              <View style={tw`flex-row items-center gap-2`}>
                <Image
                  source={{
                    uri: makeImage(item?.user?.avatar)
                  }}
                  style={tw`w-12 h-12 rounded-2`}
                />
                <View>
                  <Text style={tw`text-lg text-title_color font-roboto-600`}>
                    {item?.user?.full_name?.slice(0, 15) || "Unknown User"}
                  </Text>
                  <Text
                    style={tw`text-sm text-secondary_button_color font-roboto-400`}
                  >
                    {item?.describe_issue?.slice(0, 70) || "No description"}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-lg text-button_color font-roboto-700`}>
                ${item?.expected_budget ?? "--"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() =>
          loadingMore ? <GlobalLoading /> : null
        }
        nestedScrollEnabled={false}
      />
    </View>
  );
};

export default QuotesRequestNearyou;
