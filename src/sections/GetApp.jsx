import FeatureImageCard from '@/components/FeatureImageCard';
import Image from 'next/image';
import React from 'react';

const GetApp = () => {
  return (
    <section id='app' className="w-[90%] m-auto flex md:flex-row flex-col gap-10 items-center justify-evenly mt-30  ">
      <div className="md:w-[50%] w-full">
        <div className="flex flex-col w-full  ">
          <h2 className="text-5xl vodka-font md:text-7xl text-center font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Download Foodie Now
          </h2>
          <p className="text-center text-lg">
            Available on Google Play , your journey to mouth-watering
            discoveries starts here.
          </p>
        </div>
        <div className="mt-5 flex items-center justify-center gap-10">
          <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 w-fit">
            <Image src="/app1.png" width={200} height={200} alt="App preview" />
          </div>
          <div className="flex items-center justify-center rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 w-fit">
            <Image src="/app2.png" width={200} height={200} alt="App preview" />
          </div>
        </div>
      </div>
      <div>
        <FeatureImageCard
          img1="/download1.png"
          img2="/download2.png"
          alt1="Delicious Pasta"
          alt2="Tasty Dessert"
        />
      </div>
    </section>
  );
};

export default GetApp;
