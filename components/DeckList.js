import React from 'react'
import { Text, View , StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {receiveDecks} from '../actions'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import {  green , gray} from '../utils/colors'
import { initialDecks } from '../utils/helpers'

class DeckList extends React.Component{
    componentDidMount(){
          // storage
        getDecks()
           // redux
        this.props.receiveDecks(initialDecks)
    }
    
    render(){     
    const {decks , navigation} = this.props
        return(
            <ScrollView>
                {Object.keys(decks).map(key => {
                   const {id , title , questions} = decks[key]
                    return(
                        <View key={id} style={styles.container}>
                            <Text style={styles.title} >{title}</Text>
                            <Text>{questions.length === 0 ? 'No' : questions.length} cards</Text>   
                            <TouchableOpacity style={styles.btn}
                              onPress={()=> navigation.navigate( 'Deck View' ,{deckName : title})} >
                                <Text style={{textAlign:'center'}}>View Deck</Text>
                            </TouchableOpacity>
                        </View>
                    
                    )
                })}
            </ScrollView>
             
        )
    }
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        height:160,
        backgroundColor : gray,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
        marginLeft:60,
        marginRight:60,
      },
       btn :{
           width: 120,
           padding:10,
           marginTop:10,
           marginBottom:10,
           backgroundColor: green,
       },
       title:{
        fontSize : 25,
        paddingBottom:10,
    }
})
function mapStateToProps(state){  
    return {
         decks : state
    }
}
function mapDispatchToProps(dispatch){
    return{
        receiveDecks:  decks => dispatch(receiveDecks(decks))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(DeckList)