import BackButton from "@/src/components/ui/BackButton";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { useGetAllPrivacyPolicyQuery } from "@/src/redux/tncApi/tncApi";
import React from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import RenderHtml from 'react-native-render-html';

export default function PrivacyPolicy() {
  const { data } = useGetAllPrivacyPolicyQuery({ page_type: 'tnc' });
  const { width } = useWindowDimensions();


  return (
    <Wrapper>
      <BackButton title="Back" />
      <View style={tw`flex-1 mt-5`}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-4`} >
          {data?.data?.content ? (
            <View>
              <RenderHtml
                contentWidth={width}
                source={{ html: data?.data?.content }}
              />
            </View>
          ) : (
            <View style={tw`h-full`}>
              <Text
                style={tw`text-center text-3xl font-DegularDisplaySemibold text-gray-200 mt-10`}
              >
                No data available
              </Text>
            </View>
          )}

        </ScrollView>

      </View>
    </Wrapper>
  );
}


// import { IconsPP } from "@/assets/icons";
// import BackButton from "@/src/components/ui/BackButton";
// import Wrapper from "@/src/components/Wrapper";
// import tw from "@/src/lib/tailwind";
// import { useGetAllPrivacyPolicyQuery } from "@/src/redux/tncApi/tncApi";
// import React from "react";
// import { Text, View } from "react-native";
// import { SvgXml } from "react-native-svg";

// export default function PrivacyPolicy() {
//   const { data } = useGetAllPrivacyPolicyQuery({ page_type: 'tnc' });
//   console.log(data);

//   return (
//     <Wrapper>
//       <BackButton title="Back" />
//       <View style={tw`flex-1 mt-10`}>
//         <View style={tw`flex-row items-start gap-3`}>
//           {/* Icon */}
//           <SvgXml xml={IconsPP} />
//           {/* Text Content */}
//           <View style={tw`flex-col items-start gap-1`}>
//             <Text style={tw`text-2xl font-roboto-600  text-black`}>
//               Privacy Policy
//             </Text>
//             <Text style={tw`text-sm font-roboto-400 text-sub_title_color`}>
//               Updated July 17, 2025
//             </Text>
//           </View>
//         </View>
//         <View style={tw`flex-col items-start gap-3 pt-10`}>
//           {/* one */}
//           <View style={tw`flex-col items-start gap-3`}>
//             {/* Icon */}
//             <Text style={tw`text-xl font-roboto-600  text-[#003B73]`}>
//               1. Terms & Conditions
//             </Text>
//             {/* Text Content */}
//             <Text style={tw`text-sm font-roboto-400 text-sub_title_color`}>
//               Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus
//               lorem adipiscing. Convallis at mi dictumst nulla amet. Ipsum
//               consequat vel donec ut amet ante semper. Amet tempus tellus
//               aliquam volutpat enim dolor tristique.
//             </Text>
//           </View>
//           {/* one */}
//           <View style={tw`flex-col items-start gap-3`}>
//             {/* Icon */}
//             <Text style={tw`text-xl font-roboto-600  text-[#003B73]`}>
//               2. Your account
//             </Text>
//             {/* Text Content */}
//             <Text style={tw`text-sm font-roboto-400 text-sub_title_color`}>
//               Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus
//               lorem adipiscing. Convallis at mi dictumst nulla amet. Ipsum
//               consequat vel donec ut amet ante semper. Amet tempus tellus
//               aliquam volutpat enim dolor tristique.
//             </Text>
//           </View>
//           {/* one */}
//           <View style={tw`flex-col items-start gap-3`}>
//             {/* Icon */}
//             <Text style={tw`text-xl font-roboto-600  text-[#003B73]`}>
//               3. Payment procedure
//             </Text>
//             {/* Text Content */}
//             <Text style={tw`text-sm font-roboto-400 text-sub_title_color`}>
//               Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus
//               lorem adipiscing. Convallis at mi dictumst nulla amet. Ipsum
//               consequat vel donec ut amet ante semper. Amet tempus tellus
//               aliquam volutpat enim dolor tristique.
//             </Text>
//           </View>
//         </View>
//       </View>
//     </Wrapper>
//   );
// }
