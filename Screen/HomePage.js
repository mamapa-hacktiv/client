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
import { faBowlFood, faCookieBite, faIceCream, faMagnifyingGlass, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';

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
    imageUrl: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg",
    title: "Nasi Goreng",
    cookingTime: "20 menit"
  },
  {
    imageUrl: "https://media.istockphoto.com/id/526149515/photo/nasi-lemak-malaysian-cuisine.webp?b=1&s=170667a&w=0&k=20&c=tAOa6dWXSEOM3YZmKFtQJgeak-WKNdvcpfKF0FFbA1w=",
    title: "Nasi Padang",
    cookingTime: "20 menit"
  },
  {
    imageUrl: "https://media.istockphoto.com/id/1144681924/id/foto/nasi-padang-dengan-ayam-cabai-hijau-nasi-padang.jpg?s=170667a&w=0&k=20&c=-D3GVhmmDexjYSl6eWUdP3UgGcmKzb3j7dGLYyIGuP8=",
    title: "Nasi Uduk pagi pagi enak sekali",
    cookingTime: "20 menit"
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
        <View style={{ flex: 1.5, height: 250 }}>
          <Carousel
            data={IMAGES}
            renderItem={(item, index) => (

              <View
                key={index}
                style={{
                  height: 250, position: 'relative',
                  width: DEVICE_WIDTH
                }}
                colors={['green', 'red']}>
                <View style={{ position: 'absolute', zIndex: 3, bottom: 40, marginLeft: 10, }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }} >{item.title}</Text>
                  <Text style={styles.text1} >{item.cookingTime}</Text>
                </View>

                <Image
                  src={item.imageUrl}
                  style={{
                    height: 250,
                    width: DEVICE_WIDTH,
                    resizeMode: "cover",
                    position: "relative"
                  }}
                />
              </View>
            )}
          />
          <Image style={{ position: "absolute", marginTop: 180, width: "100%" }} source={require('../assets/vector12.png')} />
          <Image style={{ position: "absolute", width: "100%", left: 100, top: 90, resizeMode: 'center', height: "100%" }} source={require('../assets/vectorfood.png')} />
        </View>
        <View style={{ flex: 3, backgroundColor: 'white' }}>
          <View style={styles.fixToText}>
            <Pressable
              style={styles.button1}
              onPress={() => navigation.navigate('SearchPage')}
            >
              <Text style={styles.text1}><FontAwesomeIcon icon={faMagnifyingGlass} size={15} style={{ color: "#ffffff", }} /> Search</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Chat with AI')}
            >
              <Text style={styles.text}><MaterialCommunityIcons name="robot-happy" color={"#ffffff"} size={21} /> Chat Gpt</Text>
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
    height: RECIPE_ITEM_HEIGHT + 110,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  photo: {
    width: "100%",
    marginTop: 0,
    height: 150,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginRight: 5,
    marginLeft: 5,
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
    backgroundColor: "gray",
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
    fontSize: 13,
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
