import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserAuthenticate } from '../../Utils/Context';
import Navbar from './Navbar';

const PinDetails = () => {
    const {User, getPostDetails, pinDetails, getSimilarPins, similarPosts} = getUserAuthenticate()
    let { id } = useParams();
    // console.log(id)
    // let param = useParams()

    useEffect(() => {      
      getPostDetails(id)
      getSimilarPins(pinDetails.category)
      }, [User]); 
      
    

  return (
      <div>
      <Navbar />
      {/* <button onClick={getSimilarPins(pinDetails.category)}>test btn</button> */}
      <div className='p-4'>
          <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={pinDetails.photo} alt="image"/></figure>
  <div className="card-body">
                  <div className=' sm:p-4 md:p-10 flex items-center justify-between'>
                  <div className="avatar placeholder flex items-center gap-2">
  <div className="bg-neutral text-neutral-content rounded-full w-10 ">
                              <span className="text-2xl">D</span>
                          </div> 
                          <span>{pinDetails.postedBy}</span>
    </div>
    <button className="btn bg-red-600 text-white text-lg rounded-full md:block top-2 right-2 border-none">
  <span className="loading-spinner"></span>
  Save
            </button>
          </div>
          <div className='sm:mx-10'>
          <div><p>{pinDetails.postInput}</p></div>
          <div className='bg-gray-200 w-20 p-2 rounded-full mt-4'><span className='flex items-center justify-center'>{pinDetails.category}</span></div>
          </div>
          </div>
    </div>

      <div className='mt-10'>
          <span>More to Explore</span>
          
          <div className='flex flex-wrap gap-5'>
            {similarPosts.map((items) => {
              return <div><img className='w-80' src={items.photo} alt="" /></div>
            })}
          </div>
        </div>
          </div>
    </div>
    
  );
};

export default PinDetails;
