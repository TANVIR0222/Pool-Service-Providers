// import * as ImagePicker from "expo-image-picker";
// import { View } from "react-native";

// import { IconsCamara } from "@/assets/icons";
// import { useState } from "react";
// import { SvgXml } from "react-native-svg";

// // import Button from '@/components/Button';
// // import ImageViewer from '@/components/ImageViewer';

// export default function GallaryImage() {
//   const [selectedImage, setSelectedImage] = useState<string | undefined>(
//     undefined
//   );

//   const pickImageAsync = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result?.assets[0]?.uri);
//     }
//   };

//   return (
//     <View>
//       <View>
//         {/* <Button title="Choose a photo"  /> */}
//         <SvgXml xml={IconsCamara} onPress={pickImageAsync} />
//       </View>
//     </View>
//   );
// }



import { IconsCamara } from "@/assets/icons";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "../../lib/tailwind";

export type SelectedAsset = {
  uri: string;
  type: "image" | "video";
  mimeType?: string; // optional রাখলেই conflict হবে না
};

// Props 
type Props = {
  selectedImages: SelectedAsset[];
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedAsset[]>>;
};

export default function GallaryImage({ selectedImages, setSelectedImages }: Props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"], // image + video
      allowsMultipleSelection: true, // (iOS only >14)
      selectionLimit: 5, // max 5
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      let newAssets: SelectedAsset[] = [];

      result.assets.forEach((picked) => {
        const type = picked.type === "video" ? "video" : "image";
        const newAsset: SelectedAsset = {
          uri: picked.uri,
          type,
          mimeType: picked.mimeType,
        };

        if (type === "video") {
          // যদি আগে থেকেই video থাকে, skip করব
          const alreadyVideo = selectedImages.some((a) => a.type === "video");
          if (!alreadyVideo) {
            newAssets.push(newAsset);
          }
        } else {
          newAssets.push(newAsset); // multiple image allowed
        }
      });

      // merge old + new
      setSelectedImages((prev) => {
        let merged = [...prev];

        newAssets.forEach((a) => {
          if (a.type === "video") {
            // পুরনো video remove করে নতুন video add করব
            merged = merged.filter((m) => m.type !== "video");
            merged.push(a);
          } else {
            merged.push(a);
          }
        });

        return merged;
      });
    }
  };

  return (
    <View style={tw``}>
      <View style={tw`flex-row justify-evenly items-center`}>
        <TouchableOpacity
          style={tw`rounded-md items-center`}
          onPress={pickImage}
        >
          <SvgXml xml={IconsCamara} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
