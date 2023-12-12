import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

export default function Home({ products }) {
  // console.log(products);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Streets Commerce</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const products = await fetch("https://fakestoreapi.com/products").then(
//     (res) => res.json()
//   );
//   const session = await getSession(context);

//   // console.log(products);
//   return {
//     props: {
//       products: products,
//       session: session,
//     },
//   };
// }

export async function getServerSideProps(context) {
  const products = await fetch("https://dummyjson.com/products").then((res) =>
    res.json()
  );
  // console.log(products);
  const session = await getSession(context);

  // console.log(products);
  return {
    props: {
      products: products,
      session: session,
    },
  };
}
