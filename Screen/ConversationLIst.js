import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Pressable, ActivityIndicator } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../assets/logo.png";
import * as TalkRn from "@talkjs/expo";
import { gql, useQuery } from "@apollo/client";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GetUser = gql`
  query GetUser {
    getUser {
      email
      id
      username
      phoneNumber
    }
  }
`;

export default function MessagesScreen({ navigation, route }) {
  const [access_token, setAccessToken] = useState("");
    const isfocused = useIsFocused()

  const [isLoading, setIsLoading] = useState(false);
  const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(GetUser);
  console.log(dataUser, "<<ini data");

  console.log(route);

  useEffect(() => {
    AsyncStorage.getItem("access_token")
      .then(value => {
        setAccessToken(value || "");
      })
      .catch(error => {
        console.error("Error retrieving access token:", error);
      });
  }, [isfocused]);

  const me = {
    id: dataUser?.getUser?.id,
    name: dataUser?.getUser?.username,
    email: dataUser?.getUser?.email,
    photoUrl: "https://images.unsplash.com/photo-1552234994-66ba234fd567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: dataUser?.getUser?.id,
    name: dataUser?.getUser?.username,
    email: dataUser?.getUser?.email,
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, how can I help? https://google.com",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);



  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  
  if (loadingUser, isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!access_token) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 300, height: 200 }} source={require('../assets/ilustratorlogin.png')}>
        </Image>
        <Text style={{ fontWeight: '200' }}> Maaf! kamu harus login ke akun kamu terlebih dahulu</Text>

        <Pressable
          style={{ ...styles.button, marginTop: 10 }}
          onPress={() => navigation.navigate('Profiles')}
        >
          <Text style={styles.text}><MaterialCommunityIcons name="login" color={"#ffffff"} size={15} />  Login</Text>
        </Pressable>
      </View>
    )
  }

  return (

    <TalkRn.Session appId="tUXyvBIY" me={me}>
      <TalkRn.ConversationList
        me={me}
        onSelectConversation={(conversation) => {
          const user = conversation.others[0];
          console.log("user :", user);
          const obj = {
            id: user.id,
            name: user.name || user.username,
            photoUrl: user.photoUrl,
            id_sendiri: dataUser?.getUser?.id,
            name_sendiri: dataUser?.getUser.username,
          };

          navigation.navigate("Chat", obj);
        }}
      />
    </TalkRn.Session>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    height: 200,
  },
  conversationList: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
    borderWidth: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 14,
    color: "#808080",
  },
  lastMessageText: {
    fontSize: 16,
    color: "#808080",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerLogo: {
    width: 85,
    height: 85,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});