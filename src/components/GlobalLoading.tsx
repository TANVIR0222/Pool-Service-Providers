import tw from '@/src/lib/tailwind';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const GlobalLoading = () => {
    return (
        <View style={tw`flex-1 bg-bg_primary justify-center items-center`}>
            <ActivityIndicator size="large" color="#000" />
        </View>
    );
};

export default GlobalLoading;
