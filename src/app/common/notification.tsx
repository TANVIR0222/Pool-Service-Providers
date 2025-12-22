
import GlobalLoading from "@/src/components/GlobalLoading";
import Wrapper from "@/src/components/Wrapper";
import BackButton from "@/src/components/ui/BackButton";
import { instagramTime } from "@/src/lib/lib";
import tw from "@/src/lib/tailwind";
import { useLazyGetAllNotificationsInfoQuery, useReadAllNotificationsMutation, useReadSingleNotificationsMutation } from "@/src/redux/notifications/notificationsApi";
import { makeImage } from "@/src/utils/image_converter";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function Notification() {
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [readIds, setReadIds] = useState<(string | number)[]>([]);


  const [fetchPosts, { isLoading }] = useLazyGetAllNotificationsInfoQuery();
  const [readSingleNotification] = useReadSingleNotificationsMutation();
  const [readAllNotification] = useReadAllNotificationsMutation();

  // Load posts
  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ page: pageNum, status: "Pending" }).unwrap();
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

  // Pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
    setClickedId(null);
  };

  // Load more
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };



  // Read single notification
  const handleReadNotification = async (id: string) => {

    try {
      await readSingleNotification({ notification_id: id }).unwrap();
      setReadIds((prev) => [...prev, id]); // 
    } catch (err) {
      console.log("Read Notification Error:", err);
    }
  };
  const handleReadAllNotification = async () => {

    try {
      await readAllNotification(null).unwrap();
      // Mark all as read visually
      setReadIds(posts.map((post) => post.id));
    } catch (err) {
      console.log("Read All Notification Error:", err);
    }


  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (isLoading && posts?.length === 0) {
    return (
      <Wrapper>
        <View style={tw`flex-1 items-center justify-center`}>
          <GlobalLoading />
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center justify-between mb-2`}>
          <BackButton title="Notifications" />
          <TouchableOpacity onPress={() => handleReadAllNotification()}>
            <Text style={tw`text-center text-[#E53E3E] text-sm font-roboto-600 underline`}>
              Read all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item }) => {
            const isClicked = clickedId === item.id;

            return (
              <TouchableOpacity onPress={() => handleReadNotification(item.id)}>
                <View
                  style={tw`flex-row justify-between items-center my-1 p-2 pr-3 rounded-2 ${isClicked ? "" : "bg-[#D5D5D51A]"
                    }`}
                >
                  <View style={tw`flex-row gap-2 flex-1`}>
                    <Image
                      style={tw`h-14 w-14 rounded-full`}
                      source={{ uri: makeImage(item.data?.provider_avatar) }}
                    />
                    <View style={tw`flex-col gap-1 flex-1`}>
                      <View style={tw`flex-row gap-1 flex-wrap`}>
                        <Text style={tw`text-sm font-roboto-600`}>
                          {item.data?.provider_name}
                        </Text>
                        <Text style={tw`text-sm text-text_gray`}>
                          {item.data?.message}
                        </Text>
                      </View>
                      <Text style={tw`text-sm text-text_gray`}>
                        {instagramTime(item.created_at || item.time)}
                      </Text>
                    </View>
                  </View>

                  {item.read_at === null && !readIds.includes(item.id) && (
                    <View style={tw`w-2 h-2 rounded-full bg-[#E53E3E]`} />
                  )}

                </View>
              </TouchableOpacity>
            );
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          ListFooterComponent={loadingMore ? <GlobalLoading /> : null}
          nestedScrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Wrapper>
  );
}
