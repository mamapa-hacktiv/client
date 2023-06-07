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
            <View style={{ flex: 2, alignItems: 'center' }}>
                <View style={{ ...styles.textButton, justifyContent: 'flex-start' }}>
                    <Text style={{ ...styles.textHeaders, position: 'absolute', color: 'black', opacity: 0.5, zIndex: 10 }}>Daftarkan akun mu segera!</Text>
                </View>
                <View  >

                    <Image style={{ width: 300, height: 250, marginTop: 70 }} source={require('../assets/ilustratorRegister.png')}>
                    </Image>
                </View>
            </View>
            <View style={{ flex: 2.5, alignItems: 'center', marginBottom: 35 }}>
                <View style={{ marginBottom: 20, padding: 30, backgroundColor: 'rgba(255,255,255,1)', borderRadius: 20, width: "90%", height: "99%", elevation: 10 }}>

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
                        <Pressable onPress={() => navigation.navigate('Profiles')} style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                            <Text style={styles.text1}>Already have account? click Here</Text>
                        </Pressable>

                    </View>
                </View>
            </View>

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
        opacity: 0.5,
        letterSpacing: 0.25,
        color: 'black',
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
        fontSize: 20,
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