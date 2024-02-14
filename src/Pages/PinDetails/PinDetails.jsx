import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserAuthenticate } from '../../Utils/Context';

const PinDetails = () => {
    const {getPostDetails, pinDetails} = getUserAuthenticate()
    let { id } = useParams();
    // console.log(id)
    // let param = useParams()

  // Convert id to a number if needed
//   let numberWithoutColon = parseInt(id, 10);
    //   console.log(numberWithoutColon);
    useEffect(() => {
        console.log("Component mounted");
      
        getPostDetails(id).then(() => {
          console.log("Updated pinDetails:", pinDetails);
        });
      
      }, []); // Empty dependency array to run the effect only once on mount
      
    

  return (
      <div>
          <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure><img src={pinDetails.photo} alt="image"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default PinDetails;
