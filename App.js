import React from 'react'
import { View , Platform , StatusBar } from 'react-native'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' //
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs' //
import {createStackNavigator } from '@react-navigation/stack'
import {FontAwesome , MaterialIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import {green, black} from './utils/colors'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import {setLocalNotification} from './utils/helpers'


function FlashStatusBar({backgroundColor , ...props}){
  return(
    <View style={{backgroundColor , height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

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
const StacksScreens = () => {
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

class App extends React.Component{
  componentDidMount() {
    setLocalNotification();
  }
  render(){
    return (
      <Provider store={createStore(reducer)} style={{flex:1}}>
          <FlashStatusBar backgroundColor={green} barStyle='light-content'/>
         <NavigationContainer>
            <StacksScreens />
          </NavigationContainer>
      </Provider>
    )
  }
 
}



export default App
