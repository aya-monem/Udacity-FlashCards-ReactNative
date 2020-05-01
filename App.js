import React from 'react'
import { View , StatusBar } from 'react-native'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducer'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import {green} from './utils/colors'

import {setLocalNotification} from './utils/helpers'
import MainView from './components/MainView'


function FlashStatusBar({backgroundColor , ...props}){
  return(
    <View style={{backgroundColor , height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

   const store = createStore(reducer)
       
class App extends React.Component{
  componentDidMount() {
    setLocalNotification();
  }
  render(){
    return (
      <Provider store={store} style={{flex:1}}>
          <FlashStatusBar backgroundColor={green} barStyle='light-content'/>
         <NavigationContainer>
            <MainView />
          </NavigationContainer>
      </Provider>
    )
  }
 
}



export default App
