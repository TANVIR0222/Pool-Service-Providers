// import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
// import {
//     GoogleSignin,
//     GoogleSigninButton
// } from '@react-native-google-signin/google-signin';

// import React from 'react';
// import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
// GoogleSignin.configure({
//     webClientId: "699303515148-imi2149vd7gbi123sorrl4ercc04rci2.apps.googleusercontent.com"
// });




// const GoogleLogin = () => {


//     const signIn = async () => {
//         console.log('------');


//         let idToken;
//         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//         // Get the users ID token
//         const signInResult = await GoogleSignin.signIn();

//         console.log('-----------', signInResult);


//         // Try the new style of google-sign in result, from v13+ of that module
//         idToken = signInResult.data?.idToken;
//         if (!idToken) {
//             // if you are using older versions of google-signin, try old style result
//             idToken = signInResult.idToken;
//         }
//         if (!idToken) {
//             throw new Error('No ID token found');
//         }


//         console.log(idToken);


//         // Create a Google credential with the token
//         const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);

//         // Sign-in the user with the credential
//         return signInWithCredential(getAuth(), googleCredential);
//     };

//     const googleSingOut = () => {
//         GoogleSignin.signOut()
//     }


//     return (
//         <View style={{
//             width: Dimensions.get("screen").width,
//             height: Dimensions.get("screen").height,
//             alignItems: "center", // center horizontally
//         }}>

//             <GoogleSigninButton
//                 size={GoogleSigninButton.Size.Wide}
//                 color={GoogleSigninButton.Color.Dark}
//                 onPress={() => signIn()}
//             />;

//             <TouchableOpacity onPress={() => googleSingOut()}>
//                 <Text>Singout</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default GoogleLogin



import { IconsGoogle } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import {
    GoogleSignin
} from "@react-native-google-signin/google-signin";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

//  Configure Google Signin once at the top-level
GoogleSignin.configure({
    webClientId: '699303515148-mjdimcg7ohjotagt2228m1fs5fjgkcs2.apps.googleusercontent.com',
});

const GoogleLogin = () => {

    // console.log('--------------');

    // Google Login
    const signIn = async () => {
        // console.log('-------------------');

        try {
            // Ensure Play Services are available
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            // ✅ Latest API: idToken comes directly here
            const res = await GoogleSignin.signIn();


            // if (!idToken) {
            //     throw new Error("No ID token found");
            // }

            // Create a Google credential with the token
            // const googleCredential = GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            // const result = await signInWithCredential(getAuth(), googleCredential);
        } catch (error) {
            console.error("Google Sign-In error:", error);
        }
    };

    // Google Logout
    const googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess(); // optional
            await GoogleSignin.signOut();
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    return (
        <View
            style={tw` `}
        >
            {/* <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            /> */}

            <TouchableOpacity
                style={tw`w-full px-4 py-4 rounded-full  border border-[#696969] flex-row justify-center items-center gap-3`}
                activeOpacity={0.8}
            >
                <SvgXml xml={IconsGoogle} />
                <Text style={tw`text-black text-base font-roboto-600 text-center`}>
                    Continue with Google
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default GoogleLogin;


