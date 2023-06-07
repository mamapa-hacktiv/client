import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View, VirtualizedList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBars, faCircleXmark, faFilter, faGripLinesVertical, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client';

const recipeSearch = gql`
query RecipeSearch($title: String) {
  recipeSearch(title: $title) {
    id
    title
    image
    description
  }
}
`;


export default function SearchPage() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('')
  const { loading, error, data, refetch } = useQuery(recipeSearch, {
    variables: {
      title: ''
    }
  });

  useEffect(() => {
    const getData = setTimeout(() => {
      refetch({ title: search })
    }, 1000);
    return () => clearTimeout(getData)
  }, [search])

  function limitStringTo20Words(inputString) {
    var words = inputString.split(" ");
    var numWords = words.length;

    if (numWords <= 20) {
      return inputString;
    }

    var truncatedWords = words.slice(0, 16);
    var truncatedString = truncatedWords.join(" ");
    return truncatedString + " ...";
  }


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', padding: 15, justifyContent: 'space-around' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 7 }}>
              <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
                <FontAwesomeIcon icon={faArrowLeft} size={20} />
              </TouchableOpacity>
            
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <View style={{ backgroundColor: '#EDEDED', width : 250, height : 40 ,borderRadius: 15,elevation : 4, justifyContent: 'center' }}>
                <TextInput
                  style={{ left: 15 }}
                  placeholder="Nama Resep"
                  keyboardType='default'
                  onChangeText={(e) => { setSearch(e) }}
                  value={search}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={{ flex: 11, paddingHorizontal: 20 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, paddingTop: 15 }}>
                <Text style={{ fontWeight: '500', fontSize: 18, textTransform: 'capitalize' }}>{search && data.recipeSearch.length} Resep yang ditemukan</Text>
              </View>
              <View style={{ flex: 12, gap: 15, paddingTop: 10 }}>

                {data && data.recipeSearch.map(el => {
                  return (
                    <Pressable key={el.id} onPress={() => navigation.navigate('Detail', { id: el.id })}>
                      <View style={{ height: 140, backgroundColor: 'white', elevation: 3, borderRadius: 15, borderColor: '#CACECF', borderWidth: 1, flexDirection: 'row', padding: 10, gap: 15 }}>
                        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                          <Image
                            source={{
                              uri: el.image,
                            }}
                            style={{ height: "100%", width: '100%', borderRadius: 20 }}
                          />
                        </View>
                        <View style={{ flex: 2 }}>
                          <Text style={{ fontSize: 18, fontWeight: 600, textTransform: 'capitalize' }}>{el.title}</Text>
                          <Text style={{ marginTop: 5, fontSize: 12.5, textAlign: 'left' }}>{limitStringTo20Words(el.description)}</Text>
                        </View>
                      </View>
                    </Pressable>
                  )
                })}


              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView >
    </>
  )
}