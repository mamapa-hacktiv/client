import { Image, Text, TextInput, View, VirtualizedList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBars, faCircleXmark, faFilter, faGripLinesVertical, faSortDown } from "@fortawesome/free-solid-svg-icons";
import YoutubePlayer from "react-native-youtube-iframe";

export default function DetailPage() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{}}>
          <YoutubePlayer
            height={300}
            play={true}
            videoId={"hAv7XXll_Js"}
          />
        </View>
        <Text>dan apa bila tak bersama</Text>
      </SafeAreaView>
    </>
  )
}