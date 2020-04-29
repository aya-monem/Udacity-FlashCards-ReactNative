import React from 'react'
import { Text, KeyboardAvoidingView , TextInput , StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity} from 'react-native-gesture-handler'
import { gray , green} from '../utils/colors'
import { createRandomId } from '../utils/helpers'
import { saveDeckTitle } from '../utils/api'
import {addDeck} from '../actions'


class AddDeck extends React.Component{
    state = {
        input : ''
    }
    getDeckTitle = (text) => {
         this.setState({
             input : text
         })
        
    }
    createDeck(input){
        const {decks} = this.props
             // if user didn't enter any title
        if (input === '' || input === null){
            alert("You didn't write the Deck's title!!")
        }

           // if he entered a title already exist 
        if(Object.keys(decks).includes(input)){
        
            alert('This deck already exists, enter another name')
            this.setState({ input:'' })
          
        
        }
            //// normal situation
        else{
            // 1- add deck to redux
            const randomId = createRandomId()
            this.props.dispatch(addDeck(randomId ,input))
                    // 2- create the deck
            const createdDeck = () => {
                return {
                        id : randomId,
                        title : input,
                        questions : []
                }
            }
                    // 3- save deck in Async storage
                saveDeckTitle(createdDeck())
                
                // 4- navigate to the deck view screen   
            this.props.navigation.navigate( 'Deck View' ,{deckName : createdDeck().title})
                
                // 5- reset the input field for next use
            this.setState({
                input : ''
            })
        }
             
        
    }
    
    render(){
        const {input} = this.state;
        return(
            <KeyboardAvoidingView keyboardVerticalOffset={80} style={styles.container}>
                <Text style={styles.title}>What is the title of your deck? :) </Text>
                <TextInput style={styles.input}
                    value={input}
                    placeholder={'eg: Paython'} 
                    onChangeText={(text) => this.getDeckTitle(text)}/> 

                <TouchableOpacity style={styles.btn} 
                  onPress={() => this.createDeck(input) }>
                    <Text style={styles.text}>Creat Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
          flex :1 ,
          justifyContent : 'center',
          alignItems : 'center',
    },
    title :{
       fontSize : 20,
    },
    input : {
        width : 250,
        fontSize : 20,
        padding : 7,
        marginTop : 10,
        borderColor : gray,
        borderWidth : 1,
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
});


function mapStateToProps(decks){
     return { decks }
}

export default connect(mapStateToProps)(AddDeck);