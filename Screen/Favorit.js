import { StyleSheet, Text, View, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { access_token } from '../graphql/variable';

const fetchRecipe = gql`
query FindFavorite {
  findFavorite {
    Recipe {
      cookingTime
      UserId
      createdAt
      description
      id
      image
      origin
      portion
      updatedAt
      videoUrl
      title
    }
    UserId
    RecipeId
    createdAt
    updatedAt
    id
  }
}
`;

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 3;

let access_token = ""
AsyncStorage.getItem("access_token").then((value) => { access_token = value })

export default function Favorit() {
    const { loading, error, data } = useQuery(fetchRecipe);
    // if (!access_token) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>belum login, login dulu</Text>
    //         </View>
    //     )
    // }
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    if (data.findFavorite.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>hehh ngga ada ya, carik dulu sana!</Text>
            </View>
        )
    }
    return (
        <>
            <FlatList data={data.findFavorite} numColumns={2}
                renderItem={({ item }) => {
                    return <View style={styles.container}>
                        <Image style={styles.photo} source={{ uri: item.Recipe.image }} />
                        <Text style={styles.title}>{item.Recipe.title}</Text>
                    </View>
                }}
            />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        marginLeft: RECIPE_ITEM_MARGIN,
        marginRight: RECIPE_ITEM_MARGIN,
        overflow: "hidden",
        marginTop: 20,
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT + 50,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20
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
})