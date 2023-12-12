import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import React from "react";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  image,
  description,
  rating,
  category,
  hasPrime,
}) => {
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

  const removefrombasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>
        <p>
          <strong>${price}</strong>
        </p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemtoBasket} className="button mt-auto">
          Add to Basket
        </button>
        <button onClick={removefrombasket} className="button mt-auto">
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
