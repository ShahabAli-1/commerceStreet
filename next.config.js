// module.exports = {
//   images: { domains: ["links.papareact.com", "fakestoreapi.com"] },
// };

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        pathname: "**",
      },
    ],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
