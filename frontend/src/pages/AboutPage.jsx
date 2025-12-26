const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        About Hybah Coffee House
      </h1>

      <div className="max-w-3xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Hybah Coffee House was founded with a simple mission: to bring the finest coffee
            and dining experience to our community. We source our beans from sustainable farms
            around the world, ensuring every cup is a journey of flavor and quality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To create a warm, welcoming space where friends and families can gather, enjoy
            premium coffee, and savor delicious food made with the finest ingredients.
            We believe in quality, sustainability, and community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Quality ingredients and craftsmanship</li>
            <li>Sustainable and ethical sourcing</li>
            <li>Community focus and local partnerships</li>
            <li>Exceptional customer service</li>
            <li>Innovation in flavor and experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We're open daily from 7 AM to 9 PM. Come experience the warmth of our café,
            enjoy our signature drinks, and taste our gourmet burgers and pastries.
            We look forward to serving you!
          </p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
