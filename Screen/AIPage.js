import { StyleSheet, Text, View, ImageBackground, Button, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AIPage() {
    const navigation = useNavigation();
    return (
      <View style={{flex :1, alignItems : 'center'}}>
      
      <ScrollView style={styles.scroll}>
        
            <View style={styles.container}>
                    <View style={styles.button0}>
                            <Text style={styles.text0}>Ini menggunakan kemampuan AI berbasis chat gpt untuk merekomendasikan resep makanan yang cocok untuk kamu hari ini</Text>
                    </View>
                    <View style={styles.buttonn3}>
                            <Text style={styles.text}>rekomendasi resep makanan</Text>
                    </View>
                    <View style={styles.button1}>
                            <Text style={styles.text1}>Tentu! Berikut beberapa rekomendasi makanan lainnya:
Pad Thai: Makanan khas Thailand yang terdiri dari mie beras yang digoreng dengan udang, tahu, tauge, dan telur. Ditambah dengan saus tamarind, kecap ikan, dan bumbu-bumbu yang khas. Sajikan dengan kacang tanah cincang, irisan jeruk nipis, dan cabai rawit jika Anda menyukai rasa pedas.
Sushi Burrito: Ini adalah variasi baru yang menggabungkan konsep sushi dengan gulungan besar seperti burrito. Biasanya berisi nasi sushi, potongan ikan mentah atau makanan laut lainnya, sayuran, dan saus dalam satu gulungan besar. Ini bisa menjadi pilihan yang menyenangkan dan lezat.
Chicken Shawarma: Hidangan Timur Tengah yang terdiri dari potongan daging ayam yang dibumbui dengan rempah-rempah khas, lalu dipanggang dan dipotong tipis. Disajikan dalam roti pita dengan sayuran segar, saus yogurt, dan taburan bumbu seperti hummus atau tahini.
Bibimbap: Hidangan Korea yang terdiri dari nasi putih yang disajikan dengan berbagai macam sayuran seperti wortel, bayam, mentimun, kacang panjang, serta daging atau telur. Biasanya disajikan dengan gochujang, saus pedas khas Korea, dan sedikit minyak wijen untuk memberikan rasa yang kaya.</Text>
                    </View>
                
                </View>
      </ScrollView>
                    <View style={styles.button}>
                        <Pressable style={styles.buttonn} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.text}>Rekomendasi resep makanan</Text>
                        </Pressable>
                    </View>
                
                    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width : "90%",
        alignItems : 'center',
        marginLeft : 20,
        marginTop : 20
    },
    scroll: {
      zIndex: -1,
    },
    
    buttonn3 : {
      marginLeft : 47,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "#EF551D",
  },
    button: {
       width : "80%",
        marginTop : 610,
        position : 'absolute'
    },
    button1: {
      marginTop : 20,
      marginBottom : 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "gray",

   },
   button0: {
    marginTop : 20,
    marginBottom : 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EDEDED",

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
      text1: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      text0: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
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