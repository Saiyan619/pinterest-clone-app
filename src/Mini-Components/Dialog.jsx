import React from 'react'

const Dialog = ({logoutUser}) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>Logout</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Are you sure?</h3>
    <p className="py-4">You will be exited from the app immediately</p>
    <div className="modal-action">
     
        {/* if there is a button in form, it will close the modal */}
        <button onClick={logoutUser} className="btn">Yes</button>
                      

                      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">No</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default Dialog
