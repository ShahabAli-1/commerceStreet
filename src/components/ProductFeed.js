import React from "react";
import Product from "./Product";

const ProductFeed = ({ products }) => {
  // Check if products is an object
  if (typeof products !== "object" || products === null) {
    // console.error("Invalid products prop:", products);
    return null; // or handle the error appropriately
  }

  // Convert the object values to an array
  const productsArray = Object.values(products);
  console.log(productsArray[0]);
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {productsArray[0]
        .slice(16, 20)
        .map(({ id, title, price, description, category, thumbnail }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={thumbnail}
          />
        ))}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {productsArray[0]
          .slice(4, 5)
          .map(({ id, title, price, description, category, thumbnail }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={thumbnail}
            />
          ))}
      </div>

      {productsArray[0]
        .slice(5, 15)
        .map(({ id, title, price, description, category, thumbnail }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={thumbnail}
          />
        ))}
    </div>
  );
};

export default ProductFeed;
