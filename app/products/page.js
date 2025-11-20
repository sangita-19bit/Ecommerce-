import Image from "next/image";

const products = [
  { name: "Chamomile Facial Oil", image: "/images/products/chamomile-oil.jpg", description: "Nourish your skin with the soothing Chamomile Facial Oil." },
  { name: "Lavender Night Cream", image: "/images/products/lavender-cream.png", description: "Experience the calming effects of our Lavender Night Cream." },
  { name: "Rose Hydrating Mist", image: "/images/products/rose-mist.jpg", description: "Revitalize your skin with our refreshing Rose Hydrating Mist." },
  { name: "Green Tea Cleanser", image: "/images/products/green-tea-cleanser.jpg", description: "Purify your skin with our gentle Green Tea Cleanser." }
];

export default function Products() {
  return (
    <div className="pb-20">
      {/* Products Header */}
      <section className="relative bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading text-primary mb-6 animate-fade-in-up">
            Our Collection
          </h1>
          <p className="text-lg text-foreground max-w-3xl mx-auto animate-fade-in">
            Discover our range of handcrafted botanical skincare products.
          </p>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 animate-fade-in-up hover:shadow-3xl duration-300 transition-transform transform hover:-translate-y-2 border border-primary/10"
            >
              <div className="w-full h-[270px] overflow-hidden rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary mt-4 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
