import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View, VirtualizedList } from "react-native";
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
    videoUrl
    origin
    portion
    cookingTime
    UserId
    Reactions {
      id
      emoji
      quantity
      RecipeId
      UserId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
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
    refetch({ title: search })
  }, [search])

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

          {/* <View style={{ position: 'absolute', bottom: 25, width: "100%", height: 50, flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
          <View style={{ backgroundColor: '#F05D27', width: "50%", height: '100%', borderRadius: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <FontAwesomeIcon icon={faFilter} size={20} color="white" />
              <Text style={{ fontSize: 16, fontWeight: "500", paddingLeft: 3, color: 'white' }}>Filter</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: 'white' }}>|</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "500", color: 'white' }}>Sort</Text>
              <View style={{ paddingBottom: 12 }}>
                <FontAwesomeIcon icon={faSortDown} size={24} color="white" />
              </View>
            </View>
          </View>
        </View> */}
          <View style={{ flex: 1, flexDirection: 'row', padding: 15, justifyContent: 'space-around' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 7 }}>
              <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
                <FontAwesomeIcon icon={faArrowLeft} size={18} />
              </TouchableOpacity>
              <Text style={{ fontWeight: "500", fontSize: 15, paddingBottom: 2 }}>Back</Text>
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }}>
              <View style={{ backgroundColor: '#EDEDED', borderRadius: 20, justifyContent: 'center' }}>
                <TextInput
                  style={{ left: 15, width: '85%' }}
                  placeholder="Title Recipe"
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
                <Text style={{ fontWeight: '500', fontSize: 18 }}>10 product found</Text>
              </View>
              <View style={{ flex: 12, gap: 15, paddingTop: 10 }}>

                {data && data.recipeSearch.map(el => {
                  return (
                    <View key={el.id} style={{ height: 140, borderRadius: 15, borderColor: '#CACECF', borderWidth: 1, flexDirection: 'row', padding: 10, gap: 15 }}>
                      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          source={{
                            uri: el.image,
                          }}
                          style={{ height: "100%", width: '100%', borderRadius: 20 }}
                        />
                      </View>
                      <View style={{ flex: 2 }}>
                        <Text style={{ fontSize: 18, fontWeight: 600 }}>{el.title}</Text>
                        <Text style={{ marginTop: 5, fontSize: 12.5, textAlign: 'left' }}>{el.description}</Text>
                      </View>
                    </View>
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