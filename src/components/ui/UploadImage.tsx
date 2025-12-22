
import { IconsImageDeleted, IconsUploade } from "@/assets/icons";
import * as ImagePicker from "expo-image-picker";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

type SelectedAsset = {
  uri: string;
  type: "image" | "video";
  mimeType: string | undefined; // add this so it matches
};

// Props 
type Props = {
  selectedImages: SelectedAsset[]; // images/videos 
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedAsset[]>>; // 
};

export default function AddPhoto({ selectedImages, setSelectedImages }: Props) {
  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ["images", "videos"], // image + video
  //     allowsMultipleSelection: true, // (iOS only >14)
  //     selectionLimit: 5, // max 5
  //     quality: 1,
  //   });


  //   if (!result.canceled && result.assets?.[0]) {
  //     const picked = result.assets[0];
  //     const type = picked.type === "video" ? "video" : "image";
  //     const newAsset: SelectedAsset = { uri: picked.uri, type, mimeType: picked.mimeType };

  //     if (type === "video") {
  //       // only one video is allowed
  //       setSelectedImages([newAsset]);
  //     } else {
  //       // multipull image upload
  //       setSelectedImages((prev) => [...prev, newAsset]);
  //     }
  //   }
  // };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"], // image + video
      allowsMultipleSelection: true, // multiple  images 
      selectionLimit: 5, // max 5 images
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      // 
      const newAssets: SelectedAsset[] = result.assets.map((picked) => {
        const type = picked.type === "video" ? "video" : "image";
        return {
          uri: picked.uri,
          type,
          mimeType: picked.mimeType,
        };
      });

      // 
      const video = newAssets.find((a) => a.type === "video");

      if (video) {
        //
        setSelectedImages([video]);
      } else {
        //  multiple image allow
        setSelectedImages((prev) => [...prev, ...newAssets]);
      }
    }
  };


  const handleImageRemoved = (uri: string) => {
    const updated = selectedImages.filter((item) => item.uri !== uri);
    setSelectedImages(updated);
  };

  return (
    <View style={tw`mr-3`}>
      <View style={tw`flex-row gap-4 justify-evenly items-center`}>
        <TouchableOpacity
          style={tw`bg-[#ECF1F6] flex-1 p-6 rounded-md items-center mb-6`}
          onPress={pickImage}
        >
          <SvgXml xml={IconsUploade} />
        </TouchableOpacity>
      </View>

      {selectedImages.length > 0 && (
        <View style={tw`mb-4`}>
          <FlatList
            horizontal
            data={selectedImages}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={tw`relative gap-3 mr-3`}>
                {item.type === "image" ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={tw`w-16 h-16 rounded`}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={tw`w-16 h-16 bg-black rounded justify-center items-center`}>
                    <Text style={tw`text-white text-xs`}>🎥 Video</Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => handleImageRemoved(item.uri)}
                  style={tw`absolute top-1 right-1 bg-orange rounded p-0.5`}
                >
                  <SvgXml xml={IconsImageDeleted} width={16} height={16} />
                </TouchableOpacity>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}
