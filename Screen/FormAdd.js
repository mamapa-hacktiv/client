import { StyleSheet, Text, View, TextInput, Image, Button, Pressable } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';

export default function FormAdd() {
    const navigation = useNavigation();
    return (
        
        <View style={{flex: 1, alignItems: 'center', backgroundColor: "#FFFFF" }}>
            <View>
              <Image
            source={{ uri: "https://asset.kompas.com/crops/MrdYDsxogO0J3wGkWCaGLn2RHVc=/84x60:882x592/750x500/data/photo/2021/11/17/61949959e07d3.jpg" }}
            style={{ width: 320, height: 200,opacity: 0.4,borderRadius: 30 , zIndex: -1 ,marginBottom: 10}}
          />
          <Text style={{ position: "absolute" ,marginTop: 175 , marginLeft: 90, color : "black" }}> <FontAwesomeIcon icon={faCamera} style={{color: "black",}} /> UPLOAD PHOTO</Text>
            </View>
            <TextInput style={styles.input} placeholder="Name Recipes" />
            <TextInput style={styles.input} multiline={true} placeholder="Cerita di balik masakan ini, Apa atau siapa yang menginspirasimu? Apa yang membuatnya istimewa? Bagaimana caramu menikmatinya" />
            <TextInput style={styles.input} placeholder="Daerah asal" />
            <TextInput style={styles.input} placeholder="Porsi" />
            <TextInput style={styles.input} placeholder="Lama memasak" />
            <Pressable style={styles.buttonn} onPress={() => navigation.navigate('FormAddBahan')}>
                <Text style={styles.text}>Bahan & Langkah <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} /></Text>
            </Pressable>
        </View>
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
        width : "80%",
        marginBottom : 10,
    },
    buttonn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: "#EF551D",
        width : "80%",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})