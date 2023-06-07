import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, Image } from "react-native";
import { Carousel } from "react-native-auto-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const FindFavorite = gql`
query FindFavorite {
  findFavorite {
    id
    RecipeId
    UserId
  }
}
`;
const deleteFavorite = gql`
mutation DeleteFavorite($favoriteId: ID) {
  deleteFavorite(favoriteId: $favoriteId) {
    message
  }
}
`;
const CreateFavorite = gql`
mutation CreateFavorite($recipeId: ID) {
  createFavorite(recipeId: $recipeId) {
    message
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
  const isfocused = useIsFocused()

  const [isfavorit, setIsFavorit] = useState(false)
  const [access_token, setAccessToken] = useState("");
  const navigation = useNavigation();
  const { loading, error, data, refetch } = useQuery(fetchRecipe);
  const { loading: loadingFavorite, error: errorFavorite, data: dataFavorite, refetch: refetchFavorite } = useQuery(FindFavorite);

  const [deleteFavorites, { data: dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(deleteFavorite, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  });
  const [createFavorites, { data: dataCreate, loading: loadingCreate, error: errorCreate }] = useMutation(CreateFavorite, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("access_token")
        .then(value => {
          setAccessToken(value || "");
        })
        .catch(error => {
          console.error("Error retrieving access token:", error);
        });
      refetch()
      refetchFavorite()
    }, [dataDelete, dataCreate, access_token])
  );

  const createTwoButtonAlert = () =>
    Alert.alert('Belum Login', 'Kamu harus login untuk menambahkan favorit resepmu', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'LOGIN', onPress: () => navigation.navigate('Profiles')},
    ]);
  // useEffect(() => {
  //   AsyncStorage.getItem("access_token")
  //     .then(value => {
  //       setAccessToken(value || "");
  //     })
  //     .catch(error => {
  //       console.error("Error retrieving access token:", error);
  //     });
  //   refetch()
  //   refetchFavorite()
  // }, [isfocused, dataDelete, dataCreate]);

  function limitStringTo20Words(inputString) {
    var words = inputString.split(" ");
    var numWords = words.length;

    if (numWords <= 19) {
      return inputString;
    }

    var truncatedWords = words.slice(0, 19);
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

  const showToastWithGravity = () => {
    ToastAndroid.show(
      'Kamu harus login dulu untuk menggunakan fitur favorit ini!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  };

  function favorite(id) {
    if (dataFavorite.findFavorite.find(({ RecipeId }) => RecipeId == id)) {

      return (
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 6 }}>
          <FontAwesomeIcon icon={faHeart} beat size={25} color={'#EB5757'} />
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 6 }}>
          <FontAwesomeIcon icon={faHeart} beat size={25} color={'gray'} />
        </View>
      )
    }
  }
  console.log(dataFavorite);
  if (loading || loadingFavorite) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {
          data ?
            <>
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
                          <LinearGradient style={{ position: 'absolute', height: 310, width: DEVICE_WIDTH, top: 0, left: 0 }} colors={['transparent', 'rgba(0,0,0,0.8)']} />
                          <Image
                            src={item.image}
                            style={{
                              height: 310,
                              width: DEVICE_WIDTH,
                              resizeMode: "cover",
                              position: "relative",
                              zIndex: -1
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
                    <Text style={styles.text1}><FontAwesomeIcon icon={faMagnifyingGlass} beat size={13} style={{ color: "#98A8BA", }} /> Cari Resep</Text>
                  </Pressable>
                  <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('Chat with AI')}
                  >
                    <Text style={styles.text}><MaterialCommunityIcons name="robot-happy" color={"#ffffff"} size={21} /> Tanya Saya!</Text>
                  </Pressable>
                </View>

                <Text style={styles.textHeaders}>Resep Terbaru</Text>


                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: 10 }} >
                  {data?.findRecipes?.map((el, index) => {
                    return (
                      <View key={index} style={{ position: 'relative' }}>
                        <Pressable style={styles.container} onPress={() => navigation.navigate('Detail', { id: el.id })} >
                          <View>
                            <Image style={styles.photo} source={{ uri: el.image }} />
                          </View>
                          <Text style={styles.title}>{el.title}</Text>
                          <Text style={styles.descriptions}>{el.description ? limitStringTo20Words(el.description) : el.description}</Text>
                        </Pressable>
                        <Pressable style={{ zIndex: 1, position: 'absolute', right: 5, padding: 10, top: 0 }} onPress={() => {
                          if (access_token) {
                            const result = dataFavorite.findFavorite.find(({ RecipeId }) => RecipeId == el.id)
                            if (result) {
                              deleteFavorites({
                                variables: {
                                  favoriteId: result.id
                                }
                              })
                              refetchFavorite()
                              refetch()
                            } else {
                              createFavorites({
                                variables: {
                                  recipeId: el.id
                                }
                              })
                              refetchFavorite()
                              refetch()
                            }
                          } else {
                            createTwoButtonAlert()
                          }
                        }}>
                          {dataFavorite.findFavorite !== null ? favorite(el.id) : <FontAwesomeIcon icon={faHeart} beat size={25} color={'gray'} />}

                        </Pressable>
                      </View>
                    )
                  })}
                  {data.findRecipes.length % 2 !== 0 && <View style={{ position: 'relative' }}>
                    <View key={"index"} style={{
                      overflow: "hidden",
                      gap: 10,
                      marginLeft: RECIPE_ITEM_MARGIN,
                      marginRight: RECIPE_ITEM_MARGIN,
                      marginBottom: 10,
                      width: (SCREEN_WIDTH - (recipeNumColums + 10) * RECIPE_ITEM_MARGIN) / recipeNumColums,
                      height: RECIPE_ITEM_HEIGHT + 75,
                      borderColor: '#cccccc',

                      backgroundColor: 'white',

                    }} >

                    </View>
                  </View>}

                </View>

              </View>
            </>
            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" />
            </View>}
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
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5

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
    alignItems: 'center'
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
