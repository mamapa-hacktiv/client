import { StyleSheet, Text, View, TextInput, Image, Button, Pressable, ScrollView, Platform, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons'
0
import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ReactNativeFile from "apollo-upload-client/public/ReactNativeFile.js";
import { useMutation, gql, useReactiveVar, useQuery } from '@apollo/client';
import { recipeForm } from '../graphql/variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const mutationUpload = gql`
  mutation Mutation($newRecipe: newRecipe) {
  createRecipe(newRecipe: $newRecipe) {
    message
  }
}
`;

const findRecipe = gql`
query FindRecipe($findRecipeId: ID!) {
  findRecipe(id: $findRecipeId) {
    id
    title
    image
    description
    videoUrl
    origin
    portion
    cookingTime
    UserId
    Steps {

      image
      instruction
    }
    Ingredients {

      name
    }
    createdAt
    updatedAt
  }
}
`;

export default function FormAdd({ route }) {
  const isfocused = useIsFocused()
  const { loading: loadingRecipe, error: errorRecipe, data: dataRecipe, refetch: refetchRecipe } = useQuery(findRecipe, {
    variables: {
      findRecipeId: route?.params?.recipeId
    }
  });
  if (route?.params?.recipeId) {
    refetchRecipe({
      findRecipeId: route?.params?.recipeId
    })
  }
  const [form, setForm] = useState({})


  useEffect(() => {
    refetchRecipe()
    if (route?.params?.recipeId ) {
      setForm({
        "title": dataRecipe ? dataRecipe.findRecipe?.title : "",
        "image":  [],
        "description": dataRecipe ? dataRecipe.findRecipe?.description : "",
        "videoUrl": dataRecipe ? dataRecipe.findRecipe?.videoUrl : "",
        "origin": dataRecipe ? dataRecipe.findRecipe?.origin : "",
        "portion": dataRecipe ? dataRecipe.findRecipe?.portion : '',
        "cookingTime": dataRecipe ? dataRecipe.findRecipe?.cookingTime : null,
        "ingredients": dataRecipe ? dataRecipe.findRecipe?.Ingredients.map(el => {
          delete el.__typename
          return el
        }) : [
          {
            "name": "null"
          }
        ],
        "steps": dataRecipe ? dataRecipe.findRecipe?.Steps.map(el => {
          delete el.__typename
          return el
        }) : [
          {
            "image": "null",
            "instruction": "null"
          }
        ],
      })
    } else {
      setForm({
        "title": "",
        "image": [],
        "description": "",
        "videoUrl": "",
        "origin": "",
        "portion": '',
        "cookingTime": null,
        "ingredients": [
          {
            "name": "null"
          }
        ],
        "steps": [
          {
            "image": "null",
            "instruction": "null"
          }
        ],
      })
    }

  }, [route, isfocused, dataRecipe])



  const [image, setImage] = useState(null);

  const [access_token, setAccessToken] = useState("");
  const navigation = useNavigation()


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then(value => {
        setAccessToken(value || "");
      })
      .catch(error => {
        console.error("Error retrieving access token:", error);
      });
  }, [isfocused]);




  const pickImage = async () => {
    try {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      const result = data.assets[0];
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const file = new ReactNativeFile({
        uri: localUri,
        name: filename,
        type,
      });

      setForm({ ...form, image: [file] })

      if (!result.cancelled) {
        setImage(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function onchange(value, key) {
    if (key === 'portion') {
      if (isNaN(value)) {
        setForm({ ...form, [key]: '' })
      } else {
        setForm({ ...form, [key]: +value })
      }
    } else {
      setForm({ ...form, [key]: value })
    }
  }

  const uploadImage = async () => {
    try {
      await uploadForm({
        variables: {
          newRecipe: form
        }
      });
    } catch (error) {
      console.log(error.errors, "<---------");
    }
  };


  if (loadingRecipe) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!access_token) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 300, height: 200 }} source={require('../assets/ilustratorlogin.png')}>
        </Image>
        <Text style={{ fontWeight: '200' }}> Maaf! kamu harus login ke akun kamu terlebih dahulu</Text>

        <Pressable
          style={{ ...styles.button, marginTop: 10 }}
          onPress={() => navigation.navigate('Profiles')}
        >
          <Text style={styles.text}><MaterialCommunityIcons name="login" color={"#ffffff"} size={15} />  Login</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/vectorOren.png')}
        style={{ ...styles.imageBackground, }}
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FFFFF" }}>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity onPress={pickImage}>
              {image ?
                <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 320, height: 200, borderRadius: 30, zIndex: -1, marginBottom: 10, backgroundColor: 'white' }}
                  />

                  <Text style={{ position: "absolute", color: "white", fontWeight: "bold", fontSize: 20, textAlign: 'center' }}><FontAwesomeIcon icon={faCamera} style={{ color: "white" }} size={18} />  UBAH FOTO</Text>
                </View>
                :
                <>
                  <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>

                    <Image
                      source={{ uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg" }}
                      style={{ width: 320, height: 200, borderRadius: 30, opacity: 0.5, zIndex: -1, marginBottom: 10, backgroundColor: 'white' }}
                    />

                    <Text style={{ position: "absolute", color: "white", fontWeight: "bold", fontSize: 20, textAlign: 'center' }}><FontAwesomeIcon icon={faCamera} style={{ color: "white" }} size={18} />  UPLOAD PHOTO</Text>
                  </View>
                </>
              }
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input} placeholder="Name Recipes" onChangeText={(e) => onchange(e, 'title')} value={form.title} />
          <TextInput style={styles.input} multiline={true} placeholder="Cerita di balik masakan ini, Apa atau siapa yang menginspirasimu? Apa yang membuatnya istimewa? Bagaimana caramu menikmatinya" onChangeText={(e) => onchange(e, 'description')} value={form.description} />
          <TextInput style={styles.input} placeholder="Daerah asal" onChangeText={(e) => onchange(e, 'origin')} value={form.origin} />
          <TextInput style={styles.input} placeholder="Porsi" onChangeText={(e) => onchange(e, 'portion')} value={form.portion + ""} />
          <TextInput style={styles.input} placeholder="Lama memasak" onChangeText={(e) => onchange(e, 'cookingTime')} value={form.cookingTime} />
          <TextInput style={styles.input} placeholder="Video URL" onChangeText={(e) => onchange(e, 'videoUrl')} value={form.videoUrl} />
          <Pressable style={{ ...styles.buttonn, }} onPress={() => {
            navigation.navigate('Tambahkan Bahan dan Langkah', { recipeId: route?.params?.recipeId })
            recipeForm({ ...recipeForm(), ...form })
          }}>
            <Text style={styles.text}>Bahan & Langkah <FontAwesomeIcon icon={faArrowRight} style={{ color: "#ffffff", }} /></Text>
          </Pressable>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "gray",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#EDEDED",
    width: "80%",
    marginBottom: 10,
  },
  buttonn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#EF551D",
    width: "80%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  imageBackground: {
    width: "100%",
    height: '85%',
    zIndex: -1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
})