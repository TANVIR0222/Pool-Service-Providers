// import { IconsSearch } from '@/assets/icons'
// import BackButton from '@/src/components/ui/BackButton'
// import Wrapper from '@/src/components/Wrapper'
// import tw from '@/src/lib/tailwind'
// import { useSearchAllUserQuery } from '@/src/redux/get_quote/quoteCreateApi'
// import React from 'react'
// import { Text, TextInput, View } from 'react-native'
// import { SvgXml } from 'react-native-svg'
// import { useDebounce } from 'use-debounce'


// export default function UserSearch() {


//     const [searchQuery, setSearchQuery] = React.useState('')
//     const [value] = useDebounce(searchQuery, 900);
//     const { data } = useSearchAllUserQuery({ search: value });



//     return (
//         <Wrapper>
//             {/* Search section */}
//             <BackButton title="Browse Quotes" />
//             <View style={tw` flex-1`}>
//                 <View style={tw`flex-col gap-6 mt-3`}>
//                     <View
//                         style={tw`bg-input_bg_gray items-center rounded-full flex-row  px-4 gap-1`}
//                     >
//                         <SvgXml xml={IconsSearch} />
//                         <TextInput
//                             style={tw`py-4 flex-1`}
//                             placeholder="Search quotes"
//                             selectionColor="#888888"
//                             returnKeyType="search"
//                             clearButtonMode="while-editing"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                         />
//                     </View>
//                 </View>
//                 {/*  */}
//                 <View style={tw` flex-1 pb-5`}>

//                 </View>
//             </View>
//         </Wrapper>
//     )
// }



import { IconsSearch, IconsStar } from "@/assets/icons";
import GlobalLoading from "@/src/components/GlobalLoading";
import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import { QuoteItem } from "@/src/lib/global-type";
import tw from "@/src/lib/tailwind";
import { useLazyGetAllQuetsRequestUserQuery } from "@/src/redux/my_quote_api/myQuoteApi";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

// Debounce hook implementation
const useDebounce = (value: string, delay: number) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const Search = () => {
    const [userSearch, setUserSearch] = useState<string>('');
    const [posts, setPosts] = useState<QuoteItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);

    const debouncedSearch = useDebounce(userSearch, 500); // 500ms debounce delay


    const [fetchPosts, { isLoading }] = useLazyGetAllQuetsRequestUserQuery();


    // Load posts function
    const loadPosts = useCallback(async (pageNum = 1, isRefresh = false, searchTerm = '') => {
        try {
            const res = await fetchPosts({
                page: pageNum,
                search: userSearch
            }).unwrap();

            const newPosts = res?.data ?? [];

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
    }, [fetchPosts, userSearch]);

    // Pull-to-refresh handler
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        loadPosts(1, true);
    }, [loadPosts]);

    // Load more handler
    const handleLoadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page);
        }
    }, [loadingMore, hasMore, page, loadPosts]);

    // Initial load and search term change
    useEffect(() => {
        setPage(1);
        setRefreshing(true);
        loadPosts(1, true, debouncedSearch);
    }, [debouncedSearch]);

    // Handle search input change
    const handleSearchChange = (text: string) => {
        setUserSearch(text);
    };

    return (
        <Wrapper>
            {/* Search section */}
            <BackButton title="Browse Quotes" />
            <View style={tw`flex-1`}>
                <View style={tw`flex-col gap-6 mt-3`}>
                    <View
                        style={tw`bg-input_bg_gray items-center rounded-full flex-row px-4 gap-1`}
                    >
                        <SvgXml xml={IconsSearch} />
                        <TextInput
                            style={tw` h-12 px-2 flex-1`}
                            placeholder="Search quotes"
                            placeholderTextColor="#888888"
                            selectionColor="#888888"
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                            value={userSearch}
                            onChangeText={handleSearchChange}
                        />
                    </View>
                </View>

                {/* Quotes list */}
                <View style={tw`flex-1 pb-5 mt-4`}>
                    {isLoading && posts.length === 0 ? (
                        <GlobalLoading />
                    ) : (
                        <FlatList
                            data={posts}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={tw`rounded-2xl bg-input_bg_gray my-2`}
                                    onPress={() =>
                                        router.push({
                                            pathname: '/home-owner/view-provider',
                                            params: { id: item.id }
                                        })
                                    }
                                >
                                    <View style={tw`flex-row items-center justify-between p-4`}>
                                        {/* Left: Image + Name + Description */}
                                        <View style={tw`flex-row items-center gap-2 flex-1`}>
                                            <Image
                                                source={{ uri: item?.avatar }}
                                                style={tw`w-12 h-12 rounded-full`}
                                            />
                                            <View style={tw`flex-1`}>
                                                <Text
                                                    style={tw`text-lg text-title_color font-roboto-600`}
                                                    numberOfLines={1}
                                                >
                                                    {item?.full_name || 'Unknown User'}
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Right: Expected Budget / Rating */}
                                        <View style={tw`flex-row items-center gap-1`}>
                                            <SvgXml xml={IconsStar} width={18} height={18} />
                                            <Text style={tw`text-lg text-title_color font-roboto-700`}>
                                                {item?.average_rating}
                                            </Text>
                                        </View>

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
                                    <GlobalLoading />
                                ) : null
                            }
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>
            </View>
        </Wrapper>
    );
};

export default Search;