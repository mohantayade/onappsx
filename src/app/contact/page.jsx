import React from 'react'

function contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-600">
          We'd love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
        <p className="mt-4 text-lg text-gray-600">
          You can reach us through the following channels:
        </p>
        <ul className="mt-4 text-lg text-gray-600 list-disc list-inside">
          <li className='text-wrap'>Email: <a href="mailto:mohantayadeofficial@gmail.com" className="text-blue-600 text-sm sm:text-xl">mohantayadeofficial@gmail.com</a></li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Follow Us</h2>
        <p className="mt-4 text-lg text-gray-600">
          Stay connected with us on social media for the latest updates:
        </p>
        <ul className="mt-4 text-lg text-gray-600 list-disc list-inside">
          <li>Twitter: <a href="https://twitter.com/onappx" className="text-blue-600">@OnAppx</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/company/onappx" className="text-blue-600">OnAppx</a></li>
          <li>Facebook: <a href="https://facebook.com/onappx" className="text-blue-600">OnAppx</a></li>
        </ul>
      </div>

     
    </div>
  )
}

export default contact