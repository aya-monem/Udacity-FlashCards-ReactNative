 ### About the application
This application allows users to study collections of flashcards.
 It allows users to create different categories of flashcards called "decks",
  add flashcards to those decks, then take quizzes on those decks.

 ### Specification
this project created using (create-react-native-app). 

It meets specification provided in this rubric ( https://review.udacity.com/#!/rubrics/1021/view ).

 ### Data
I use ( AsyncStorage ) to store decks and flashcards.
 All decks data will be managed using object similar to this : 

        {
        React: {
            title: 'React',
            questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
            {
                question:'What is a closure?',
                answer:'The combination of a function and the lexical environment within which that function was declared.'
            }
            ]
        }
        }
                  ############# NOTE ###########
To manage  AsyncStorage database, i create four different helper methods.

## getDecks: return all of the decks along with their titles, questions, and answers.
## saveDeckTitle: take in a single title argument and add it to the decks.
## addCardToDeck: take in two arguments, title and card, 
and will add the card to the list of questions for the deck with the associated title.

### Installation 
To run this project locally, clone this repository or download it, then run the following commands:

 npm install 
 npm start 
NOTE:The app have been tested on Android device