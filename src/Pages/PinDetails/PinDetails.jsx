import React from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserAuthenticate } from "../../Utils/Context";
import Navbar from "./Navbar";
import CommentSection from "./CommentSection";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import toast, { Toaster } from 'react-hot-toast';



const PinDetails = () => {
  const {
    getPostDetails,
    pinDetails,
    getSimilarPins,
    similarPosts,
    fetchData,
    userDetails,
    saveApin
  } = getUserAuthenticate();
  let { id } = useParams();
  // console.log(pinDetails)
  // console.log(id)
  // let param = useParams()
  const [trigger, setTrigger] = useState(true)
  function toggleBoolean() {
    setTrigger(!trigger)
  }
  const handleEffect = () => {
    getPostDetails(id);
    getSimilarPins(pinDetails.category);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
      handleEffect()
  }, [trigger]);

 

  return (
    <div>
      <Navbar />
      {/* <button onClick={getSimilarPins(pinDetails.category)}>test btn</button> */}
      <div className="p-4">
        <div className="card lg:card-side bg-base-100 shadow-xl md:w-3/4 m-auto">
          <figure>
            <img className="" src={pinDetails.photo} alt="image" />
          </figure>
          <div className="card-body">
            <div className=" sm:p-4 md:p-10 flex items-center justify-between gap-12">
              <div className="avatar placeholder flex items-center gap-2">
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
                    <Link className=" relative bg-gray-400 w-20 h-20" to={`/otheruserprofile/${pinDetails.userId}`}>
                      <span className="uppercase text-lg absolute top-2 left-4 ">
                      {pinDetails?.postedBy?.[0] ?? ''}
                      </span>
                    </Link>
                  </div>
                )}
                <span>{pinDetails.postedBy}</span>
              </div>
              
              <button onClick={()=>{saveApin(pinDetails)}} className="bg-red-500 rounded-2xl text-white w-30 p-4">save</button>
            </div>
            <div className="sm:mx-10">
              <div>
                <p>{pinDetails.postInput}</p>
              </div>
              <div className="bg-gray-200 w-20 p-2 rounded-full mt-4">
                <span className="flex items-center justify-center">
                  {pinDetails.category}
                </span>
              </div>
            </div>
            <CommentSection pinDetails={pinDetails} />

          </div>

        </div>

        <div className="mt-10">
          <span className="text-3xl">More to Explore</span>

          <div className="mt-5">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
      <Masonry>
            {similarPosts.map((items) => {
              return <div onClick={() => {
                getPostDetails(id);
                toggleBoolean()
                // trigger ? false : true
              }} className="masonry-item mx-1 my-0 md:my-2 relative p-1">
                  <Link to={`/home/pindetails/${items.id}`}>
                  <img className="w-full rounded-xl" src={items.photo} alt="image" />
                  </Link>
                </div>
              
            })}
            </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PinDetails;
