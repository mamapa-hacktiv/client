import { Image, Text, TextInput, View, VirtualizedList, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBars, faCircleXmark, faFilter, faGripLinesVertical, faSortDown } from "@fortawesome/free-solid-svg-icons";
import YoutubePlayer from "react-native-youtube-iframe";

export default function DetailPage() {
  return (
    <>
      <SafeAreaView>
        <View>
          <YoutubePlayer
            height={230}
            play={true}
            videoId={"hAv7XXll_Js"}
            />
        </View>
          <View style={{marginLeft: 30}}>
                <Text style={{textAlign : 'left', fontSize: 20, fontWeight : "bold", marginBottom : 5}} >Ingredients</Text>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 2 cup rice (use the cup that comes with the rice cooker)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 1/2 cup thick coconut milk (regular US cup)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 2 lemongrass (Indonesian: sereh), bruised and knotted
            </Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 2 fresh/frozen pandan leaves, washed and knotted</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 4 Indonesian bay leaves (Indonesian: daun salam)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 2 thin slices of galangal (Indonesian: lengkuas)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> - 1 teaspoon coriander powder (Indonesian: bubuk ketumbar)</Text>
            </View>
          </View>
          <View style={{marginLeft: 30}}>
                <Text style={{textAlign : 'left', fontSize: 20, fontWeight : "bold", marginBottom : 5}} >Steps</Text>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 1- 2 cup rice (use the cup that comes with the rice cooker)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 2 - 1/2 cup thick coconut milk (regular US cup)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 3 - 2 lemongrass (Indonesian: sereh), bruised and knotted
            </Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 4 - 2 fresh/frozen pandan leaves, washed and knotted</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 5 - 4 Indonesian bay leaves (Indonesian: daun salam)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 6 - 2 thin slices of galangal (Indonesian: lengkuas)</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.ingredientsName}> 7 - 1 teaspoon coriander powder (Indonesian: bubuk ketumbar)</Text>
            </View>
          </View>
            </SafeAreaView>
      </>
    )
  }


const styles = StyleSheet.create({
    hr: {
        borderWidth: 10,
        borderColor: 'rgba(219, 219, 219, 0.2)',
        marginVertical: 8
    },
    horizontal: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginRight: 20
    },
    ingredientsName: {
        fontSize: 13,
        color: '#000'
    },
})