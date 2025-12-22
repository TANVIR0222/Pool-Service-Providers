import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Stack */}
            <Stack.Screen name="index" />
        </Stack>
    )
}