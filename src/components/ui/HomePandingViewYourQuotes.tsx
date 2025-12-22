
import { DeletedQuoteProcessPaloade, QuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import {
  useLazyGetMyQuotesPendingQuery,
  useSingleUserDeleteQuoteMutation,
  useSingleUserViewQuoteQuery,
} from "@/src/redux/my_quote_api/myQuoteApi";
import { makeImage } from "@/src/utils/image_converter";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Modal,
  PanResponder,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import GlobalLoading from "../GlobalLoading";
import HomeDeletedModal from "./HomeDeletedModal";

const SwipeableRow = ({ item, onDelete, onPress }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const rowHeight = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          translateX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -80) {
          Animated.timing(translateX, {
            toValue: -80,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleDelete = () => {
    Animated.timing(rowHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => onDelete(item.id));
  };

  return (
    <Animated.View
      style={{
        height: rowHeight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
        overflow: "hidden",
        marginTop: 10,
      }}
    >
      {/* Hidden Delete Button */}
      <Animated.View
        style={[
          tw`absolute right-0 top-1/3 w-10 h-10 bg-red-500 items-center justify-center rounded-lg`,
          {
            opacity: translateX.interpolate({
              inputRange: [-80, -40, 0],
              outputRange: [1, 0.5, 0],
              extrapolate: "clamp",
            }),
            transform: [
              {
                scale: translateX.interpolate({
                  inputRange: [-80, 0],
                  outputRange: [1, 0.5],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Front Row */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          tw`bg-input_bg_gray rounded-xl`,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [-100, 0],
                  outputRange: [-80, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={tw`flex-row items-center justify-between p-4`}
        >
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              source={{ uri: makeImage(item?.photos[0]) }}
              style={tw`w-12 h-12 rounded`}
            />
            <View>
              <Text style={tw`text-lg text-title_color font-roboto-600`}>
                {item?.describe_issue}
              </Text>
              <Text style={tw`text-sm text-secondary_button_color font-roboto-400`}>
                Select a date :
                <Text style={tw`text-sm text-button_color font-roboto-400`}>
                  {item?.date}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>

  );
};

const HomePandingViewYourQuotes = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState<QuoteItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [viewPostId, setviewPostId] = useState<number[]>([]);
  const { data, isLoading: singlePostLoading } = useSingleUserViewQuoteQuery({
    post_id: viewPostId,
  });

  const [fetchPosts, { isLoading }] = useLazyGetMyQuotesPendingQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      const res = await fetchPosts({ status: "pending", page: pageNum }).unwrap();
      // console.log(res);

      const newPosts = res?.quotes?.data ?? [];
      if (isRefresh) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }
      setHasMore((res?.quotes?.current_page ?? 0) < (res?.quotes?.last_page ?? 0));
      setPage((res?.quotes?.current_page ?? 0) + 1);
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

  const [userId, setUserId] = useState<number>();
  const [deletesmodalVisible, setDeletesModalVisible] = useState<boolean>(false);
  const [viewModel, setViewModel] = useState<boolean>(false);

  const [delete_quote, { isLoading: deletedLoading, reset }] =
    useSingleUserDeleteQuoteMutation<DeletedQuoteProcessPaloade>();

  const handleDelete = async (user_id: number) => {
    try {
      const res = await delete_quote(user_id).unwrap();
      if (res?.status) {
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <GlobalLoading />
  ) : (
    <View style={tw`flex-1 gap-3`}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => String(index + 1)}
        renderItem={({ item }) => (
          <SwipeableRow
            item={item}
            onPress={(item: any) => {
              setViewModel(true);
              setviewPostId(item?.id);
            }}
            onDelete={(id: number) => {
              setUserId(id);
              setDeletesModalVisible(true);
              handleDelete(id);
            }}
          />
        )}
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
      />

      {/* Delete Modal */}
      <HomeDeletedModal
        deletesmodalVisible={deletesmodalVisible}
        setDeletesModalVisible={setDeletesModalVisible}
        userId={userId}
      />

      {/* View Modal */}
      <Modal
        visible={viewModel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setViewModel(false)}
      >
        <View style={tw`flex-1 items-end justify-end`}>
          <View style={tw`bg-white w-full shadow-xl max-h-[70%] p-4 rounded-lg`}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-2`}
            >
              <Image
                source={{ uri: makeImage(data?.data?.photos[0]) }}
                style={tw`w-full h-40 rounded-xl`}
                resizeMode="cover"
              />
              <View style={tw`w-full justify-between`}>
                <View style={tw`py-4`}>
                  <Text style={tw`text-base text-title_color font-roboto-600 mb-4`}>
                    {data?.data?.describe_issue}
                  </Text>
                  <View style={tw`flex-col gap-7`}>
                    <View>
                      <InfoRow label="Category" value={`${data?.data?.service}`} />
                      <InfoRow label="Property type" value={`${data?.data?.property_type}`} />
                      <InfoRow label="Service date" value={`${data?.data?.date}`} />
                      <InfoRow label="Zip code" value={`${data?.data?.zip_code}`} />
                      <InfoRow label="Address" value={`${data?.data?.address}`} />
                      <InfoRow
                        label="Expected budget"
                        value={`$${data?.data?.expected_budget}`}
                      />
                    </View>

                    {/* Buttons */}
                    <View style={tw`flex-col gap-4`}>
                      <TouchableOpacity
                        style={tw`bg-button_color py-3 rounded-full items-center`}
                        onPress={() => {
                          setViewModel(false);
                          router.push({
                            pathname: "/home-owner/badding",
                            params: { id: data?.data?.id },
                          });
                        }}
                      >
                        <Text style={tw`text-white text-lg font-roboto-600`}>
                          Check Bidding
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={tw`border-[#8F8F8F] border py-3 rounded-full items-center`}
                        onPress={() => setViewModel(false)}
                      >
                        <Text style={tw`text-secondary_button_color text-lg font-roboto-600`}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw`flex-row justify-between py-1`}>
    <Text style={tw`text-secondary_button_color font-roboto-400`}>{label}</Text>
    <Text style={tw`text-title_color text-sm font-roboto-500`}>{value}</Text>
  </View>
);

export default HomePandingViewYourQuotes;
