import { StyleSheet, Text, View, Image, Button, Pressable, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCamera, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';
import { useMutation, gql, useReactiveVar } from '@apollo/client';
import { recipeForm } from '../graphql/variable';
import { TouchableOpacity } from 'react-native';

const mutationUpload = gql`
  mutation Mutation($newRecipe: newRecipe) {
  createRecipe(newRecipe: $newRecipe) {
    message
  }
}
`;

const { width, height } = Dimensions.get('window')

export default function FormAddBahan() {
    const navigation = useNavigation();
    const [ingredients, setIngredients] = useState([{ "name": "" }])
    const [steps, setSteps] = useState(
        [
            {
                "image": '',
                "instruction": ""
            }
        ]
    )

    const [uploadForm, { data, loading, error }] = useMutation(mutationUpload, {
        onError: (err) => {
            console.log(err, "error graph");
        }
    });

    const uploadRecipe = async () => {
        try {
            console.log(recipeForm());
            await uploadForm({
                variables: {
                    newRecipe: recipeForm()
                }
            });
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
            <TextInput key={index} style={styles.input} placeholder={'bahan ' + (+index + 1)} value={value.name} onChangeText={(e) => ingredientOnChangeHandle(index, e, 'name')} />
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




    if (loading) return <ActivityIndicator size="large" />


    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FFFFF" }}>
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
                    // console.log(recipeForm());
                    navigation.navigate('HomeTab')
                }
                }>
                    <Text style={styles.text}>Submit Recipe</Text>
                </Pressable>
            </View>
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
        color: 'gray',
    }
})