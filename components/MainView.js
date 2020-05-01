import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' //
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs' //
import {createStackNavigator } from '@react-navigation/stack'
import {FontAwesome , MaterialIcons } from '@expo/vector-icons'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import DeckView from './DeckView'
import Quiz from './Quiz'
import AddCard from './AddCard'
import {green , black} from '../utils/colors'

const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()
const TabsNav = () =>{
  return(
    <Tabs.Navigator initialRouteName="DeckList"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ tintColor }) => {
          if (route.name === "Decks") {
            return (
              <FontAwesome name="plus-square" size={30} color={tintColor} />
            );
          } else if (route.name === "Add Deck") {
            return (
              <MaterialIcons name="library-add" size={30} color={tintColor} />
            );
          }
        }
      })}

      tabBarOptions={{
        activeTintColor: black,
        style: {
          height: 50,
          backgroundColor: green,
          shadowColor: "rgba(0, 0, 0, 0.24)",
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }
    }>
      <Tabs.Screen name="Decks" component={DeckList}/>
      <Tabs.Screen name="Add Deck" component={AddDeck} />
    </Tabs.Navigator>
  )
}

 const Stacks = createStackNavigator()

export default function MainView(){
      return(
        <Stacks.Navigator headerMode="screen" >
        <Stacks.Screen 
          name='Home' 
          component={TabsNav} 
          options={{headerShown: false}}
          />
        <Stacks.Screen 
          name='Deck View' 
          component={DeckView} 
          options={{
              headerTintColor: black,
              headerStyle: { backgroundColor: green },
              headerTitleStyle: { fontWeight: "bold" }
          }}
           />
          <Stacks.Screen 
          name='Quiz' 
          component={Quiz} 
          options={{
              headerTintColor: black,
              headerStyle: {
                  backgroundColor: green,
              }
          }} 
          />
          <Stacks.Screen 
          name='Add Card' 
          component={AddCard} 
          options={{
              headerTintColor: black,
              headerStyle: {
                  backgroundColor: green,
              }
          }} 
          />
      </Stacks.Navigator>
      )
}