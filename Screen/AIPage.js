import { StyleSheet, Text, View, ImageBackground, Button, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, gql, useReactiveVar } from '@apollo/client';


const GetAi = gql`
mutation GetAi($message: String) {
  getAi(message: $message) {
    content
  }
}
`;

export default function AIPage() {
  const [gate, setGate] = useState(false)
  const [chats, setChats] = useState([])
  const [uploadMessage, { data, loading, error }] = useMutation(GetAi, {
    onError: (err) => {
      console.log(err, "error graph");
    }
  });
  console.log(data);

  useEffect(() => {
    if (data) {
      const clonedChat = JSON.parse(JSON.stringify(chats))
      clonedChat[clonedChat.length - 1].bot = data.getAi.content
      setChats(clonedChat)
    }
  }, [data])


  const rederedChats = chats.map((value, index) => {
    return (
      <View key={index}>
        <View style={styles.buttonn3} >
          <Text style={styles.text}>{value.user}</Text>
        </View>
        <View style={styles.button1}>
          <Text style={styles.text1}>{value.bot ? value.bot : ""}</Text>
        </View>
      </View>
    )
  })

  const uploadMessageAI = async () => {
    try {

      let aiMessage = ''
      if (gate) {
        aiMessage = 'berikan 1 rekomendasi resep makanan lainnya'
      } else {
        aiMessage = 'berikan 1 rekomendasi resep makanan untuk hari ini'
        setGate(true)
      }
      setChats([...chats, {
        user: aiMessage,
        bot: ''
      }
      ])
      await uploadMessage({
        variables: {
          message: aiMessage
        }
      });
    } catch (error) {
      console.log(error.errors, "<---------");
    }
  };
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <ScrollView style={styles.scroll}>

        <View style={styles.container}>
          <View style={styles.button0}>
            <Text style={styles.text0}>Ini menggunakan kemampuan AI berbasis chat gpt untuk merekomendasikan resep makanan yang cocok untuk kamu hari ini</Text>
          </View>
          {rederedChats}

        </View>
      </ScrollView>
      <View style={styles.button}>
        <Pressable style={styles.buttonn} onPress={uploadMessageAI}>
          <Text style={styles.text}>Rekomendasi resep makanan</Text>
        </Pressable>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: "90%",
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20
  },
  scroll: {
    zIndex: -1,
  },

  buttonn3: {
    marginLeft: 47,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  button: {
    width: "80%",
    marginTop: 610,
    position: 'absolute'
  },
  button1: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",

  },
  button0: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EDEDED",

  },
  textButton: {
    marginBottom: 50
  },

  buttonn: {
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
    alignItems: 'center'
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