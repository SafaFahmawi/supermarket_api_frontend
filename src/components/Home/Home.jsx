import React from "react";
import EmblaCarousel from "../CarouselSlides/EmblaCarousel";
import Footer from "../Footer";
import "./Home.css";

const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const Home = () => (
  <main>
    <div>
      <EmblaCarousel slides={slides} />
    </div>

    <div id="secondSection">
      <h1>Welcome to Supermarket Website</h1>
      <p className="p">
      our website introduces an machine learning retail management system, utilizing predictive analytics for sales forecasting and association rule mining to uncover product correlations.<br/>
      </p>
      <p className="p">
      The user-friendly interface allows supermarkets to input data and gain valuable insights for optimized inventory management.
      </p>
    </div>

    <Footer />
  </main>
);

export default Home;