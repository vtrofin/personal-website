import type { ProjectData } from "../types";

export const shipandcoData: ProjectData = {
  slug: "shipandco",
  title: "Ship&Co",
  excerpt: "Shipping management solution for eCommerce",
  outcomeTag: "30 minutes to one click",
  accentColorToken: "--color-accent-shipandco",
  openingProblem:
    "Ship&co evolved from a pet project into a fully fledged multilingual SaaS tool used by online sellers worldwide to compare shipping rates, create shipping labels and manage order fulfillment on e-commerce platforms.",
  narrative: [
    {
      type: "text",
      content:
        "It supports all major international carriers such as DHL, Fedex, UPS. It is the only app of this kind that supports Japanese domestic carriers — Sagawa, Yamato, Seino. It supports all major e-commerce platforms, both Japanese and international, such as Shopify, eBay, Amazon, Etsy, and Base.",
    },
    {
      type: "text",
      content:
        "It's built on top of Meteor, a full-stack javascript framework, features a MongoDB cloud database instance and exposes its own REST API endpoints for bulk shipping.",
    },
    {
      type: "image",
      src: "/shipandco_orders.png",
      alt: "shipandco orders page view",
    },
    {
      type: "image",
      src: "/shipandco_order_rates.png",
      alt: "shipandco order page detailed view with rates displayed",
    },
    {
      type: "text",
      content:
        "I've worked on all sides of the app on tasks ranging from the smallest bug fixes to major feature releases. Major contributions include integrating QuickBook Commerce platform, DHL eCommerce carrier APIs, scheduling parcel pick-ups, transitioning to subscription-based pricing with Stripe, and implementing GDPR requirements.",
    },
    {
      type: "image",
      src: "/shipandco_label.png",
      alt: "shipandco shipment label detail view",
    },
  ],
  stackItems: ["Handlebars", "Meteor", "Express", "MongoDB"],
};
