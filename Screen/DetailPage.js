import { Dimensions, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Pressable, Image, Button } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleRight, faClock } from "@fortawesome/free-regular-svg-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { gql, useQuery, useMutation } from '@apollo/client';
import { faCheck, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Circle, G, Text as TextSvg, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window')

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
const getUser = gql`
query GetUser {
  getUser {
    id
    username
    email
    phoneNumber
  }
}
`;
const deleteComment = gql`
mutation DeleteComment($commentId: ID) {
  deleteComment(commentId: $commentId) {
    message
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
const createComment = gql`
mutation CreateComment($message: String, $recipeId: ID) {
  createComment(message: $message, recipeId: $recipeId) {
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
  const [comment, setComment] = useState('')
  const isfocused = useIsFocused()
  const [access_token, setAccessToken] = useState("");
  const navigation = useNavigation();
  const { loading, error, data: detailvalue, refetch } = useQuery(FindRecipe, {
    variables: {
      findRecipeId: route.params.id
    }
  });

  const { loading: loadingFavorite, error: errorFavorite, data: dataFavorite, refetch: refetchFavorite } = useQuery(FindFavorite);
  const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(getUser);
  console.log(dataUser);
  const [deleteFavorites, { data: dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(deleteFavorite, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  })
  const [uploadComment, { data: dataComment, loading: loadingComment, error: errorComment }] = useMutation(createComment, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  })
  const [deleteCommentHandle, { data: dataDelComment, loading: loadingDelComment, error: errorDelComment }] = useMutation(deleteComment, {
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

  useEffect(() => {
    refetch()
  }, [dataComment, dataDelComment])


  const [currentPosition, setCurrentPosition] = useState(0)

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1)
  }



  function convertTime(diff) {
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} hari yang lalu`;
    } else if (hours > 0) {
      return `${hours} jam yang lalu`;
    } else if (minutes > 0) {
      return `${minutes} menit yang lalu`;
    } else {
      return `${seconds} detik yang lalu`;
    }
  }

  function dateConvertion(date) {
    // Mendapatkan tanggal sekarang
    const now = new Date();


    // Mendapatkan tanggal createdAt dari Sequelize (asumsi telah di-parse menjadi objek Date)
    const createdAt = new Date(+date);


    // Menghitung selisih waktu antara createdAt dan sekarang dalam milidetik
    const diff = now - createdAt;


    // Fungsi untuk mengonversi selisih waktu menjadi string yang diinginkan

    // Mengonversi selisih waktu menjadi string
    const convertedTime = convertTime(diff);
    return convertedTime
  }


  // Function to generate SVG for a given name
  function generateNameSVG(name) {
    // Extract the first letter of the name
    const firstLetter = name.charAt(0).toUpperCase()
    let secondLetter = ""
    if (name.split(' ')[1]) {
      secondLetter = name.split(' ')[1].charAt(0).toUpperCase()
    }

    // Generate a random color for the circle background
    const circleColor = "gray";

    return (
      <Svg width={55} height={55}>
        <G>
          <Circle cx={29} cy={29} r={25} fill={circleColor} />
          <TextSvg
            x={30}
            y={32}
            textAnchor="middle"
            fontSize={25}
            fontFamily="Arial"
            fill="white"
            alignmentBaseline="middle"
          >
            {firstLetter + (secondLetter ? secondLetter : '')}
          </TextSvg>
        </G>
      </Svg>
    );
  }


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

  if (detailvalue) {
    return (
      <>
        <ScrollView>
          <View>
            {/* <YoutubePlayer
              height={210}
              play={false}
              videoId={videoUrlValue(detailvalue.findRecipe.videoUrl)}
            /> */}
            <Image
              style={{ width: 400, height: 400 }}
              source={{
                uri: detailvalue?.findRecipe?.image,
              }}
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
          <Pressable style={styles.chatUser} onPress={() => {
            // console.log(detailvalue.findRecipe.UserId);
            navigation.navigate("Chat", { id: detailvalue?.findRecipe?.UserId, name: detailvalue?.findRecipe?.User.username });
          }}>
            <Text style={styles.text1}> Tanya Chef</Text>
          </Pressable>
          <View style={styles.reactionContainer}>
            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold" }} >Komentar</Text>

            {detailvalue?.findRecipe?.Comments?.map((el, index) => {
              return (
                <View key={index}>
                  <Image style={{ width: "100%", marginTop: 10 }} source={require('../assets/vectorline.png')}></Image>
                  <View style={{ flexDirection: 'row', marginTop: 5, gap: 10, justifyContent: 'space-between' }} >
                    <View style={{}}>
                      <View style={{ alignItems: 'center' }}>{generateNameSVG(el.User.username)}</View>
                      {/* <Text style={{ textAlign: 'center' }}>asdfasd</Text> */}
                    </View>
                    <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                      <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: "bold", color: '#5B5B5B', textTransform: 'capitalize' }} >{el.User.username}</Text>
                      <Text style={{ textAlign: 'left', fontSize: 9, fontWeight: "light", marginTop: 2 }} >{dateConvertion(el.createdAt)}</Text>
                      <Text style={{ textAlign: 'left', fontSize: 12, fontWeight: "light", marginTop: 2 }} >{el.message}</Text>
                    </View>
                    {dataUser?.getUser?.id === el?.User?.id ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'stretch' }} onPress={() => {
                      deleteCommentHandle({
                        variables: {
                          "commentId": el.id,
                        }
                      })
                    }}>
                      <FontAwesomeIcon icon={faTrashCan} color="#EF551D" size={15}>
                      </FontAwesomeIcon>

                    </TouchableOpacity> : <View></View>}

                  </View>
                </View>
              )
            })}
            <Image style={{ width: "100%" }} source={require('../assets/vectorline.png')}></Image>
            <View style={{ flexDirection: 'row', gap: 7, paddingTop: 10 }} >
              <TextInput style={styles.input} placeholder="Tulis Tanggapanmu" value={comment} onChangeText={(e) => {
                setComment(e)
              }} />
              <TouchableOpacity style={styles.submitReaction} onPress={() => {
                console.log(detailvalue?.findRecipe?.id, comment, 'ini mana');
                uploadComment({
                  variables: {
                    "recipeId": +detailvalue?.findRecipe?.id,
                    "message": comment
                  }
                }
                )
                setComment('')
              }}>
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
        <ActivityIndicator size="large" color={"#EF551D"} />
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
    width: "70%",
    height: 40,
    backgroundColor: "white",
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
    fontSize: 15,
    textAlign: 'center'
  },
  chatUser: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
    width: "70%",
    borderRadius: 4,
    elevation: 10,
    height: 50,
    backgroundColor: "#EF551D",
  }
})