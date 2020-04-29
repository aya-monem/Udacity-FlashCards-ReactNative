import {RECEIVE_DECKS, ADD_DECK , ADD_CARD} from '../actions'



export default function decks(state = {} , action){
    switch(action.type){
        case RECEIVE_DECKS :
           
            return {
               ...state,
               ...action.decks
            }

        case  ADD_DECK :
        
            return{
                ...state,
                [action.title]:{
                    id: action.id,
                    title:[action.title],
                    questions : []
                }
            }

        case ADD_CARD :
           
            return {
                ...state,
                ...action.decks,
                [action.title]:{
                    ...state[action.title],
                    questions:[
                        ...state[action.title].questions,
                        {
                            question : action.question,
                            answer : action.answer
                        }   
                    ]
                }
            }

        default :
            return state
    }
}