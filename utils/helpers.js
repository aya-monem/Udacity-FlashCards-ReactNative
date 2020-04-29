import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

export function createRandomId(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    
export const initialDecks = {
  Capitals : {
        id : createRandomId(),
        title: 'Capitals',
        questions: [
          {
                question: 'What is the capital of Italy?',
                answer: 'Rome'
          },
          {
                question: 'What is the capital of France?',
                answer: 'Paris'
          },
          {
                question: 'What is the capital of Egypt?',
                answer: 'Cairo'
          },
          {
                question: 'What is the capital of Spain?',
                answer: 'Madrid'
          },
          {
                question: 'What is the capital of Russia?',
                answer: 'Moscow'
         },
        ]
    },
  React: {
        id : createRandomId(),
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
   Hello: {
        id : createRandomId(),
        title: 'Hello',
        questions: [
            {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
}

const NOTIFICATION_KEY = 'UdaciFlashCards:notifications'

        // crate the notification itself (returnan object)
  function createNotification() {
    return {
      title: 'Ready for Quiz ;)',
      body: "👋 don't forget your daily quiz!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }
            // clear notification
  export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }