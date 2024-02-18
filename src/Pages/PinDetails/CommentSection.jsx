import React from 'react'
import { useState, useEffect } from 'react'
import { addDoc, collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { getUserAuthenticate } from '../../Utils/Context'
import { db } from '../../Utils/FirebaseConfig'

const CommentSection = ({pinDetails}) => {
    const [commentInput, setcommentInput] = useState('')
    const [comment, setComment] = useState([])
    const { User, userDetails, fetchData } = getUserAuthenticate()
    // console.log(pinDetails.userId)

    useEffect(() => {
        // if (pinDetails.userId) {
            getMsgs()
        // }
        
        
        
    }, [pinDetails.userId]);
    const getMsgs = async () => {
        try {
            const commRef = query(collection(db, 'comments'), where('pinId', '==', pinDetails.userId))
        // const querySnapshot = await getDocs(commRef);

         const unsubscribe = onSnapshot(commRef, (snapshot) => {
                let commMess = []
                snapshot.forEach((doc) => {
                    commMess.push({...doc.data(), id:doc.id})
                })
                setComment(commMess);
                console.log(comment)
            })
            return () => unsubscribe();
        } catch (error) {
            console.error(error)
        }
    }
  
    const addComment = async () => {
        try {
            const commRef = collection(db, 'comments')
            await addDoc(commRef, {
                comment:commentInput,
                commentBy: userDetails?.UsernameInput,
                pinId:pinDetails.userId
            })
            const queryRef = query(collection(db, 'comments'), where('pinId', '==', pinDetails.userId))
            // const querySnapshot = await getDocs(commRef);
    
             const unsubscribe = onSnapshot(queryRef, (snapshot) => {
                    let commMess = []
                    snapshot.forEach((doc) => {
                        commMess.push({...doc.data(), id:doc.id})
                    })
                    setComment(commMess);
                    console.log(comment)
             })
             console.log('comment sent')

                return () => unsubscribe();
        } catch (error) {
            console.error(error)
        }
       
    }
  return (
      <div className='flex flex-col'>
          <h3>CommentSection</h3>
          {comment.map((msg) => {
              return <span>{msg.comment}</span>
          })}
          <input className='mt-5' onChange={(e) => { setcommentInput(e.target.value) }} type="text" placeholder='comment here' />
          <button className='p-4 bg-black text-white' onClick={addComment}>add comment</button>
    </div>
  )
}

export default CommentSection
