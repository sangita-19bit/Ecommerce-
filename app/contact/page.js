'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="pb-20">
      {/* Contact Header */}
      <section className="relative bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading text-primary mb-6 animate-fade-in-up">
            Get In Touch
          </h1>
          <p className="text-lg text-foreground max-w-3xl mx-auto animate-fade-in">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-heading text-primary mb-8">Send us a message</h2>
            
            {submitMessage && (
              <div className="bg-secondary/20 border border-secondary text-primary p-4 rounded-lg mb-6">
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-vertical"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="animate-fade-in">
            <h2 className="text-3xl font-heading text-primary mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Botanical Lane<br />
                    Nature Valley, NV 12345<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Call Us</h3>
                  <p className="text-gray-600">
                    +1 (555) 123-4567<br />
                    Mon - Fri: 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
                  <p className="text-gray-600">
                    hello@swanbotanicals.com<br />
                    support@swanbotanicals.com
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-12 bg-cream p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-4">Business Hours</h3>
              <div className="space-y-2 text-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-sage py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading text-white mb-6 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto animate-fade-in">
              Find answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Are your products suitable for sensitive skin?",
                answer: "Yes, all our products are formulated with gentle, natural ingredients suitable for sensitive skin. We recommend doing a patch test before first use."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Currently, we ship within the United States. We're working on expanding our shipping options to serve customers internationally."
              },
              {
                question: "How long do your products last?",
                answer: "Our products have a shelf life of 12-18 months when stored properly. Each product has an expiration date printed on the packaging."
              },
              {
                question: "Are your products cruelty-free?",
                answer: "Absolutely! We are committed to cruelty-free practices and never test on animals. We're certified by Leaping Bunny."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg animate-fade-in-up">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-white/90">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
