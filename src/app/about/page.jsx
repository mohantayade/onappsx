import React from 'react'

function about() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900">About OnAppx</h1>
      <p className="mt-4 text-xl text-gray-600">
        Welcome to <strong>OnAppx</strong>!
      </p>
    </div>

    <div className="mt-12">
      <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
      <p className="mt-4 text-lg text-gray-600">
        At OnAppx, our mission is to connect people with the best products and innovations in the tech world. We believe in fostering a community where creators and users can engage, share insights, and help shape the future of technology.
      </p>
    </div>

    <div className="mt-12">
      <h2 className="text-3xl font-semibold text-gray-800">What We Offer</h2>
      <ul className="mt-4 text-lg text-gray-600 list-disc list-inside">
        <li>Discover New Products: Explore a curated list of the latest apps, tools, and gadgets.</li>
        <li>Community Engagement: Join discussions, leave reviews, and interact with other tech enthusiasts.</li>
        <li>Launch Your Product: Share your innovations with a wide audience and get valuable feedback.</li>
        <li>Stay Updated: Keep up with trending products and industry news.</li>
      </ul>
    </div>

    <div className="mt-12">
      <h2 className="text-3xl font-semibold text-gray-800">Why OnAppx?</h2>
      <ul className="mt-4 text-lg text-gray-600 list-disc list-inside">
        <li>User-Centric Design: Built with React and Tailwind CSS, OnAppx offers a seamless and responsive user experience.</li>
        <li>Innovative Platform: Constantly updated with the latest features to enhance your discovery and sharing experience.</li>
        <li>Supportive Community: A space where feedback is constructive and innovation is celebrated.</li>
      </ul>
    </div>

    <div className="mt-12 text-center">
      <h2 className="text-3xl font-semibold text-gray-800">Join Us</h2>
      <p className="mt-4 text-lg text-gray-600">
        Ready to dive into the world of tech products? Join OnAppx today and be part of a community that’s passionate about technology and innovation.
      </p>
      <p className="mt-4 text-lg text-gray-600">
        Stay curious, stay inspired, and keep exploring with OnAppx.
      </p>
    </div>
  </div>
  )
}

export default about