import { StyleSheet, Text, View, ImageBackground, Button, Alert } from 'react-native'
import React from 'react'

export default function LandingPage() {
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
                <View style={styles.overlay}>
                    <View style={styles.textButton}>
                        <Text style={styles.textHeaders}>Bingung pilih lauk makan? langsung aja buka,mam apa</Text>
                        <Text style={styles.textTitle}>Disini sudah ada fitur pencarian makanan pake AI lohh</Text>
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Get started"
                            color={"#EF551D"}
                            onPress={() => Alert.alert('Lanjut ke home')}
                        />
                    </View>
                </View>
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
        fontSize: 15,
        marginTop: 40,
        width: "75%",
        marginLeft: 40,
        marginRight: 100
    },
    textButton: {
        width: "85%",
        marginLeft: 40
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0.10, 0.20, 0.30, 0.40)',
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