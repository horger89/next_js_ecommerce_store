import React from "react";
import Link from "next/link";
import { urlFor } from "@/lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="center">
        <Link href={`/product/${product}`}>
          <img
            src={urlFor(image)}
            alt="banner-image"
            className="hero-banner-image"
          />
        </Link>
      </div>
      {/*<p className="beats-solo">{heroBanner.smallText}</p>*/}
      <h3>{midText}</h3>
      <h1>{largeText1}</h1>
    </div>
  );
};

export default FooterBanner;
