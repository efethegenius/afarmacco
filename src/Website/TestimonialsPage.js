import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { testimonials } from "./data";
import Fade from "react-reveal/Fade";

export const TestimonialsPage = () => {
  const [allTestimonials, setAllTestimonials] = useState(testimonials);
  return (
    <div className="testimonials-container">
      <Fade left>
        <h1>Testimonials</h1>
      </Fade>
      <div className="testimonials">
        {allTestimonials.map((testimonial) => {
          const { id, description, img, name } = testimonial;
          return (
            <Fade bottom>
              <div key={id} className="testimonial-wrapper">
                <p className="testimonial">"{description}"</p>
                <p className="testimonial-name">{name}</p>
                <img src={img} alt="testimonial pic" />
              </div>
            </Fade>
          );
        })}
      </div>
    </div>
  );
};
