import { StyleSheet, Text, View, Dimensions, ScrollView, ImageBackground, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFile, faSignOut } from '@fortawesome/free-solid-svg-icons'

const { width, height } = Dimensions.get('window')

const data = [
    {
        title: 'nasi padang'
    },
    {
        title: 'nasi padang'
    },
    {
        title: 'nasi padang'
    },
    {
        title: 'nasi padang'
    }
]

export default function Profil() {
    return (
        <SafeAreaView>
            <ImageBackground
                source={require('../assets/vectorOren.png')}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <View style={styles.container}>
                    <Text style={styles.header}>Profil</Text>
                    <View style={styles.profilContainer}>
                        <View style={styles.user}>
                            <Text style={styles.name}>Anggit Saepul Anwar</Text>
                            <Text style={styles.email}>anggitsaeful382@gmail.com</Text>
                            <Text style={styles.email}>085941310965</Text>
                        </View>
                        <View style={styles.SignOut}>
                            <FontAwesomeIcon icon={faSignOut} color='#EF551D' size={20}> </FontAwesomeIcon>
                            <Text style={styles.textIcon}>  Sign Out </Text>
                        </View>
                        <Image style={{ width: '100%' }} source={require('../assets/vectorline.png')}></Image>
                        <View style={styles.SignOut}>
                            <FontAwesomeIcon icon={faFile} color='#EF551D' size={20}> </FontAwesomeIcon>
                            <Text style={styles.textIcon}>  Resep Saya </Text>
                        </View>
                        <FlatList data={data} numColumns={2}
                            renderItem={({ item }) => {
                                return <View style={styles.cardContainer}>
                                    <Image style={styles.photo} source={{ uri: "https://media.istockphoto.com/id/1144681924/id/foto/nasi-padang-dengan-ayam-cabai-hijau-nasi-padang.jpg?s=170667a&w=0&k=20&c=-D3GVhmmDexjYSl6eWUdP3UgGcmKzb3j7dGLYyIGuP8=" }} />
                                    <Text style={styles.title}>Nasi Padang</Text>
                                </View>
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 10,
        color: 'white'

    },
    profilContainer: {
        width: width - 30,
        height: height - 130,
        padding: 20,
        paddingTop: 0,
        margin: 15,
        elevation: 10,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textIcon : {
        fontWeight: '500',
        fontSize: 15,
    },
    user: {
        padding: 20
    },
    email: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'gray'
    },
    imageBackground: {
        width: "100%",
        height: '85%',
        zIndex: -1
    },
    SignOut: {
        padding: 20,
        flexDirection: 'row'
    },
    cardContainer: {
        overflow: "hidden",
        marginBottom: 20,
        borderColor: '#cccccc',
        marginLeft : 5,
        marginRight : 5,
        borderWidth: 0.5,
        borderRadius: 20,
        width : 135,
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    photo: {
        width: "100%",
        marginTop: 0,
        height: 100,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        resizeMode : 'center',
        borderRadius : 15
    },


})