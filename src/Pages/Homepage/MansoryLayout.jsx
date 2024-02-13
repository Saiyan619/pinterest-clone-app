import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';

const MasonryLayout = ({ children }) => {
  const masonryRef = useRef(null);

  useEffect(() => {
    const masonry = new Masonry(masonryRef.current, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true
    });

    // Cleanup Masonry instance on component unmount
    return () => {
      masonry.destroy();
    };
  }, []);

  return (
    <div className="masonry flex flex-wrap" ref={masonryRef}>
      <div className="masonry-sizer flex-basis-1/2"></div>
      {children}
    </div>
  );
};

export default MasonryLayout;
