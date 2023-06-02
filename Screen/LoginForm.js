
import { StyleSheet, Text, View, ImageBackground, Button, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';

export default function LoginForm() {
    const navigation = useNavigation();
    return (
        <>
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1624957389019-0c814505746d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=682&q=80',
                }}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <View style={styles.textButton}>
                    <Text style={styles.textHeaders}>Silahkan login </Text>
                </View>
                <LinearGradient style={styles.overlay} colors={['transparent', 'rgba(0,0,0,0)']}>
                    <Image style={{ position: "absolute", width: "100%" }} source={require('../assets/Rectangle50.png')} />
                    <View style={{ width: "80%" }}>
                        <View style={{ marginBottom: 20}}>
                            <TextInput label="Email"
                                left={<TextInput.Icon icon="email" />}
                                mode="outlined"
                                style={{ margin: 10 , justifyContent : 'flex-start'}} />
                            <TextInput label="Password"
                                left={<TextInput.Icon icon="form-textbox-password" />}
                                mode="outlined"
                                secureTextEntry={true}
                                style={{ margin: 10 }} 
                                right={<TextInput.Icon icon="eye" />}
                                />
                        </View>
                        <View style={styles.button}>
                            <Pressable style={styles.buttonn} onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.text}>Sign In</Text>
                            </Pressable>
                        </View>
                        <View style={styles.button}>
                            <Pressable style={styles.buttonn2} onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.text1}>Don't have account? click here</Text>
                            </Pressable>
                            </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
    },
    button: {
       marginBottom : 15
    },
    textButton: {
        marginBottom: 50,
        alignItems: 'center'
    },
    buttonn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "#EF551D",
        
    },
    buttonn2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        elevation: 3,
        borderColor : "black",
        backgroundColor: "gray",
    },
    text1: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textHeaders: {
        fontSize: 35,
        justifyContent: "center",
        fontWeight: 'bold',
        color: 'white',
        marginTop: 80,
    },
    textTitle: {
        fontSize: 20,
        color: 'white'
    },
});