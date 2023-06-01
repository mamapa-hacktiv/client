import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Dimensions, Image } from "react-native";
import { Carousel } from "react-native-auto-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBowlFood, faCookieBite, faIceCream, faMagnifyingGlass, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';

const DEVICE_WIDTH = Dimensions.get("window").width;
const IMAGES = [
  "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg",
  "https://media.istockphoto.com/id/526149515/photo/nasi-lemak-malaysian-cuisine.webp?b=1&s=170667a&w=0&k=20&c=tAOa6dWXSEOM3YZmKFtQJgeak-WKNdvcpfKF0FFbA1w=",
  "https://media.istockphoto.com/id/1144681924/id/foto/nasi-padang-dengan-ayam-cabai-hijau-nasi-padang.jpg?s=170667a&w=0&k=20&c=-D3GVhmmDexjYSl6eWUdP3UgGcmKzb3j7dGLYyIGuP8=",
];

export default function HomePage() {
    const navigation = useNavigation();
    

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1.5, height: 250, zIndex : -1 }}>
          <Carousel
            data={IMAGES}
            renderItem={(item) => (
              <Image
              key={item}
              src={item}
              style={{
                  height: "auto",
                  width: DEVICE_WIDTH,
                  resizeMode: "cover",
                  position: "relative"
                }}
                />
                )}
          />
                <Image style={{ position: "absolute", marginTop: 189, width: "100%" }} source={require('../assets/vector1.png')}/>
        </View>
        <View style={{ flex: 3 }}>
          <View style={styles.fixToText}>
            <Pressable
              style={styles.button1}
              onPress={() => Alert.alert("Search page")}
            >
              <Text style={styles.text1}><FontAwesomeIcon icon={faMagnifyingGlass}  size={15} style={{color: "#ffffff",}} /> Search</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => Alert.alert("Chat gpt page")}
            >
              <Text style={styles.text}>Chat Gpt</Text>
            </Pressable>
          </View>

          <View style={styles.fixToText}>
            <Pressable
              style={styles.buttonCategory}
              onPress={() => navigation.navigate('RecipesList')}
            >
                <FontAwesomeIcon icon={faMugSaucer} size={30} style={{color: "#ffffff",}} />
              <Text style={styles.textCategory}>Breakfast</Text>
            </Pressable>
            <Pressable
              style={styles.buttonCategory}
              onPress={() => Alert.alert("Utama")}
            >
                <FontAwesomeIcon icon={faBowlFood} size={30} style={{color: "#ffffff",}} />
              <Text style={styles.textCategory}>Lunch</Text>
            </Pressable>
            <Pressable
              style={styles.buttonCategory}
              onPress={() => Alert.alert("Dessert")}
            >
                <FontAwesomeIcon icon={faIceCream} size={30} style={{color: "#ffffff",}} />
              <Text style={styles.textCategory}>Dessert</Text>
            </Pressable>
            <Pressable
              style={styles.buttonCategory}
              onPress={() => Alert.alert("Snack")}
            >
                <FontAwesomeIcon icon={faCookieBite} size={30} style={{color: "#ffffff",}} />
              <Text style={styles.textCategory}>Snack</Text>
            </Pressable>
          </View>
          
          <Text style={styles.textHeaders}>Resep Terbaru</Text>
          <View
            style={{
              flexWrap: "wrap",
              gap: 10,
              padding: 10,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1, borderRadius: 30, overflow: "hidden" }}>
                <TouchableOpacity onPress={() => Alert.alert("Card")}>
                  <Image
                    source={{
                      uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg",
                    }}
                    style={{ width: "auto", height: 140 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 15,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    {" "}
                    Nasi goreng
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    Nasi goreng adalah salah satu hidangan populer dalam masakan
                    Asia Tenggara, terutama di Indonesia, Malaysia, dan
                    Thailand. Hidangan ini terdiri dari nasi yang digoreng
                    bersama dengan berbagai bahan dan rempah-rempah, seperti
                    daging, sayuran, telur, dan bumbu khas.
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, borderRadius: 30, overflow: "hidden" }}>
                <TouchableOpacity onPress={() => Alert.alert("Card")}>
                  <Image
                    source={{
                      uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg",
                    }}
                    style={{ width: "auto", height: 140 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 15,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    {" "}
                    Nasi goreng
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    Nasi goreng adalah salah satu hidangan populer dalam masakan
                    Asia Tenggara, terutama di Indonesia, Malaysia, dan
                    Thailand. Hidangan ini terdiri dari nasi yang digoreng
                    bersama dengan berbagai bahan dan rempah-rempah, seperti
                    daging, sayuran, telur, dan bumbu khas.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1, borderRadius: 30, overflow: "hidden" }}>
                <TouchableOpacity onPress={() => Alert.alert("Card")}>
                  <Image
                    source={{
                      uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg",
                    }}
                    style={{ width: "auto", height: 140 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 15,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    {" "}
                    Nasi goreng
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    Nasi goreng adalah salah satu hidangan populer dalam masakan
                    Asia Tenggara, terutama di Indonesia, Malaysia, dan
                    Thailand. Hidangan ini terdiri dari nasi yang digoreng
                    bersama dengan berbagai bahan dan rempah-rempah, seperti
                    daging, sayuran, telur, dan bumbu khas.
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, borderRadius: 30, overflow: "hidden" }}>
                <TouchableOpacity onPress={() => Alert.alert("Card")}>
                  <Image
                    source={{
                      uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg",
                    }}
                    style={{ width: "auto", height: 140 }}
                  />
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 15,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                    }}
                  >
                    {" "}
                    Nasi goreng
                  </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    Nasi goreng adalah salah satu hidangan populer dalam masakan
                    Asia Tenggara, terutama di Indonesia, Malaysia, dan
                    Thailand. Hidangan ini terdiri dari nasi yang digoreng
                    bersama dengan berbagai bahan dan rempah-rempah, seperti
                    daging, sayuran, telur, dan bumbu khas.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fixToText: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-evenly",
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
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
  textCategory: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "light",
    letterSpacing: 0.25,
    color: "white",
  },
  textHeaders: {
    fontSize: 20,
    justifyContent: "center",
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginLeft: 20,
  },
  text1: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
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
