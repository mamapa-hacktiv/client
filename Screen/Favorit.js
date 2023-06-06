import { StyleSheet, Text, View, Dimensions, Image, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import { access_token } from '../graphql/variable';

const findFavorite = gql`
query FindFavorite {
  findFavorite {
    id
    RecipeId
    UserId
    Recipe {
      id
      title
      image
    }
  }
}
`;

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 3;


export default function Favorit() {
    const isfocused = useIsFocused()
    const [access_token, setAccessToken] = useState("");
    const navigation = useNavigation()
    const { loading, error, data, refetch } = useQuery(findFavorite);

    useEffect(() => {
        AsyncStorage.getItem("access_token")
            .then(value => {
                setAccessToken(value || "");
            })
            .catch(error => {
                console.error("Error retrieving access token:", error);
            });
        refetch()
    }, [isfocused]);

    if (!access_token) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Image style={{ width : 300, height :200, }} source={require('../assets/ilustratorlogin.png')}>
             </Image>
                <Text style={{ fontWeight: '200'}}> Maaf! kamu harus login ke akun kamu terlebih dahulu</Text>

                <Pressable
                    style={{ ...styles.button, marginTop: 10 }}
                    onPress={() => navigation.navigate('Profiles')}
                >
                    <Text style={styles.text}><MaterialCommunityIcons name="login" color={"#ffffff"} size={15} />  Login</Text>
                </Pressable>
            </View>
        )
    }


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    if (data.findFavorite) {
        if (data.findFavorite.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>belum ada nih datanya</Text>
                </View>
            )

        } else {
            return (
                <>
                    <View>
                        {data.findFavorite ? <FlatList data={data.findFavorite} numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable style={styles.container} key={item.Recipe.id} onPress={() => navigation.navigate('Detail', { id: item.Recipe.id })} >

                                        <Image style={styles.photo} source={{ uri: item.Recipe.image }} />
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.title}>{item.Recipe.title}</Text>
                                        </View>

                                    </Pressable>
                                )
                            }}
                        /> : <></>}

                    </View>
                </>
            )
        }
    } else {
        return <></>
    }


}


const styles = StyleSheet.create({
    container: {
        marginLeft: RECIPE_ITEM_MARGIN,
        marginRight: RECIPE_ITEM_MARGIN,
        overflow: "hidden",
        flex: 1,
        marginTop: 20,
        height: RECIPE_ITEM_HEIGHT + 50,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5
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
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical:7 ,
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