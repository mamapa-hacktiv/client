import { Dimensions, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView , ActivityIndicator, Pressable} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircleRight, faClock } from "@fortawesome/free-regular-svg-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { gql, useQuery } from '@apollo/client';
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const { width, height } = Dimensions.get('window')

const labels = [
  'Rebus',
  'Masak',
  'Bumbuin',
  'Beri perasa',
  'Sajikan',
  'Sajikan',
]


const FindRecipe = gql`
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
    Reactions {
      id
      emoji
      quantity
      RecipeId
      UserId
      createdAt
      updatedAt
    }
    Steps {
      id
      instruction
      image
      RecipeId
      createdAt
      updatedAt
    }
    Comments {
      id
      message
      RecipeId
      UserId
      User {
        id
        username
        email
        password
        phoneNumber
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    Ingredients {
      id
      name
      RecipeId
      createdAt
      updatedAt
    }
    User {
      id
      username
      email
      password
      phoneNumber
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
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


const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ff3232',
  separatorFinishedColor: '#ff3232',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#ff3232',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ff3232',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#ff3232',
};

export default function DetailPage({ route }) {
  const [isfavorit, setIsFavorit] = useState(false)
  const isfocused = useIsFocused()
  const [access_token, setAccessToken] = useState("");
  const navigation = useNavigation();


  const { loading, error, data: detailvalue, refetch } = useQuery(FindRecipe, {
    variables: {
      findRecipeId: route.params.id
    }
  });
  const { loading: loadingFavorite, error: errorFavorite, data: dataFavorite, refetch: refetchFavorite } = useQuery(FindFavorite);
  const [deleteFavorites, { data: dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(deleteFavorite, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  })
  const [createFavorites, { data: dataCreate, loading: loadingCreate, error: errorCreate }] = useMutation(CreateFavorite, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  })
  useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then(value => {
        setAccessToken(value || "");
      })
      .catch(error => {
        console.error("Error retrieving access token:", error);
      });
    refetchFavorite()
  }, [dataDelete, dataCreate])


  const [currentPosition, setCurrentPosition] = useState(0)

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1)
  }

  const previouseStep = () => {
    setCurrentPosition(currentPosition - 1)
  }
  const value = [
    {
      label: 'Step 1',
      status: 'Cuci beras hingga bersih lalu tiriskan'
    },
    {
      label: 'Step 2',
      status: 'Masukkan semua bahan-bahan ke dalam panci'
    },
    {
      label: 'Step 3',
      status: 'Masak di atas api sedang hingga air habis dan aduk-aduk sesekali agar tidak lengket'
    },
    {
      label: 'Step 4',
      status: 'Pindahkan ke dalam dandang yang sudah dipanaskan. Kukus hingga matang'
    },
    {
      label: 'Step 5',
      status: 'Sajikan nasi uduk bersama irisan telur dadar, tempe orek, bakwan, bihun goreng dan beri taburan bawang goreng'
    }
  ]


  function videoUrlValue(url) {
    const regex = /[?&]v=([^&#]*)/;
    const match = regex.exec(url);
    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }

  function favorite(id) {
    if (dataFavorite.findFavorite.find(({ RecipeId }) => RecipeId == id)) {
      return <FontAwesomeIcon icon={faHeart} beat size={35} color={'#EB5757'} />
    } else {
      return <FontAwesomeIcon icon={faHeart} beat size={35} color={'gray'} />
    }
  }

  console.log(detailvalue?.findRecipe?.Steps?.length);
  if (detailvalue) {
    return (
      <>
        <ScrollView>
          <View>
            <YoutubePlayer
              height={210}
              play={false}
              videoId={videoUrlValue(detailvalue.findRecipe.videoUrl)}
            />
          </View>
          <View style={{ marginLeft: 20, margin: 14, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold", color: '#5B5B5B', textTransform: 'capitalize' }} >{detailvalue.findRecipe.title}</Text>
              <Text style={{ textAlign: 'left', fontSize: 15, fontWeight: "bold", color: '#5B5B5B' }} >by {detailvalue.findRecipe.User.username}</Text>
              <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: "bold", color: '#5B5B5B' }} ><FontAwesomeIcon icon={faClock} color="#5B5B5B" size={10}>   </FontAwesomeIcon> {detailvalue.findRecipe.cookingTime}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', padding: 20 }}>
              <Pressable onPress={() => {
                const result = dataFavorite.findFavorite.find(({ RecipeId }) => RecipeId == detailvalue.findRecipe.id)
                if (result) {
                  deleteFavorites({
                    variables: {
                      favoriteId: result.id
                    }
                  })
                  refetchFavorite()
                } else {
                  createFavorites({
                    variables: {
                      recipeId: detailvalue.findRecipe.id
                    }
                  })
                  refetchFavorite()
                }
              }}>
                {dataFavorite && dataFavorite.findFavorite !== null ? favorite(detailvalue.findRecipe.id) : <FontAwesomeIcon icon={faHeart} beat size={35} color={'gray'} />}
              </Pressable>
            </View>
          </View>
          <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold", marginBottom: 5, marginLeft: 20 }} >Bahan - bahan</Text>
          <View style={styles.ingridientsContainer}>
            <View style={{ padding: 20 }}>
              {detailvalue.findRecipe.Ingredients.map((item, index) => {
                return (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 14 }}>{`\u2022 ${item.name}`}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Button
            title="Coba Chat"
            onPress={() => {
              navigation.navigate('Chat', { id: detailvalue?.findRecipe?.UserId })
            }}
          />
          <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold", marginBottom: 5, marginLeft: 20 }} >Langkah - langkah</Text>
          <View style={styles.indicatorContainer}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={detailvalue?.findRecipe?.Steps.map(el => el.instruction)}
              stepCount={detailvalue?.findRecipe?.Steps?.length}
              direction="vertical"
              renderLabel={({ position, stepStaus, label, crntPosition }) => {
                return (
                  <>
                    <View style={styles.lblcontainer}>
                      <Text style={styles.lbltext}>Steps {position + 1}</Text>
                      <Text style={[styles.status, { marginTop: 5 }]}> {detailvalue?.findRecipe?.Steps[position]?.instruction}</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-start' }}>
                      {detailvalue?.findRecipe?.Steps?.length - 1 !== position ?
                        <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
                          <Text style={styles.text}>Next <FontAwesomeIcon icon={faCircleRight} color="#EF551D" size={15}></FontAwesomeIcon></Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
                          <Text style={styles.text}>Finish <FontAwesomeIcon icon={faCheck} color="#EF551D" size={15}></FontAwesomeIcon></Text>
                        </TouchableOpacity>
                      }
                    </View>
                    </>
                  )
                }}
              />
             
            </View>
            <View style={styles.reactionContainer}>
            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold"}} >Komentar</Text>
            <View style={{flexDirection : 'row' , marginTop : 5 }}>
            <View>
              <FontAwesomeIcon icon={faUser} size={49} color="#5B5B5B">  </FontAwesomeIcon>
            </View>
            <View>
            <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: "bold", color: '#5B5B5B', textTransform: 'capitalize'}} >Fachri Hawari</Text>
            <Text style={{ textAlign: 'left', fontSize: 7, fontWeight: "light", marginTop : 2}} > 6 hari yang lalu</Text>
            <Text style={{ textAlign: 'left', fontSize: 12, fontWeight: "light", marginTop : 2}} > Itu Step nya kurang foto ya!</Text>
            </View>
      
            </View>
            <Image  style={{ width: "100%" }} source={require('../assets/vectorline.png')}></Image>
            <View style={{flexDirection : 'row' , marginTop : 5}}>
            <View>
              <FontAwesomeIcon icon={faUser} size={49} color="#5B5B5B">  </FontAwesomeIcon>
            </View>
            <View>
            <Text style={{ textAlign: 'left', fontSize: 15, fontWeight: "bold", color: '#5B5B5B', textTransform: 'capitalize'}} > Harry Dimas</Text>
            <Text style={{ textAlign: 'left', fontSize: 7, fontWeight: "light", marginTop : 2}} > 6 hari yang lalu</Text>
            <Text style={{ textAlign: 'left', fontSize: 12, fontWeight: "light" , marginTop : 2}} > Style nya bisa di bagusin lagi ya bang</Text>
            </View>
            </View>
            <View style={{flexDirection: 'row', gap :7, marginTop: 10}} >
              <TextInput style={styles.input} placeholder="keren" />
              <TouchableOpacity style={styles.submitReaction} onPress={() => nextStep()}>
                <Text style={styles.text1}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </>
    )

  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: "gray",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    width: "65%",
    height: 40,
    backgroundColor: "#EDEDED",
  },
  hr: {
    borderWidth: 10,
    borderColor: 'rgba(219, 219, 219, 0.2)',
    marginVertical: 8
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  ingredientsName: {
    fontSize: 13,
    color: '#000'
  },
  indicatorContainer: {
    width: width - 30,
    padding: 20,
    paddingTop: 0,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  ingridientsContainer: {
    width: width - 30,
    padding: 20,
    paddingTop: 10,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  reactionContainer: {
    width: width - 30,
    padding: 20,
    margin: 15,

    
    gap: 5
  },
  lblcontainer: {
    marginTop: 40,
    padding: 10,
    paddingLeft: 5,
    width: width - 100
  },
  lbltext: {
    fontSize: 17,
    color: '#EF551D',
    fontWeight: 'bold',
  },
  nextBtn: {
    alignItems: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "white",
  },
  submitReaction: {
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 10,
    height: 41,
    backgroundColor: "#EF551D",
  },
  previousBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  text: {
    color: "#EF551D",
    fontSize: 18
  },
  status: {
    fontSize: 15,
    color: 'gray'
  },
  text1: {
    color: "white",
    fontSize: 15
  }
})