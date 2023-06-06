import { StyleSheet, Text, View, ImageBackground, Button, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import { useMutation, gql, useReactiveVar } from '@apollo/client';

const registerUpload = gql`
mutation Register($newUser: newUser) {
  register(newUser: $newUser) {
    message
  }
}
`;


export default function RegisterForm() {
    const [secure, setSecure] = useState(true)

    const [registerForm, setRegisterForm] = useState({
        "username": "",
        "phoneNumber": "",
        "password": "",
        "email": ""
    })

    function onchange(value, key) {
        setRegisterForm({ ...registerForm, [key]: value })
    }

    const [uploadRegister, { data, loading, error }] = useMutation(registerUpload, {
        onError: (err) => {
            console.log(err, "error graph");
        }
    });
    function visibilityHandle() {
        setSecure(!secure)
    }

    const onClick = async () => {
        try {
            await uploadRegister({
                variables: {
                    newUser: registerForm
                }
            });
            navigation.navigate('Profiles')
            setRegisterForm({
                "username": "",
                "phoneNumber": "",
                "password": "",
                "email": ""
            })
        } catch (error) {
            console.log(error.errors, "<---------");
        }
    };

    const navigation = useNavigation();
    return (
        <>
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGZvb2R8ZW58MHwxfDB8fHww&auto=format&fit=crop&w=500&q=60',
                }}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <View style={styles.textButton}>
                    <Text style={{ ...styles.textHeaders, backgroundColor: 'rgba(245,94,0,1)', padding: 10, borderRadius: 15 }}>Buat akun barumu </Text>
                </View>
                <LinearGradient style={styles.overlay} colors={['transparent', 'rgba(0,0,0,0)']}>
                    <View style={{ marginBottom: 20, padding: 30, backgroundColor: 'rgba(255,255,255,1)', borderRadius: 20, width: "90%" }}>

                        <View style={{ marginBottom: 20 }}>
                            <TextInput label="Name"
                                left={<TextInput.Icon icon="account" />}
                                mode="outlined"
                                style={{ margin: 5, justifyContent: 'flex-start' }}
                                onChangeText={(e) => onchange(e, 'username')} value={registerForm.username}
                            />
                            <TextInput label="Email"
                                left={<TextInput.Icon icon="email" />}
                                mode="outlined"
                                style={{ margin: 5, justifyContent: 'flex-start' }}
                                onChangeText={(e) => onchange(e, 'email')} value={registerForm.email}
                            />
                            <TextInput label="Telpon"
                                left={<TextInput.Icon icon="phone" />}
                                mode="outlined"
                                style={{ margin: 5, justifyContent: 'flex-start' }}
                                onChangeText={(e) => onchange(e, 'phoneNumber')} value={registerForm.phoneNumber}
                            />
                            <TextInput label="Password"
                                left={<TextInput.Icon icon="lock" />}
                                mode="outlined"
                                secureTextEntry={secure}
                                style={{ margin: 5 }}
                                onChangeText={(e) => onchange(e, 'password')} value={registerForm.password}
                                right={<TextInput.Icon icon="eye" onPress={visibilityHandle} />}
                            />
                        </View>
                        <View style={styles.button}>
                            <Pressable style={styles.buttonn} onPress={onClick}>
                                <Text style={styles.text}>Submit</Text>
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