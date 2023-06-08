import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCamera, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql, useReactiveVar, useQuery } from '@apollo/client';
import { recipeForm } from '../graphql/variable';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

const mutationUpload = gql`
  mutation Mutation($newRecipe: newRecipe) {
  createRecipe(newRecipe: $newRecipe) {
    message
  }
}
`;

const updateRecipe = gql`
mutation Mutation($newRecipe: newRecipe, $recipeId: ID) {
  updateRecipe(newRecipe: $newRecipe, recipeId: $recipeId) {
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
    createdAt
    updatedAt
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



const { width, height } = Dimensions.get('window')

export default function FormAddBahan({ route }) {
    const { loading: loadingRecipe, error: errorRecipe, data: dataRecipe, refetch: refetchRecipe } = useQuery(findRecipe, {
        variables: {
            findRecipeId: route?.params?.recipeId
        }
    });


    useEffect(() => {
        refetchRecipe()
    }, [route])




    const navigation = useNavigation();
    const [ingredients, setIngredients] = useState(dataRecipe ? dataRecipe.findRecipe?.Ingredients.map(el => {
        delete el.__typename
        return el
    }) : [{ "name": "" }])
    const [steps, setSteps] = useState(dataRecipe ? dataRecipe.findRecipe?.Steps.map(el => {
        delete el.__typename
        return el
    }) : [
        {
            "image": '',
            "instruction": ""
        }
    ]
    )

    const [uploadForm, { data, loading, error }] = useMutation(mutationUpload, {
        onError: (err) => {
            console.log(err, "error graph");
        },
        // refetchQueries: []
    });
    const [uploadEditForm, { data: dataEdit, loading: loadingEdit, error: errorEdit }] = useMutation(updateRecipe, {
        onError: (err) => {
            console.log(err, "error graph");
        }
    });

    const uploadRecipe = async () => {
        try {
            console.log(route?.params?.recipeId, 'ini ada nggak');
            if (route?.params?.recipeId) {
                console.log(recipeForm(), 'hasil edit');
                await uploadEditForm({
                    variables: {
                        "newRecipe": recipeForm(),
                        "recipeId": +route?.params?.recipeId
                    }
                })
            } else {
                await uploadForm({
                    variables: {
                        newRecipe: recipeForm()
                    }
                });
            }
            navigation.navigate('HomeTab')
        } catch (error) {
            console.log(error.errors, "<---------");
        }
    };

    function ingredientOnChangeHandle(index, value, key) {
        const newInputValues = [...ingredients];
        newInputValues[index][key] = value;
        if (key === 'name') {
            setIngredients(newInputValues);
        } else {
            setSteps(newInputValues)
        }
    }
    function stepOnChangeHandle(index, value, key) {
        const newInputValues = [...steps];
        newInputValues[index].instruction = value;
        setSteps(newInputValues)
    }

    const renderedIngredients = ingredients.map((value, index) => {
        return (
            <TextInput key={index} style={styles.input} placeholder={"2 butir telur"} value={value.name} onChangeText={(e) => ingredientOnChangeHandle(index, e, 'name')} />
        );
    });
    const renderedSteps = steps.map((value, index) => {
        return (
            <TextInput key={index} style={styles.input} multiline={true} placeholder="Potong Ayam jadi beberapa bagian12 bagian misalnya" value={value.instruction} onChangeText={(e) => stepOnChangeHandle(index, e, "instruction")} />
        );
    });

    // const pickImage = async () => {
    //     try {
    //       let data = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       });

    //       const result = data.assets[0];
    //       let localUri = result.uri;
    //       let filename = localUri.split('/').pop();
    //       let match = /\.(\w+)$/.exec(filename);
    //       let type = match ? `image/${match[1]}` : `image`;

    //       const file = new ReactNativeFile({
    //         uri: localUri,
    //         name: filename,
    //         type,
    //       });

    //       setForm({ ...form, image: [file] })

    //       if (!result.cancelled) {
    //         setImage(result);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };


    // console.log(loading, 'ini loading juga');

    // if (loading) return <ActivityIndicator size="large" />


    if (loadingRecipe || loadingEdit || loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={"#EF551D"} />
            </View>
        )
    }


    return (
        <ScrollView>
            <ImageBackground
                source={require('../assets/elipse1.png')}
                style={styles.imageBackground}
            >

                <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FFFFF", marginBottom: 20 }}>
                    <Text style={styles.textHeaders}>Bahan - Bahan</Text>
                    {renderedIngredients}
                    <TouchableOpacity onPress={() => {
                        setIngredients([...ingredients, { name: '' }])
                    }

                    }>
                        <Text style={styles.textplus} >+ Bahan</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHeaders}>Langkah - Langkah</Text>
                    {renderedSteps}
                    <TouchableOpacity onPress={() => {
                        setSteps([...steps, {
                            image: "null",
                            instruction: ""
                        }])
                    }
                    }>
                        <Text style={styles.textplus}>+ Langkah</Text>
                    </TouchableOpacity>
                    <Pressable style={styles.buttonn} onPress={() => {
                        recipeForm({ ...recipeForm(), ingredients, steps })
                        uploadRecipe()
                        console.log(recipeForm(), 'ini tolong');
                    }
                    }>
                        <Text style={styles.text}>{route?.params?.recipeId ? "Ubah Resep" : "Buat Resep"}</Text>
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
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: "#EDEDED",
        width: "80%",
        marginBottom: 10,
    },
    reactionContainer: {
        width: width - 30,
        padding: 20,
        margin: 15,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        gap: 5
    },
    submitReaction: {
        alignItems: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: "#EF551D",
    },
    textHeaders: {
        fontSize: 25,
        justifyContent: "center",
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 10
    },
    buttonn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        marginTop: 40,
        backgroundColor: "#EF551D",
        width: "80%"
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    textplus: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
    imageBackground: {
        width: "100%",
        height: '100%',
        zIndex: -1
    },
})