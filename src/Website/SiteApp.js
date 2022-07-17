import React from "react";
import "../Website/SiteApp.css";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { SiteBody } from "./SiteBody";
import { TestimonialsPage } from "./TestimonialsPage";

export const SiteApp = () => {
  return (
    <div className="site-app">
      <Hero />
      {/* <SiteBody /> */}
      {/* <Footer /> */}
    </div>
  );
};
