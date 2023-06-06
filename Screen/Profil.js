import { StyleSheet, Text, View, Dimensions, ScrollView, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFile, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from './LoginForm'
import { gql, useQuery } from '@apollo/client';



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



export default function Profil() {
    const [access_token, setAccessToken] = useState("");
    const isfocused = useIsFocused()
    const navigation = useNavigation();
    const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(GetUser);
    const { loading, error, data, refetch: refetchData } = useQuery(FindMyRecipes);

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
    }, [access_token]);


    if (access_token) {
        return (
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

                            {data ? <FlatList data={data.findMyRecipes} numColumns={2}
                                renderItem={({ item }) => {
                                    return <View style={styles.cardContainer}>
                                        <Image style={styles.photo} source={{ uri: item.image }} />
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                }}
                            /> : <></>}

                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
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
        height: height - 130,
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
        padding: 15,
        borderColor: '#cccccc',
        alignItems: 'center'
    },
    photo: {
        width: "100%",
        marginTop: 0,
        height: 100,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        resizeMode: 'center',
        borderRadius: 15
    },


})