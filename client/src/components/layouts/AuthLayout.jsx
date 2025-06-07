import React from 'react'

const AuthLayout = ({ children }) => {
  return <div className='w-full min-h-screen flex items-center justify-center  flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-2/3 flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-4/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-5xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className=' md:w-9/7 p-4 md:p-10 flex flex-col justify-center items-center border rounded-2xl'>
         <div className='flex flex-col'>
              <p className='text-center text-base text-black border rounded-4xl md:p-1 p-2'>
                Keep all your credential safe.
              </p>
              { children }
            </div>
        </div>
        </div>
    </div>
};
export default AuthLayout