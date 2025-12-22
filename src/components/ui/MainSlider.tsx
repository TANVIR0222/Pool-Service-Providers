import tw from "@/src/lib/tailwind";
import { makeImage } from "@/src/utils/image_converter";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ListRenderItemInfo,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

// Props interface
interface MainSliderProps {
    images?: string[] | number[]; // Array of image URLs
}

// Type for internal image object
interface ImageItem {
    uri: string;
}

const MainSlider: React.FC<MainSliderProps> = ({ images = [] }) => {

    const flatListRef = useRef<FlatList<ImageItem>>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Normalize image URLs
    const imageUrls: ImageItem[] = images.map((img) => ({
        uri: typeof img === "string" ? makeImage(img) : "",
    }));

    // Scroll handler
    const scrollToIndex = (newIndex: number) => {
        if (newIndex >= 0 && newIndex < imageUrls.length) {
            flatListRef.current?.scrollToIndex({ animated: true, index: newIndex });
            setCurrentIndex(newIndex);
        }
    };

    if (!imageUrls?.length) return null;

    const renderItem = ({ item }: ListRenderItemInfo<ImageItem>) => (
        <Image
            source={{ uri: item.uri }}
            resizeMode="cover"
            style={{
                width: width - 33,
                height: 300,
                marginRight: 6,
                borderRadius: 8,
            }}
            defaultSource={require("@/assets/images/loadingImage.png")}
        />
    );

    return (
        <View style={tw`relative items-center justify-center`}>
            <FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                scrollEventThrottle={10}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                keyExtractor={(_, index) => index.toString()}
                data={imageUrls}
                renderItem={renderItem}
            />

            {/* Left Arrow */}
            {imageUrls?.length > 1 && (
                <TouchableOpacity
                    onPress={() => scrollToIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    style={[
                        tw`absolute left-2 top-1/2 -mt-4 bg-[#E2E2E2] p-1 rounded-full`,
                        { opacity: currentIndex === 0 ? 0.5 : 1 },
                    ]}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={26} color="black" />
                </TouchableOpacity>
            )}

            {/* Right Arrow */}
            {imageUrls.length > 1 && (
                <TouchableOpacity
                    onPress={() => scrollToIndex(currentIndex + 1)}
                    disabled={currentIndex === imageUrls.length - 1}
                    style={[
                        tw`absolute right-2 top-1/2 -mt-4 bg-[#E2E2E2] p-1 rounded-full`,
                        { opacity: currentIndex === imageUrls.length - 1 ? 0.5 : 1 },
                    ]}
                >
                    <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default MainSlider;
