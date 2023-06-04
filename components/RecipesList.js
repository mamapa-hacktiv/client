import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 3;

const data = [
    {
        name : "Nasi Goreng", 
    },
    {
        name : "Nasi Goreng", 
    },
    {
        name : "Nasi Goreng", 
    },
    {
        name : "Nasi Goreng", 
    },
]


export default function RecipesList() {
    return (
        <>
        <FlatList data={data} numColumns={2}
                renderItem={() => {
                    return <View style={styles.container}>
                    <Image style={styles.photo} source={{ uri: "https://media.istockphoto.com/id/526149515/photo/nasi-lemak-malaysian-cuisine.webp?b=1&s=170667a&w=0&k=20&c=tAOa6dWXSEOM3YZmKFtQJgeak-WKNdvcpfKF0FFbA1w=" }} />
                    <Text style={styles.title}>Nasi Goreng</Text>
                            </View>
                }}
        />
            {/* <View style={{ flexDirection: "row" }}>
                <View style={styles.container}>
                    <Image style={styles.photo} source={{ uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg" }} />
                    <Text style={styles.title}>Nasi Goreng</Text>
                </View>
                <View style={styles.container}>
                    <Image style={styles.photo} source={{ uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg" }} />
                    <Text style={styles.title}>Nasi Goreng</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
                <View style={styles.container}>
                    <Image style={styles.photo} source={{ uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg" }} />
                    <Text style={styles.title}>Nasi Goreng</Text>
                    
                </View>
                <View style={styles.container}>
                    <Image style={styles.photo} source={{ uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg" }} />
                    <Text style={styles.title}>Nasi Goreng</Text>
                    
                </View>
            </View> */}
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        marginLeft: RECIPE_ITEM_MARGIN,
        marginRight: RECIPE_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
        height: RECIPE_ITEM_HEIGHT + 50,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20
    },
    photo: {
        width: "100%",
        marginTop : 0,
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