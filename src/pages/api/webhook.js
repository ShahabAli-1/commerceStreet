import { buffer } from "micro";
import * as admin from "firebase-admin";

//secure a connection to firebase from the backend
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.envFIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// establish connection to stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("fulfilling Order", session);
  // const docRef = doc(db, "users", session.metadata.email, "orders", session.id);
  // return setDoc(docRef, {
  //   amount: session.amount_total / 100,
  //   amount_shipping: session.shipping_cost.amount_total / 100,
  //   images: JSON.parse(session.metadata.images),
  //   timestamp: admin.firestore.FieldValue.serverTimestamp(),
  // }).then(() => {
  //   console.log(`Success: Order ${session.id} has been added to DB.`);
  // });

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.shipping_cost.amount_total / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} has been added to DB.`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;
    // verify that posted event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("Error constructtt", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // fulfill the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webkhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
