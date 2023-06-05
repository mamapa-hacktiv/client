import { Dimensions, Text, TextInput, View, VirtualizedList, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faBars, faCircleXmark, faFilter, faGripLinesVertical, faSortDown } from "@fortawesome/free-solid-svg-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get('window')

const labels = [
  'Rebus',
  'Masak',
  'Bumbuin',
  'Beri perasa',
  'Sajikan',
]

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ff3232',
  separatorFinishedColor: '#ff3232',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#ff3232',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ff3232',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#ff3232',
};

export default function DetailPage() {
  const [currentPosition, setCurrentPosition] = useState(0)

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1)
  }

  const previouseStep = () => {
    setCurrentPosition(currentPosition - 1)
  }
  const data = [
    {
      label: 'Step 1',
      status: 'Cuci beras hingga bersih lalu tiriskan'
    },
    {
      label: 'Step 2',
      status: 'Masukkan semua bahan-bahan ke dalam panci'
    },
    {
      label: 'Step 3',
      status: 'Masak di atas api sedang hingga air habis dan aduk-aduk sesekali agar tidak lengket'
    },
    {
      label: 'Step 4',
      status: 'Pindahkan ke dalam dandang yang sudah dipanaskan. Kukus hingga matang'
    },
    {
      label: 'Step 5',
      status: 'Sajikan nasi uduk bersama irisan telur dadar, tempe orek, bakwan, bihun goreng dan beri taburan bawang goreng'
    }
  ]

  const ingredient = [
    { ingredients: '2 cup rice (use the cup that comes with the rice cooker)' },
    { ingredients: '1/2 cup thick coconut milk (regular US cup)' },
    { ingredients: '2 lemongrass (Indonesian: sereh), bruised and knotted' },
    { ingredients: '2 fresh/frozen pandan leaves, washed and knotted' },
    { ingredients: '4 Indonesian bay leaves (Indonesian: daun salam)' },
    { ingredients: '2 thin slices of galangal (Indonesian: lengkuas)' },
    { ingredients: '1 teaspoon coriander powder (Indonesian: bubuk ketumbar)' },
  ]
  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <View>
            <YoutubePlayer
              height={230}
              play={false}
              videoId={"hAv7XXll_Js"}
            />
          </View>

          <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold", marginBottom: 5, marginLeft: 20 }} >Ingredients</Text>
          <View style={styles.ingridientsContainer}>
            <View style={{ padding: 20 }}>
              {ingredient.map((item, index) => {
                return (
                  <View key={index} style={{ marginBottom: 5 }}>
                    <Text style={{ fontSize: 14 }}>{`\u2022 ${item.ingredients}`}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold", marginBottom: 5, marginLeft: 20 }} >Steps</Text>
          <View style={styles.indicatorContainer}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              direction="vertical"
              renderLabel={({ position, stepStaus, label, crntPosition }) => {
                return (
                  <View style={styles.lblcontainer}>
                    <Text style={styles.lbltext}> {data[position].label}</Text>
                    <Text style={[styles.status, { marginTop: 5 }]}> {data[position].status}</Text>
                  </View>
                )
              }}
            />
            <View style={{ flexDirection: 'row', gap: 110 }}>
              <TouchableOpacity style={styles.previousBtn} onPress={() => previouseStep()}>
                <Text style={styles.text}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
                <Text style={styles.text}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: "bold", marginBottom: 5, marginLeft: 20 }} >Reaction</Text>
          <View style={styles.reactionContainer}>
            <TextInput style={styles.input} placeholder="Comments" />
            <TouchableOpacity style={styles.submitReaction} onPress={() => nextStep()}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  input: {
    backgroundColor: "gray",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    width: "65%",
    backgroundColor: "#EDEDED",
  },
  hr: {
    borderWidth: 10,
    borderColor: 'rgba(219, 219, 219, 0.2)',
    marginVertical: 8
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  ingredientsName: {
    fontSize: 13,
    color: '#000'
  },
  indicatorContainer: {
    width: width - 30,
    padding: 20,
    paddingTop: 0,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  ingridientsContainer: {
    width: width - 30,
    padding: 20,
    paddingTop: 10,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  reactionContainer: {
    width: width - 30,
    padding: 20,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 5
  },
  lblcontainer: {
    marginTop: 40,
    padding: 10,
    paddingLeft: 5,
    width: width - 100
  },
  lbltext: {
    fontSize: 17,
    color: '#EF551D',
    fontWeight: 'bold',
  },
  nextBtn: {
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  submitReaction: {
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  previousBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#EF551D",
  },
  text: {
    color: 'white',
    fontSize: 18
  },
  status: {
    fontSize: 15,
    color: 'gray'
  }
})