import tw from "@/src/lib/tailwind";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity, View } from "react-native";

type Props = {
    setImage: (image: string) => void;
};


const UpdateProfileCard = ({ setImage }: Props) => {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={pickImage}>
                <View style={tw`absolute bottom-0 left-2 bg-blue-500 p-2 rounded-full`}>
                    <Feather name="camera" size={18} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfileCard;
