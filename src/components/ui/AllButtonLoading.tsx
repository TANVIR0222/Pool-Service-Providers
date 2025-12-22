import tw from '@/src/lib/tailwind'
import React from 'react'
import { Text, View } from 'react-native'

type ButtonProps = {
    isLoading: boolean,
    name: string
}

const AllButtonLoading = ({ isLoading, name }: ButtonProps) => {
    return (
        <View>
            <Text style={tw`text-center text-white font-roboto-500`}>
                {isLoading ? 'Loading....' : name}
            </Text>
        </View>
    )
}

export default AllButtonLoading