import { AsyncStorage } from 'react-native'
import {initialDecks} from './helpers'


export const FLASHCARD_STORAGE_KEY = "Udacity:FlashCards"

export function getDecks(){
     return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(data =>{
        if (data === null) {
            
            AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(initialDecks))
            return initialDecks
        }
        else {
            return JSON.parse(data)
            
        }
      })
}

export function saveDeckTitle(deck){
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY , JSON.stringify({
        [deck.title]: deck
    }))
}

export function addCardToDeck(title , {question , answer}){
       
    const card = { question,answer}
    
     AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
      .then(results => {
           const data = JSON.parse(results)
        if(data !== null && data[title]) {
            
             data[title].questions.push(card)
             
         return  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
             
          }
        
        else {
          AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(initialDecks))
           
           initialDecks[title].questions.push(card) 
            
           AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(initialDecks))
        }
         
      })      
}

