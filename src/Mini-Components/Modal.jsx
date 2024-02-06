import React from 'react'

const Modal = ({closeModal, ModalClose}) => {
  return (
      <div className={`${closeModal ? 'hidden' : ''} bg-white w-3/4 h-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl md:w-2/4`}>
          <div className='p-4 text-center flex flex-col items-center justify-center'>
              <img src="./icons8-warning-48.png" alt="" />
              <span>Wrong or Empty Credentails. Check and 'Register' again</span>
              <button onClick={ModalClose} className="btn btn-active btn-primary mt-5">Ok</button>
      </div>
    </div>
  )
}

export default Modal
