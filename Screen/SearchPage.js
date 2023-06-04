import { Image, Text, TextInput, TouchableOpacity, View, VirtualizedList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBars, faCircleXmark, faFilter, faGripLinesVertical, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/core';


export default function SearchPage() {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}
        {/* header */}
        <View style={{ position: 'absolute', bottom: 25, width: "100%", height: 50, flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
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
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 7 }}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeTab')}>
            <FontAwesomeIcon icon={faArrowLeft} size={18}  />
            </TouchableOpacity>
            <Text style={{ fontWeight: "500", fontSize: 15, paddingBottom: 2 }}>Back</Text>
          </View>
          <View style={{ flex: 3, justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#EDEDED', height: '65%', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}></View>
              <TextInput
                style={{ flex: 6 }}
                placeholder="Title Recipe"
                keyboardType='default' />
              <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faCircleXmark} size={24} color="#CACECF" />
              </View>
            </View>

          </View>
          <View style={{ flex: 1 }}></View>
        </View>

        {/* content */}
        <View style={{ flex: 11, paddingHorizontal: 20 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>10 product found</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>Layout</Text>
                <FontAwesomeIcon icon={faBars} size={24} />
              </View>
            </View>
            <View style={{ flex: 12, gap: 15 }}>
              <View style={{ height: 140, borderRadius: 15, borderColor: '#CACECF', borderWidth: 1, flexDirection: 'row', padding: 10, gap: 15 }}>
                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80',
                    }}
                    style={{ height: "100%", width: '100%', borderRadius: 20 }}
                  />
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={{ fontSize: 18, fontWeight: 600 }}>Nasi Goreng</Text>
                  <Text style={{ marginTop: 5, fontSize: 12.5, textAlign: 'left' }}>Merupakan makanan olahan yang berbahan dasar dari mie instan (indomie) yang dihidangkan bersama telur ceplok.</Text>
                </View>
              </View>

            </View>
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView >
    </>
  )
}