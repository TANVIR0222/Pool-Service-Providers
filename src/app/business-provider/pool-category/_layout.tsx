import { Stack } from "expo-router";
// import "react-native-reanimated";

export default function _layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />

        </Stack>
    );
}
