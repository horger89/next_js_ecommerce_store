import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import React from "react";
import { Product } from "@/components";
import { client } from "@/lib/client";

export default function SignIn({ providers, products }) {
  return (
    <div>
      <div className="google-login">
        {Object.values(providers).map((provider) => (
          <div key={provider.classNaname}>
            <button className="loginbtn" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], products },
  };
}
