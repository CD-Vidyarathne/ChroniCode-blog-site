import React from "react";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 mt-8">
      <div className=" rounded-lg shadow-lg p-8">
        <h1 className="text-6xl font-bold text-center  mb-6 text-info">
          About Us
        </h1>
        <p className="text-lg  leading-7">
          Welcome to{" "}
          <span className="font-semibold text-primary">ChroniCode</span>, your
          go-to platform for insightful blogs and a community of passionate
          developers and readers. Our mission is to empower individuals by
          sharing knowledge, sparking discussions, and fostering learning
          through high-quality content.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-accent">Our Vision</h2>
          <p className=" leading-7 mt-2">
            We strive to create a space where creativity meets technology,
            allowing people to exchange ideas, learn from each other, and stay
            updated with the latest trends in the tech world.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-accent">What We Offer</h2>
          <ul className="list-disc pl-5 leading-7 mt-2">
            <li>
              High-quality blogs written by professionals and enthusiasts.
            </li>
            <li>Interactive discussions in the comments section.</li>
            <li>
              A platform to showcase your writing and connect with like-minded
              people.
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold text-secondary">Join Us!</h2>
          <p className=" leading-7 mt-2">
            Become a part of <span className="font-semibold">ChroniCode</span>{" "}
            today and start sharing your thoughts, exploring ideas, and
            connecting with a global audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
