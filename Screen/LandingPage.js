import { StyleSheet, Text, View, ImageBackground, Button, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingPage() {
    const navigation = useNavigation();
    return (
        <ImageBackground
            source={{
                uri: 'https://images.unsplash.com/photo-1624957389019-0c814505746d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=682&q=80',
            }}
            style={styles.imageBackground}
            imageStyle={styles.image}
        >

            <View style={styles.container}>
                <View style={{ flex: 1 }}>

                </View>
                <LinearGradient style={styles.overlay} colors={['transparent', 'rgba(0,0,0,1)']}>
                    <View style={{width : "80%"}}>
                    <View style={styles.textButton}>
                        <Text style={styles.textHeaders}>Bingung pilih lauk makan? langsung aja buka,mam </Text>
                        <Text style={styles.textTitle}>Disini sudah ada fitur pencarian makanan pake AI lohh</Text>
                    </View>
                    <View style={styles.button}>
                        <Pressable style={styles.buttonn} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.text}>Mulai</Text>
                        </Pressable>
                    </View>
                    </View>
                </LinearGradient>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        width: "100%",
    },
    button: {
       marginBottom : 10
    },
    textButton: {
        marginBottom : 50
    },
    buttonn : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#EF551D",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
    overlay: {
        flex: 1,
        alignItems : 'center'
    },
    textHeaders: {
        fontSize: 35,
        justifyContent: "center",
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
        marginBottom: 10
    },
    textTitle: {
        fontSize: 20,
        color: 'white'
    },
});