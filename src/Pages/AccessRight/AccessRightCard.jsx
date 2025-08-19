import React from 'react'

const AccessRightCard = () => {
  return (
     <div className="flex justify-center items-center h-screen  from-pink-100 via-purple-100 to-indigo-100">
          <div className="bg-white shadow-xl rounded-xl bg-gradient-to-r border  border-purple-400 px-6 py-5 w-[460px]  text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-pink-600 mb-3 font-serif">
              🚫 No Access
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              You currently do not have permission to access this module.
              <br />
              Please contact your administrator or senior team members to
              request access.
              <br />
              Access rights are managed to ensure safety and confidentiality.
            </p>
          </div>
        </div>
  )
}

export default AccessRightCard