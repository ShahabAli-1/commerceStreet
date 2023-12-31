import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, price, description, category, image }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useDispatch();
  const addItemtoBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      rating,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      {/* <Image
        src={image}
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
      /> */}
      <div className="flex h-56 justify-center">
        <Image
          src={image}
          height={300}
          width={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      <h4 className="my-3 line-clamp-1">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs mt-2 mb-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        {/* <Currency quantity={price} currency="GBP" /> */}
        <p>
          <strong>${price}</strong>
        </p>
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-4 mb-2">
          <img
            className="w-12"
            src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemtoBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
