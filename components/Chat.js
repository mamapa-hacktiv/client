import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from "react-native";
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
  console.log("obj : << ini route.params", obj.route.params);
  const id = obj.route.params.id;
  const name = obj.route.params.name;
  const email = obj.route.params.email;
  const photoUrl = obj.route.params.image;

  const { loading: loadingUser, error: errorUser, data: dataUser, refetch: refetchUser } = useQuery(GetUser);
  // console.log(dataUser, "<<ini data");

  const me = {
    id: dataUser?.getUser?.id,
    name: dataUser?.getUser?.username,
    welcomeMessage: "Ada yang bisa saya bantu?",
    role: "default",
  };

  const other = {
    id,
    name,
    email,
    welcomeMessage: "Ada yang bisa saya bantu?",
    role: "default",
  };

  // console.log(me, "ini me", other, "ini dari other");
  // return null;
  if (loadingUser) {
    return <ActivityIndicator size="large" color={"#EF551D"} />;
  }
  if (!me.id || !other.id) {
    return null;
  }
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