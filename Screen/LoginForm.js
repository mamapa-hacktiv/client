
import { StyleSheet, Text, View, ImageBackground, Button, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import { useMutation, gql } from '@apollo/client';
import { access_token } from '../graphql/variable';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getLogin = gql`
mutation Mutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    access_token
  }
}
`;


export default function LoginForm() {
    const [uploadLogin, { data, loading, error }] = useMutation(getLogin, {
        onError: (err) => {
            console.log(err, "error graph");
        }
    });

    const navigation = useNavigation();
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const clickHandle = async () => {
        try {
            const { data } = await uploadLogin({
                variables: {
                    email: loginForm.email,
                    password: loginForm.password
                }
            });
            await AsyncStorage.setItem("access_token", data.login.access_token);

            setLoginForm({
                email: '',
                password: ''
            })
            navigation.navigate('Home')
        } catch (error) {
            console.log(error.errors, "<---------");
        }
    };
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
                        <View style={{ marginBottom: 20 }}>
                            <TextInput label="Email"
                                left={<TextInput.Icon icon="email" />}
                                mode="outlined"
                                style={{ margin: 10, justifyContent: 'flex-start' }}
                                onChangeText={(e) => setLoginForm({ ...loginForm, email: e })} value={loginForm.email}
                            />
                            <TextInput label="Password"
                                left={<TextInput.Icon icon="form-textbox-password" />}
                                mode="outlined"
                                secureTextEntry={true}
                                style={{ margin: 10 }}
                                right={<TextInput.Icon icon="eye" />}
                                onChangeText={(e) => setLoginForm({ ...loginForm, password: e })} value={loginForm.password}
                            />
                        </View>
                        <View style={styles.button}>
                            <Pressable style={styles.buttonn} onPress={clickHandle}>
                                <Text style={styles.text}>Sign In</Text>
                            </Pressable>
                        </View>
                        <View style={styles.button}>
                            <Pressable style={styles.buttonn2} onPress={() => navigation.navigate('RegisterForm')}>
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
        marginBottom: 15
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
        borderColor: "black",
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