import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as TalkRn from "@talkjs/expo";
import { gql, useQuery } from "@apollo/client";

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

export default function ChatScreen(obj) {
  // const navigation = useNavigation();
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(GetUser);
  console.log(errorUser, dataUser, "<<ini data");

  console.log("obj : << ini route.params", obj.route.params);
  const id = obj.route.params.id;
  const name = obj.route.params.name;
  const email = obj.route.params.email;
  const photoUrl = obj.route.params.image;

  const me = {
    id: dataUser?.getUser?.id,
    name: dataUser?.getUser?.username,
    welcomeMessage: "Hi, Whats'up?",
    role: "default",
  };

  const other = {
    id,
    name,
    email,
    photoUrl,
    welcomeMessage: "Hi, Whats'up?",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <View style={styles.container}>
      <TalkRn.Session appId="tUXyvBIY" me={me}>
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    marginHorizontal: 10,
    color: "#6F6F6F",
  },
});
