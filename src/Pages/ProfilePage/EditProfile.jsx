import React from 'react'

const EditProfile = () => {
  return (
    <div className='p-4'>
          <h2 className='text-5xl'>Edit Profile</h2>
          <div className='mt-10'>
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Change Profile Picture</span>
  </div>
  <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
          </label>
          
          <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Change Username</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
  </div>
              </label>

              <div>
                  <button className="btn btn-active btn-primary mt-5">Update Profile</button>
</div>
          </div>
    </div>
  )
}

export default EditProfile
