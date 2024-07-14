// Chat.js

import { GiftedChat } from 'react-native-gifted-chat'
import React, { useState, useEffect, useCallback } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { getAuth } from 'firebase/auth'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const auth = getAuth()
  const loggedUser = auth.currentUser.uid

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesFirestore = querySnapshot.docs.map((doc) => {
        const firebaseData = doc.data()

        const data = {
          _id: doc.id,
          text: firebaseData.text,
          createdAt: firebaseData.createdAt.toDate(),
          user: firebaseData.user,
        }

        return data
      })

      setMessages(messagesFirestore)
    })

    return () => unsubscribe()
  }, [])

  const onSend = useCallback(async (messages = []) => {
    const writes = messages.map((m) => addDoc(collection(db, 'messages'), m))
    await Promise.all(writes)
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: loggedUser, // Replace with the logged-in user's ID
      }}
    />
  )
}

export default Chat
