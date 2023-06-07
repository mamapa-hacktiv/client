import { StyleSheet, Text, View, Dimensions, ScrollView, ImageBackground, Image, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFile, faSignOut, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from './LoginForm'
import { gql, useQuery, useMutation } from '@apollo/client';



const { width, height } = Dimensions.get('window')

const GetUser = gql`
query GetUser {
  getUser {
    email
    id
    username
    phoneNumber
  }
}
`;
const FindMyRecipes = gql`
query FindMyRecipes {
  findMyRecipes {
    id
    image
    title
  }
}
`;
const deleteRecipe = gql`
mutation DeleteRecipe($recipeId: ID) {
  deleteRecipe(recipeId: $recipeId) {
    message
  }
}
`;



export default function Profil() {
    const [access_token, setAccessToken] = useState("");
    const isfocused = useIsFocused()
    const navigation = useNavigation();
    const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(GetUser);
    const { loading, error, data, refetch: refetchData } = useQuery(FindMyRecipes);
    const [deleteRecipeToggle, { data: dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(deleteRecipe, {
        onError: (err) => {
            console.log(err, "error graph");
        }
    });
    console.log(data);
    useEffect(() => {
        AsyncStorage.getItem("access_token")
            .then(value => {
                setAccessToken(value || "");
            })
            .catch(error => {
                console.error("Error retrieving access token:", error);
            });

    }, [isfocused]);

    useEffect(() => {
        refetchUser()
        refetchData()
    }, [access_token, dataDelete]);


    if (access_token) {
        return (
            <ScrollView>
                <SafeAreaView>
                    <ImageBackground
                        source={require('../assets/vectorOren.png')}
                        style={styles.imageBackground}
                        imageStyle={styles.image}
                    >
                        <View style={styles.container}>
                            <Text style={styles.header}>Profil</Text>
                            <View style={styles.profilContainer}>
                                {dataUser && <View style={styles.user}>
                                    <Text style={styles.name}>{dataUser.getUser ? dataUser.getUser.username : ''}</Text>
                                    <Text style={styles.email}>{dataUser.getUser ? dataUser.getUser.email : ''}</Text>
                                    <Text style={styles.email}>{dataUser.getUser ? dataUser.getUser.phoneNumber : ''}</Text>
                                </View>}
                                <View style={{ ...styles.SignOut }}>
                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={async () => {
                                        try {
                                            await AsyncStorage.removeItem("access_token");
                                            navigation.navigate('HomeTab')
                                        } catch (error) {
                                            console.error(`Error removing access_token from AsyncStorage:`, error);
                                        }
                                    }}>
                                        <FontAwesomeIcon icon={faSignOut} color='#EF551D' size={20}> </FontAwesomeIcon>
                                        <Text style={styles.textIcon}>  Sign Out </Text>
                                    </TouchableOpacity>
                                </View>
                                <Image style={{ width: '100%' }} source={require('../assets/vectorline.png')}></Image>
                                <View style={styles.SignOut}>
                                    <FontAwesomeIcon icon={faFile} color='#EF551D' size={20}> </FontAwesomeIcon>
                                    <Text style={styles.textIcon}>  Resep Saya </Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    {data ? data.findMyRecipes.map(item => {
                                        return (
                                            <View key={item.id} >
                                                <Pressable onPress={() => navigation.navigate('Detail', { id: item.id })}>
                                                    <View style={{ height: 100, width: 290, marginBottom: 5, backgroundColor: 'white', elevation: 3, borderRadius: 15, borderColor: '#CACECF', borderWidth: 1, flexDirection: 'row', padding: 10, gap: 15 }}>
                                                        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image
                                                                source={{
                                                                    uri: item.image,
                                                                }}
                                                                style={{ height: 80, width: 100, borderRadius: 15 }}
                                                            />
                                                        </View>
                                                        <View style={{ flex: 2 }}>
                                                            <Text style={{ fontSize: 15, fontWeight: 600, textTransform: 'capitalize' }}>{item.title}</Text>
                                                            <View style={styles.fixToText}>
                                                                <Pressable
                                                                    style={styles.button1}
                                                                    onPress={() => navigation.navigate('Tambahkan resep makanan mu', { recipeId: item.id })}
                                                                >
                                                                    <Text style={styles.text}> Edit</Text>
                                                                </Pressable>
                                                                <Pressable
                                                                    style={styles.button}
                                                                    onPress={() => {
                                                                        deleteRecipeToggle({
                                                                            variables: {
                                                                                recipeId: item.id
                                                                            }
                                                                        })

                                                                    }}
                                                                >
                                                                    <Text style={styles.text}>Delete</Text>
                                                                </Pressable>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        )
                                    }) : <></>}
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </SafeAreaView>
            </ScrollView>
        )
    } else {
        return <LoginForm />
    }


}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
        color: 'white'
    },
    profilContainer: {
        width: width - 30,
        padding: 20,
        paddingTop: 0,
        margin: 15,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textIcon: {
        fontWeight: '500',
        fontSize: 15,
    },
    user: {
        padding: 20
    },
    email: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'gray'
    },
    imageBackground: {
        width: "100%",
        height: '85%',
        zIndex: -1
    },
    SignOut: {
        padding: 20,
        flexDirection: 'row'
    },
    cardContainer: {
        overflow: "hidden",
        marginBottom: 20,
        borderColor: '#cccccc',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        borderRadius: 20,
        width: 135,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    photo: {
        width: "100%",
        marginTop: 0,
        height: 70,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderRadius: 15
    },
    fixToText: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button1: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#0284c7",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        backgroundColor: "red",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
})