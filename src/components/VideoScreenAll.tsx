import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';
import { makeImage } from '../utils/image_converter';


type VideoScreenProps = {
    source: string; // dynamic video url
};

const VideoScreen = ({ source }: VideoScreenProps) => {



    const videoUrl = makeImage(source);

    const player = useVideoPlayer(videoUrl, (player) => {
        player.loop = true;
        player.play(); // autoplay
    });


    return (
        <View style={styles.contentContainer}>
            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />

        </View>
    );
}

export default VideoScreen;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,

    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});
