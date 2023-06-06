import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, Image } from "react-native";
import { Carousel } from "react-native-auto-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBowlFood, faCookieBite, faIceCream, faMagnifyingGlass, faMugSaucer, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import { faClock } from "@fortawesome/free-regular-svg-icons";

const fetchRecipe = gql`
query FindRecipes {
  findRecipes {
    cookingTime
    id
    image
    title
    description
  }
}
`;

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 3;

const DEVICE_WIDTH = Dimensions.get("window").width;
const IMAGES = [
  {
    imageUrl: "https://i.ibb.co/PCSZqGY/nasi-goreng.png",
    title: "Nasi Goreng",
    cookingTime: "35 menit"
  },
  {
    imageUrl: "https://i.ibb.co/98wNVz6/soto-mie.png",
    title: "Soto mie",
    cookingTime: "15 menit"
  },
  {
    imageUrl: "https://i.ibb.co/fqs04n0/Jengkol-sambel-teri.png",
    title: "Jengkol sambel teri",
    cookingTime: "30 menit"
  },
  {
    imageUrl: "https://i.ibb.co/S5fSdgg/Tumis-kangkung.png",
    title: "Tumis kangkung",
    cookingTime: "10 menit"
  }
];



export default function HomePage() {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(fetchRecipe);

  function limitStringTo20Words(inputString) {
    var words = inputString.split(" ");
    var numWords = words.length;

    if (numWords <= 20) {
      return inputString;
    }

    var truncatedWords = words.slice(0, 20);
    var truncatedString = truncatedWords.join(" ");
    return truncatedString + " ...";
  }

  function getRandomElementsFromArray(array, numElements) {
    var shuffledArray = array.slice();
    var selectedElements = [];
    var currentIndex = shuffledArray.length;
    var temporaryValue, randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    selectedElements = shuffledArray.slice(0, numElements);

    return selectedElements;
  }


  console.log();


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 2, height: 300 }}>
          {
          getRandomElementsFromArray(data.findRecipes, 4).length > 0 &&
            <Carousel
              data={getRandomElementsFromArray(data.findRecipes, 4)}
              renderItem={(item, index) => (
                <Pressable key={index} onPress={() => navigation.navigate('Detail', { id: item.id })}>
                  <View
                    key={index}
                    style={{
                      height: 250, position: 'relative',
                      width: DEVICE_WIDTH,
                    }}
                    colors={['green', 'red']}>
                    <View style={{ position: 'absolute', zIndex: 3, bottom: 20, marginLeft: 20, }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', elevation: 100 }} >{item.title}</Text>
                      <Text style={styles.textTime} ><FontAwesomeIcon icon={faClock} color={"white"}></FontAwesomeIcon> {item.cookingTime}</Text>
                    </View>
                    <LinearGradient style={{position : 'absolute',height: 310, width : DEVICE_WIDTH , top : 0, left : 0}} colors={['transparent', 'rgba(0,0,0,0.8)']}/>
                    <Image
                      src={item.image}
                      style={{
                        height: 310,
                        width: DEVICE_WIDTH,
                        resizeMode: "cover",
                        position: "relative",
                        zIndex : -1
                      }}
                      />
                  </View>
                </Pressable>
              )}
            />
            }
          <Image style={{ position: "absolute", marginTop: 220, width: "100%" }} source={require('../assets/vector12.png')} />
        </View>
        <View style={{ flex: 3, backgroundColor: 'white' }}>
          <View style={styles.fixToText}>
            <Pressable
              style={styles.button1}
              onPress={() => navigation.navigate('SearchPage')}
            >
              <Text style={styles.text1}><FontAwesomeIcon icon={faMagnifyingGlass} size={15} style={{ color: "#98A8BA", }} /> Search</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Chat with AI')}
            >
              <Text style={styles.text}><MaterialCommunityIcons name="robot-happy" color={"#ffffff"} size={21} /> Tanya Saya!</Text>
            </Pressable>
          </View>

          <Text style={styles.textHeaders}>Resep Terbaru</Text>

          {data.findRecipes && <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: 10 }} >
            {data.findRecipes.map((el, index) => {
              return (
                <Pressable key={index} onPress={() => navigation.navigate('Detail', { id: el.id })} >

                  <View style={styles.container}>

                    <Image style={styles.photo} source={{ uri: el.image }} />
                    <Text style={styles.title}>{el.title}</Text>
                    <Text style={styles.descriptions}>{el.description ? limitStringTo20Words(el.description) : el.description}</Text>
                  </View>
                </Pressable>
              )
            })}
          </View>}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    gap: 10,
    marginLeft: RECIPE_ITEM_MARGIN,
    marginRight: RECIPE_ITEM_MARGIN,
    marginBottom: 10,
    width: (SCREEN_WIDTH - (recipeNumColums + 10) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 1.5,
    borderRadius: 10,

  },
  photo: {
    width: "100%",
    marginTop: 0,
    height: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  overlay: {
    flex: 1,
    alignItems : 'center'
},
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#444444',
    marginRight: 5,
    marginLeft: 10,
  },
  fixToText: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#F4F1F1",
  },
  buttonCategory: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  textHeaders: {
    fontSize: 20,
    justifyContent: "center",
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginLeft: 20,
  },
  descriptions: {
    fontSize: 11,
    justifyContent: "center",
    fontWeight: "light",
    color: "black",
    marginLeft: 10,
    marginRight: 10,
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "light",
    letterSpacing: 0.25,
    color: "#98A8BA",
  },
  textTime: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "light",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
