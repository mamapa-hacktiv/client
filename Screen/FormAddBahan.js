import { StyleSheet, Text, View, Image, Button, Pressable , TextInput} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';

export default function FormAddBahan() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#FFFFF" }}>
            <Text style={styles.textHeaders}>Bahan - Bahan</Text>
            <TextInput style={styles.input} placeholder="Bahan 1" />
            <TextInput style={styles.input} placeholder="Bahan 2" />
            <TextInput style={styles.input} placeholder="Bahan 3" />
            <Text style={styles.textplus}>+ Bahan</Text>
            <Text style={styles.textHeaders}>Langkah - Langkah</Text>
            <TextInput  style={styles.input} multiline={true} placeholder="Potong Ayam jadi beberapa bagian12 bagian misalnya" />
            <TextInput style={styles.input} multiline={true} placeholder="Didihkan air , rebus ayam hingga matang" />
            <TextInput style={styles.input} multiline={true} placeholder="Didihkan air , rebus ayam hingga matang" />
            <Text style={styles.textplus}>+ Langkah</Text>
            <Pressable style={styles.buttonn} onPress={() => navigation.navigate('HomeTab')}>
                <Text style={styles.text}>Submit Recipe</Text>
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
        width: "80%",
        marginBottom: 10,
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