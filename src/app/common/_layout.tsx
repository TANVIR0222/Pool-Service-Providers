import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="[id]" />
      <Stack.Screen name="index" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="subscription-plan" />
    </Stack>
  )
}
