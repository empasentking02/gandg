function About() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">About Gorgeous & Gleam</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            Welcome to Gorgeous & Gleam, your premier destination for exquisite jewelry and accessories. 
            We believe that every piece of jewelry tells a story, and we're here to help you find the perfect 
            pieces to express your unique.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2025, Gorgeous & Gleam was born from a passion for creating beautiful, high-quality 
            accessories that make every woman feel confident and elegant. Our carefully curated collection 
            features everything from classic pieces to contemporary designs.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Promise</h2>
          <p className="text-gray-600 mb-4">
            We are committed to providing our customers with:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Exceptional quality and craftsmanship</li>
            <li>Unique and trendy designs</li>
            <li>Outstanding customer service</li>
            <li>Fair and competitive pricing</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Visit Us</h2>
          <p className="text-gray-600">
            We'd love to help you find your perfect piece. Visit our showroom or contact us for a 
            personalized shopping experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;