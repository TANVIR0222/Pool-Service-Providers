import CustomDrawerContent from "@/src/components/CustomDrawerContent";
import tw from "@/src/lib/tailwind";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#FF6B00",
        drawerLabelStyle: tw`text-base -ml-2 bg-black`, // Using tailwind directly
        drawerActiveBackgroundColor: "#000000",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    ></Drawer>
  );
}
