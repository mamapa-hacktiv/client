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
    UserId
    description
    title
    image
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
        <View style={{ flex: 2, height: 300}}>
          <Carousel
            data={IMAGES}
            renderItem={(item, index) => (
              <View
                key={index}
                style={{
                  height: 250, position: 'relative',
                  width: DEVICE_WIDTH,
                  
                }}
                colors={['green', 'red']}>
                <View style={{ position: 'absolute', zIndex: 3, bottom: 20, marginLeft: 20, }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white',elevation : 100 }} >{item.title}</Text>
                  <Text style={styles.textTime} ><FontAwesomeIcon icon={faClock} color={"white"}></FontAwesomeIcon> {item.cookingTime}</Text>
                </View>
                <Image
                  src={item.imageUrl}
                  style={{
                    height: 310,
                    width: DEVICE_WIDTH,
                    resizeMode: "cover",
                    position: "relative"
                  }}
                />
              </View>
            )}
          />
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
              <Text style={styles.text}><MaterialCommunityIcons name="robot-happy" color={"#ffffff"} size={21} /> Ask Me!</Text>
            </Pressable>
          </View>

          <Text style={styles.textHeaders}>Resep Terbaru</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
            {data.findRecipes.map((el, index) => {
              return (
                <Pressable key={index} onPress={() => navigation.navigate('DetailPage', { id: el.id })}>

                  <View style={styles.container}>
                    
                    <Image style={styles.photo} source={{ uri: el.image }} />
                    <Text style={styles.title}>{el.title}</Text>
                    <Text style={styles.descriptions}>{el.description}</Text>
                  </View>
                </Pressable>
              )
            })}
          </View>

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
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 10) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 50,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  photo: {
    width: "100%",
    marginTop: 0,
    height: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    justifyContent: "center",
    justifyContent: "space-evenly",
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 32,
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
    marginTop: 10,
    marginLeft: 20,
  },
  descriptions: {
    fontSize: 11,
    justifyContent: "center",
    fontWeight: "light",
    color: "black",
    marginLeft: 10,
    marginRight: 10
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
    paddingVertical: 6,
    paddingHorizontal: 32,
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
