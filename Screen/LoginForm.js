
import { StyleSheet, Text, View, ImageBackground, Button, Pressable, Image, Dimensions , ScrollView} from 'react-native'
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

const { width, height } = Dimensions.get('window')


export default function LoginForm() {
    const [secure, setSecure] = useState(true)
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
            console.log(data.login.access_token, 'accesstoken');

            setLoginForm({
                email: '',
                password: ''
            })
            navigation.navigate('HomeTab')
        } catch (error) {
            console.log(error.errors, "<---------");
        }
    };

    function visibilityHandle() {
        setSecure(!secure)
    }
    return (
        <ScrollView>
            <>

            <View style={{ flex: 2,  alignItems: 'center' }}>
                <View style={{ ...styles.textButton,  justifyContent : 'flex-start' }}>
                    <Text style={{ ...styles.textHeaders,  position : 'absolute', color : 'black', opacity : 0.5, zIndex : 10 }}>Silahkan login terlebih dahulu</Text>
                </View>
                <View style={{ marginTop : 100}}>

                <Image style={{ width: 300, height: 300, }} source={require('../assets/ilustratorlogin2.png')}>
                </Image>
                </View>
              
            
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginBottom: 20, padding: 40, backgroundColor: 'rgba(255,255,255,1)', borderRadius: 20, width: '90%' , height: "85%" , elevation : 10}}>
                    <View style={{ marginBottom: 20 }}>
                        <TextInput label="Email"
                            left={<TextInput.Icon icon="email" />}
                            mode="outlined"
                            style={{  justifyContent: 'flex-start' }}
                            onChangeText={(e) => setLoginForm({ ...loginForm, email: e })} value={loginForm.email}
                        />
                        <TextInput label="password"
                            left={<TextInput.Icon icon="lock" />}
                            mode="outlined"
                            secureTextEntry={secure}
                            style={{}}
                            right={<TextInput.Icon icon="eye" onPress={visibilityHandle} />}
                            onChangeText={(e) => setLoginForm({ ...loginForm, password: e })} value={loginForm.password}
                        />
                    </View>
                    <View style={styles.button}>
                        <Pressable style={styles.buttonn} onPress={clickHandle}>
                            <Text style={styles.text}>Sign In</Text>
                        </Pressable>
                    </View>
                    <View style={styles.button}>
                        <Pressable onPress={() => navigation.navigate('RegisterForm')}>
                            <Text style={styles.text1}>Don't have account? click me</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: "100%",
    },
    button: {
    },
    textButton: {
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
    text1: {
        fontSize: 15,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        textAlign : 'center'
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
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        color: 'white',
        marginTop: 80,
    },
    textTitle: {
        fontSize: 20,
        color: 'white'
    },
});