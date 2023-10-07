import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      {/*<p className="beats-solo">{heroBanner.smallText}</p>*/}
      <h3>{heroBanner.midText}</h3>
      <h1>{heroBanner.largeText1}</h1>
      <div className="center">
        <Link href={`/product/${heroBanner.product}`}>
          <img
            src={urlFor(heroBanner.image)}
            alt="banner-image"
            className="hero-banner-image"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
