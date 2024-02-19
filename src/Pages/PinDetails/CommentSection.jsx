import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection, doc, getDocs, onSnapshot, query, where, orderBy, serverTimestamp } from 'firebase/firestore'
import { getUserAuthenticate } from '../../Utils/Context'
import { db } from '../../Utils/FirebaseConfig'
import { FaTelegramPlane } from 'react-icons/fa';

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
            const commRef = query(collection(db, 'comments'), where('pinId', '==', pinDetails.userId), orderBy('createdAt', 'desc'))
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
            const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const formattedTimestamp = new Date(currentTimestamp * 1000).toLocaleString();
            await addDoc(commRef, {
                comment:commentInput,
                commentBy: userDetails?.UsernameInput,
                pinId:pinDetails.userId,
                createdAt:formattedTimestamp
            })
            const queryRef = query(collection(db, 'comments'), where('pinId', '==', pinDetails.userId), orderBy('createdAt', 'desc'))
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
      <h3 className='font-bold text-xl'>Comment</h3>
      <div className='max-h-60 overflow-scroll'>
          {comment.map((msg) => {
              return <div className='flex'>
                  <div className='flex items-center mt-5'>
                      <div>
                    {userDetails?.avatar ? (
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar z-10"
                  >
                    <Link to={`/otheruserprofile/${pinDetails.userId}`}>
                      <img
                        className="rounded-full z-50 w-12 h-12 object-cover m-auto"
                        src={userDetails?.avatar}
                        alt="profilepic"
                      />
                    </Link>
                  </div>
                ) : (
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar "
                  >
                    <Link className="rounded-full relative bg-gray-400 w-10 h-10" to={`/otheruserprofile/${pinDetails.userId}`}>
                      <span className="uppercase text-lg absolute inset-0 flex items-center justify-center">
                      {msg?.commentBy?.[0] ?? ''}
                                          </span>
                                          
                    </Link>
                  </div>
                      )}
                       </div>
                      
                       <div>
                  <span className='font-bold'>{msg.commentBy}</span>
                  <span className='ml-2'>{msg.comment}</span>
                  </div>
                  </div>
                  
                  </div>
          })}
        </div>
          <div className=' bg-gray-300 rounded-full w-full h-16 mt-4'>
              <div className=' flex items-center justify-between -mt-2'>
          <input className=' mt-5 p-2 border-black bg-transparent rounded-full transparent outline-none w-full h-full' onChange={(e) => { setcommentInput(e.target.value) }} type="text" placeholder='comment here' />
              <button className='p-4 bg-black text-white rounded-full mt-4' onClick={addComment}><FaTelegramPlane className='w-4 h-4' /></button>
              </div>
              </div>
    </div>
  )
}

export default CommentSection
