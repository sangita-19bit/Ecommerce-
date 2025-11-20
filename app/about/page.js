import Image from "next/image";

export default function About() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading text-primary mb-6 animate-fade-in-up">
            Our Story
          </h1>
          <p className="text-lg text-foreground max-w-3xl mx-auto animate-fade-in">
            Born from a passion for nature's healing power, Swan Botanicals represents 
            the perfect harmony between botanical wisdom and modern skincare science.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-heading text-primary mb-6">
              Founded on Pure Beauty
            </h2>
            <p className="text-foreground mb-6 leading-relaxed">
              Swan Botanicals was founded in 2018 with a simple yet profound mission: 
              to harness the transformative power of botanicals in skincare. Our journey 
              began when our founder, inspired by her grandmother's herbal remedies, 
              realized that nature holds the key to radiant, healthy skin.
            </p>
            <p className="text-foreground mb-6 leading-relaxed">
              Every product in our collection is crafted with meticulous attention to 
              detail, using only the finest botanical ingredients sourced from sustainable 
              farms around the world. We believe that true beauty comes from embracing 
              nature's wisdom.
            </p>
            <p className="text-foreground leading-relaxed">
              Today, Swan Botanicals continues to grow as a testament to the power of 
              natural skincare, serving customers who value purity, sustainability, 
              and effectiveness in their beauty routines.
            </p>
          </div>
          <div className="animate-fade-in">
            <div className="bg-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-heading text-primary mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Purity</h4>
                    <p className="text-sm text-gray-600">Only the finest, cleanest ingredients</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sustainability</h4>
                    <p className="text-sm text-gray-600">Eco-friendly practices at every step</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Effectiveness</h4>
                    <p className="text-sm text-gray-600">Results you can see and feel</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex-shrink-0 mt-1 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Integrity</h4>
                    <p className="text-sm text-gray-600">Honest, transparent practices</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-sage py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading text-white mb-8 animate-fade-in-up">
            Our Mission
          </h2>
          <p className="text-white text-lg max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in">
            To create premium botanical skincare that celebrates the pure beauty of nature, 
            while promoting sustainable practices and empowering individuals to embrace 
            their natural radiance through the power of botanicals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Natural Sourcing",
                description: "We partner with sustainable farms to source the highest quality botanical ingredients."
              },
              {
                title: "Scientific Innovation",
                description: "Our products blend traditional botanical wisdom with modern skincare science."
              },
              {
                title: "Community Impact",
                description: "We support local communities and environmental conservation through our practices."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg animate-fade-in-up">
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading text-primary mb-6 animate-fade-in-up">
            Meet Our Team
          </h2>
          <p className="text-foreground max-w-2xl mx-auto animate-fade-in">
            Our passionate team of botanical experts, scientists, and artisans work 
            together to bring you the finest natural skincare experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Arijit Patra",
              role: "Founder & CEO",
              bio: "BE-CSE, Chandigarh University, 3rd year"
            },
            {
              name: "Saksham Kumar",
              role: "Co-Founder & CFO",
              bio: "BE-CSE, Chandigarh University, 3rd year"
            },
            {
              name: "Sangita Chowdhury",
              role: "Chief Botanist & COO",
              bio: "BE-CSE, Chandigarh University, 3rd year"
            }
          ].map((member, index) => (
            <div key={index} className="text-center animate-fade-in-up">
              <div className="bg-cream p-8 rounded-lg shadow-lg">
                <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-heading font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-secondary font-medium mb-4">{member.role}</p>
                <p className="text-foreground text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
