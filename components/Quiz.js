import React from 'react'
import {View , Text , StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { red , green, gray } from '../utils/colors'
import {clearLocalNotification , setLocalNotification} from '../utils/helpers'

class Quiz extends React.Component{
    state = {
        currentQuestionIndex : 0,
        showingQuestion : true,
        correctAnswers : 0,
        showingResults : false 
    }
    toggleCase = () => {
        this.setState({
            showingQuestion : ! this.state.showingQuestion ,
        })
    }
    answerqestion = (answer) => {
        const noOfQuestions  = this.props.deck.questions.length
        const {correctAnswers , currentQuestionIndex , showingResults} = this.state
                   // at first if question didn't finish 
        if(currentQuestionIndex + 1 < noOfQuestions){
                      
                           // if answer is correct
            if(answer === 'correct'){
           
                this.setState({
                  correctAnswers : correctAnswers + 1,
                  currentQuestionIndex : currentQuestionIndex + 1,
                  showingQuestion : true,
                })
                
            }
                     // if answer is incorrect
            if(answer === 'incorrect'){
                this.setState({ 
                  currentQuestionIndex :currentQuestionIndex + 1 ,
                  showingQuestion : true,
                })
            }
        }
                  // when reach the end of questions
        else if(currentQuestionIndex + 1 === noOfQuestions){
            // if answer is correct
            if(answer === 'correct'){
           
                this.setState({
                  correctAnswers : correctAnswers + 1,
                  showingQuestion : true,
                  showingResults : true
                })
                
            }

             // if answer is incorrect
             if(answer === 'incorrect'){
                this.setState({ 
                  showingQuestion : true,
                  showingResults : true
                })
            }
                
                // clear notfication
            clearLocalNotification()
             .then(setLocalNotification);
            
        }
        
    }
    restartQuiz = () => {
        this.setState({
            currentQuestionIndex : 0,
            showingQuestion : true,
            correctAnswers : 0,
            showingResults : false 
        })
    }
    render(){
        const {title , questions} = this.props.deck
        const {currentQuestionIndex , showingQuestion, correctAnswers , showingResults} = this.state
        this.props.navigation.setOptions({
            title : `${title} quiz`
        })
        return(
           
                showingResults === false 
     ?( <View style={styles.container}>
            <View style={styles.questionContaier}>
                { showingQuestion === true
                ? <Text style={styles.QA}>
                        Q{currentQuestionIndex+1}.{questions[currentQuestionIndex].question}
                </Text>
                :  <Text style={styles.QA}>
                        A{currentQuestionIndex+1}.{questions[currentQuestionIndex].answer}
                </Text>
                }
                
                <TouchableOpacity 
                    onPress={this.toggleCase} >
                    <Text style={{fontSize:17,marginBottom:20 , color:red}}>
                        {showingQuestion === true ? 'Show Answer' : 'Show Question'}
                    </Text>
                        
                </TouchableOpacity>
            </View>
               
                {/* // indicator of no of questions */}
            <Text style={{marginBottom:10,fontWeight:'bold'}}>
                {`${(questions.length) - (currentQuestionIndex+1) } remaining questions `}
            </Text>
    
                   {/* correct Answer button */}
            <TouchableOpacity style={[styles.btn , {backgroundColor: green}]}
                onPress={() => this.answerqestion('correct')}
                >
                 <Text style={styles.text}>Correct</Text>
            </TouchableOpacity>
                      {/* Incorrect Answer button */}
            <TouchableOpacity style={[styles.btn , {backgroundColor: red}]}
                onPress={() => this.answerqestion('incorrect')} 
                >
                 <Text style={styles.text}>InCorrect</Text>
            </TouchableOpacity>
                     {/* restart quiz button */}
            <TouchableOpacity style={styles.btn}
                 onPress={this.restartQuiz} >
                 <Text style={styles.text}>Restart Quiz</Text>
            </TouchableOpacity>
        </View> 
     ) 
     : (
         <View style={[styles.container , {justifyContent : 'center'}]}>
            
             <Text style={styles.QA}>
                 Your result is {(Math.ceil((correctAnswers / questions.length) * 100))} %
             </Text>
             <TouchableOpacity style={[styles.btn , {backgroundColor: green}]}
                 onPress={this.restartQuiz} >
                 <Text style={styles.text}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn , {backgroundColor: green}]}
                 onPress={() => this.props.navigation.goBack()} >
                 <Text style={styles.text}>Go Back</Text>
            </TouchableOpacity>
         </View>
     )
            
                
                
         
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      questionContaier:{
          width : 300,
          height:200,
          margin:20,
          padding : 10,
          marginTop : 30,
         backgroundColor:gray,
         alignItems: 'center',
         justifyContent: 'center',
      },
       btn :{
           justifyContent : 'center',
           alignItems : 'center',
           width: 250,
           padding:10,
           marginTop:10,
           marginBottom:10,
       },
       text:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign:'center' ,
       },
       QA:{
           fontSize : 27,
           textAlign:'center',
           paddingBottom:20,
       }
})

function mapStatesToPros( decks , {route} ){
    const {deckName} = route.params
    return{
        deck : decks[deckName]
    }

}
export default connect(mapStatesToPros)(Quiz);