import React from 'react';
import { Link } from 'react-router-dom';
import { getUserAuthenticate } from '../../Utils/Context';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { HiDotsHorizontal } from 'react-icons/hi';

const Pin = () => {
  const { allPosts, saveApin } = getUserAuthenticate();
  
  return (
    <ResponsiveMasonry  columnsCountBreakPoints={{350: 2, 750: 2, 900: 3}}>
      <Masonry>
      {/* <div className="skeleton w-32 h-32"></div> */}
      {allPosts.map((item, index) => (
        <div key={index} className="masonry-item mx-1 my-0 md:my-2 relative">
         <Link to={`/home/pindetails/${item.id}`}>
            <img className="w-full rounded-lg" src={item.photo} alt="pin" />
            </Link>
          {/* <button className="absolute hidden top-2 right-2 btn btn-active bg-red-600 text-white text-lg rounded-full border-none md:block">Save</button> */}
          <button onClick={() => saveApin(item)} className="btn bg-red-600 text-white text-lg rounded-full absolute hidden md:block top-2 right-2 border-none">
  <span className="loading-spinner"></span>
  Save
</button>
          <details className="dropdown">
  <summary className=" btn p-0 bg-transparent border-none shadow-none md:p-2 md:bg-inherit md:shadow"><HiDotsHorizontal className=" text-gray-500 text-2xl cursor-pointer" /></summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <div onClick={() => saveApin(item)}><li><a>Save image</a></li></div>
    <li><a>Item 2</a></li>
  </ul>
</details>
          {/* <p className="text-sm font-medium text-gray-700">{item.postedBy}</p> */}
        </div>
      ))}
        </Masonry>
      </ResponsiveMasonry>
  );
};

export default Pin;
