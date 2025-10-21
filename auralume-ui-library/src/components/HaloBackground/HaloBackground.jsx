import React from 'react';
import './HaloBackground.css';

const HaloBackground = ({ children, className= "" }) => {
  return (
    <article id="wrap" className={`halo-wrap ${className}`}>
      <article id="lightings" className="halo-lightings">
        <section id="one" className="halo-section halo-one">
          <section id="two" className="halo-section halo-two">
            <section id="three" className="halo-section halo-three">
              <section id="four" className="halo-section halo-four">
                <section id="five" className="halo-section halo-five">
                </section>
              </section>
            </section>
          </section>
        </section>
      </article>
      <div className="halo-content">
        {children}
      </div>
    </article>
  );
};

export default HaloBackground;