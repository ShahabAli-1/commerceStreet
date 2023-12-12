import React from "react";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import moment from "moment/moment";
import Order from "../components/Order";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Orders = ({ orders }) => {
  // console.log(Array.isArray(orders));
  // console.log(orders.length);
  const session = useSession();
  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b-2 mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session.status === "authenticated" ? (
          <h2>Orders</h2>
        ) : (
          <h2>Please Sign In to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
                key={id}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // GET THE USERS LOGGED IN CREDENTIALS
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        orders: [],
      },
    };
  }
  //   firebase db
  // const stripeOrders = await db
  //   .collection("users")
  //   .doc(session.user.email)
  //   .collection("orders")
  //   .orderBy("timestamp", "desc")
  //   .get();

  const ordersRef = collection(db, "users", session.user.email, "orders");
  const docsQuery = query(ordersRef, orderBy("timestamp", "desc"));
  const stripeOrders = await getDocs(docsQuery);

  // stripe Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
