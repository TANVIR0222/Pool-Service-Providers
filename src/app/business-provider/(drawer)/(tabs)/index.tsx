import CustomHeader from "@/src/components/CustomHeader";
import CategoryWiseQuotes from "@/src/components/ui/CategoryWiseQuotes";
import HeroBanner from "@/src/components/ui/HeroBanner";
import QuotesRequestNearyou from "@/src/components/ui/QuotesRequestNearyou";
import Search from "@/src/components/ui/Search";
// import MenuBar from "@/src/components/ui/MenuBar";
import Wrapper from "@/src/components/Wrapper";
import tw from "@/src/lib/tailwind";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <Wrapper>
      <View style={tw`flex-1 `}>
        <CustomHeader />
        <Search provider_user={'probider'} />
        <ScrollView
          style={tw`flex-col gap-4 `}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <HeroBanner />
          <CategoryWiseQuotes />
          <QuotesRequestNearyou />
        </ScrollView>
      </View>
    </Wrapper>
  );
}
