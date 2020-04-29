import React from 'react'
import { Text, View , StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity} from 'react-native-gesture-handler'
import { green, gray } from '../utils/colors'


function DeckView(props){
    
        const {deck , navigation} = props
        navigation.setOptions({
            title : deck.title
        })
        return(
            <View style={styles.container}>
                <Text style={styles.title} >{deck.title}</Text>
                <Text>{deck.questions.length === 0 ? 'No' : deck.questions.length} cards</Text>
                <TouchableOpacity style={[styles.btn, {marginTop : 20}]}
                  onPress={()=> navigation.navigate('Add Card' , {deck : deck})}  >
                    <Text style={styles.text}>Add Card</Text>
                </TouchableOpacity >
                {deck.questions.length !== 0 && 
                    <TouchableOpacity style={styles.btn} 
                        onPress={()=> navigation.navigate('Quiz' , {deckName : deck.title})} >
                        <Text style={styles.text}>Start Quiz</Text>
                   </TouchableOpacity>
                }
                
            </View>
        )
    }

const styles= StyleSheet.create({
    container: {
        flex: 1,
        height:170,
        backgroundColor : gray,
        alignItems: 'center',
        justifyContent: 'center',
      },
       btn :{
           width: 120,
           padding:10,
           marginTop:10,
           marginBottom:10,
           backgroundColor: green,
       },
       text:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign:'center' ,
       },
       title:{
           fontSize : 40,
           paddingBottom:20,
       }
})
function mapStatesToPros( decks , {route} ){
    const {deckName} = route.params
    return{
        deck : decks[deckName]
    }

}

export default connect(mapStatesToPros)(DeckView);