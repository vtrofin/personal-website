import type { ProjectData } from "../types";

export const shipandcoData: ProjectData = {
  slug: "shipandco",
  title: "Ship&Co",
  excerpt: "Shipping management solution for eCommerce",
  outcomeTag: "30 minutes to one click",
  accentColorToken: "--color-accent-shipandco",
  openingProblem:
    "Online sellers who ship internationally face a tedious routine: log into each carrier\u2019s website, type in package details, print a label, then go back to the sales channel to manually mark the order as fulfilled — and do it all again for the next one. And there\u2019s no way to compare prices across carriers — each one only shows its own rates, so finding the most economical option for a particular route means checking every site separately. For a seller handling dozens of orders a day, what should take a minute per order can easily take thirty.",
  narrative: [
    {
      type: "text",
      content:
        "Ship&Co collapsed that workflow into a single dashboard. It pulls orders from every connected sales channel, shows rates from all carriers side by side, and lets the seller pick the cheapest or most convenient option for that route — then prints a shipping label in one click and automatically marks the order as fulfilled. It was the only tool of its kind that also supported Japanese domestic carriers.",
    },
    {
      type: "image",
      src: "/shipandco_orders.webp",
      alt: "The orders dashboard showing incoming orders from multiple sales channels",
    },
    {
      type: "image",
      src: "/shipandco_order_rates.webp",
      alt: "Rate comparison view for a single order across available carriers",
    },
    {
      type: "text",
      content:
        "I worked across the full stack on a small team, contributing everything from bug fixes to major feature releases. The larger pieces I delivered include integrating a new commerce platform, connecting the DHL shipping API, building scheduled parcel pick-ups, transitioning billing to subscription-based pricing with Stripe, and implementing the data privacy requirements that came with serving European customers.",
    },
    {
      type: "image",
      src: "/shipandco_label.webp",
      alt: "A generated shipping label ready for printing",
    },
  ],
  stackItems: ["Handlebars", "Meteor", "Express", "MongoDB"],
  summary: {
    position: "Web engineer",
    organization: "Ship&Co",
    work: ["Full-stack dev"],
    years: "2018 – 2021",
  },
};
