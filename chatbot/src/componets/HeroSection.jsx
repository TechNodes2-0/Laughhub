import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";

const HeroSection = () => {
  return (
    <div>
      <section className="bg-center bg-no-repeat bg-[url('https://wallpaperset.com/w/full/3/1/f/31419.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome to ultimate bot you can get everything to anything
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Get ready to laugh out loud with The ultimate BOT - the perfect
            companion for your daily dose of humor!
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              to="/Main"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Start Meme BOT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
