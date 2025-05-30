import { useState } from "react";
import faqs from "../data/faqs.json";
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:text-white space-y-12 p-6">
      {/* Our Story */}
      <div className="max-w-4xl p-8 rounded-lg shadow-xl border-2 border-custom-blue">
        <h1 className="text-4xl font-bold text-center mb-8">Our Story</h1>
        <p className="text-lg leading-relaxed mb-6">
          At GHRCEM Pune, we are on a mission to transform lives through education and
          innovation. Our journey began with a vision: to create a vibrant
          community where knowledge meets creativity, and where every individual
          has the opportunity to thrive and succeed.
        </p>
        <p className="text-lg  leading-relaxed mb-8">
          Since our inception, we have been committed to excellence in
          education, research, and service. Our dedicated faculty and staff work
          tirelessly to empower our students to become leaders in their fields
          and make a positive impact on society.
        </p>
        <p className="text-lg  leading-relaxed mb-8">
          Guided by our core values of integrity, diversity, and innovation, we
          strive to foster an inclusive and supportive environment where
          everyone feels valued and inspired to pursue their passions. Together,
          we are shaping the future and creating a brighter tomorrow for
          generations to come.
        </p>
        <p className="text-lg  leading-relaxed mb-8">
          Join us as we continue our journey of discovery, growth, and
          transformation. Together, we can make a difference and build a better
          world.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl w-full p-8 rounded-lg shadow-xl border-2 border-custom-blue">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, idx) => (
            <details
              key={idx}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <summary className="cursor-pointer font-medium text-lg">
                {question}
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
