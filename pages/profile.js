import React from "react";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Product } from "@/components";
import { client } from "@/lib/client";

const Profile = ({ products }) => {
  const { data: session, status } = useSession({ required: true });
  const Logout = () => {
    signOut({ callbackUrl: "https://my-ecommerce-project-gamma.vercel.app/" });
    toast.loading("Logging you out");
  };

  if (status === "authenticated") {
    return (
      <div className="center">
        <div className="profile-banner-container">
          <h1 className="profile-text">Profile Page</h1>
          <div className="profile-container">
            <div>
              <div className="image-container">
                <img src={session.user.image} className="profile-image" />
              </div>
            </div>
            <div className="product-detail-desc">
              <h4>Name</h4>
              <p>{session.user.name}</p>
              <h4>Email</h4>
              <p>{session.user.email}</p>
            </div>
          </div>
          <button className="logoutbtn" onClick={Logout}>
            Logout
          </button>
        </div>

        <div className="maylike-products-wrapper">
          <h2>Popular products</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const getServerSideProps = async (ctx) => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Profile;
