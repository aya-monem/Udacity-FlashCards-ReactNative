import React from 'react'
import { Text ,KeyboardAvoidingView ,TextInput , StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { TouchableOpacity} from 'react-native-gesture-handler'
import {gray , green} from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'

class AddCard extends React.Component{
    static navigationOptions=()=>{
        return {title : 'Add Card'}
    }
    state = {
        question : '',
        answer : ''
    }

    handleSubmitCard(deck){
        const {question , answer } = this.state
        if(question === '' || answer === ''){
            alert(`Question and answer are required!!! `)
        }
        else{
                      // add card to deck (redux)
            this.props.dispatch(addCard(deck.title , question , answer))
                       // add card to deck (AsyncStorage)
            addCardToDeck(deck.title ,{question ,answer})
                      // navigate back to deck view
            
            this.props.navigation.navigate('Deck View' , {deckName : deck.title} )
                    // reset value of question and answer for next use
            this.setState({
            question : '',
            answer : ''
            })
        }
              
    }

    render(){
        const {deck} = this.props.route.params
        this.props.navigation.setOptions({
            title : `Add Card    ${deck.title}`
        })
        const { question , answer } = this.state
        return(
            <KeyboardAvoidingView keyboardVerticalOffset={80} style={styles.container}>
                <Text style={styles.title}>What is the question? </Text>
                <TextInput style={styles.input}
                    value={question}
                    placeholder={' Question'} 
                    onChangeText={(text) => this.setState({question : text})}/> 

                <Text style={styles.title}>What is the correct answer? </Text>
                <TextInput style={styles.input}
                    value={answer}
                    placeholder={' Answer'} 
                    onChangeText={(text) => this.setState({answer : text})}/>     

                <TouchableOpacity style={styles.btn} 
                  onPress={() => this.handleSubmitCard(deck)}>
                    <Text style={styles.text}>Submit</Text>
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

export default connect()(AddCard);