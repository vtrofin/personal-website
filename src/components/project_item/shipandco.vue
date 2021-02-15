<template>
  <div class="project-content" tabindex="0">
    <h2>The product</h2>
    <p>
      Ship&co evolved from a pet project into a fully fledged multilingual SaaS tool used by online
      sellers worldwide to compare shipping rates, create shipping labels and manage order
      fulfillment on e-commerce platforms.
    </p>
  </div>
  <ProjectImage
    alt-text="shipandco orders page view"
    url="/shipandco_orders.png"
    caption="Ship&co imports orders from users' ecommerce platforms"
  />
  <div class="project-content" tabindex="0">
    <p>
      It supports all major international carriers such as DHL, Fedex, UPS. It is the only app of
      this kind that supports Japanese domestic carriers - Sagawa, Yamato, Seino. It supports all
      major e-commerce platforms, both Japanese and international, such as Shopify, eBay, Amazon,
      Etsy, and Base.
    </p>
    <p>
      It’s built on top of Meteor, a full-stack javascript framework, features a MongoDB cloud
      database instance and exposes its own REST API endpoints for bulk shipping.
    </p>
  </div>
  <ProjectImage
    alt-text="shipandco order page detailed view with rates displayed"
    url="/shipandco_order_rates.png"
    caption="Ship&co makes it easy to choose the cheapest/ fastest shipping method"
  />
  <div class="project-content" tabindex="0">
    <br />
    <h2>Contribution</h2>
    <p>
      As a growing app, Ship&co constantly requires enhancements and new features to adapt to
      customer’s changing needs. I’ve worked on all sides of the app on tasks ranging from the
      smallest bug fixes to major feature releases. Some of my major contributions include:
    </p>
    <ul class="content-list">
      <li>
        Integrate QuickBook Commerce platform into Ship&co using the official REST API. The main
        difficulty that I had to overcome was a tight API requests limit coupled with a relative
        high number of API requests needed to retrieve order data. I ended up creating a queue to
        throttle API requests based on each store’s API limits and processed requests.
      </li>

      <li>
        Integrate DHL eCommerce Japan, Singapore and Malaysia carrier APIs into Ship&co. The task
        required making customizations to the app’s workflow to enable printing of return labels,
        pick-ups and voiding labels.
      </li>

      <li>
        Enhancements for the DHL XML API integration. DHL is the most popular international carrier
        in Ship&Co and I am the go-to person for feature request related to this API. Just to
        mention a few, I've implemented the electronic invoice flow, return labels and pick-ups.
      </li>

      <li>
        Schedule parcel pick-ups in Ship&co. This is a major feature release, unifying into a single
        section carriers offering shipping reports (e.g. Japan Post) with carriers offering pick-up
        scheduling through their api (DHL). This task allowed me to introduce modern CSS features
        such as css grid at the font-end.
      </li>

      <li>
        Pricing strategy: as more customers required it, we transitioned to a subscription based
        pricing strategy using the Stripe API. I was in charge with building the UI that supports
        monthly subscriptions while retaining existing pay-as-you-go plans.The main challenge for
        this task was a tight deadline coupled with changing specifications mid-project. This turned
        into a very good opportunity for me to deep dive into the back-end side of this feature to
        address a set of bugs that were affecting the correct billing of customers. e.g. users not
        billed properly for their usage, manage user re-subscribing.
      </li>

      <li>
        Implement GDPR requirements. This feature entails adding user data exportation endpoints and
        deleting of user data. The main challenge for this task was the large amounts of user data
        that can be queried and exported at once. To overcome this I used node streams to query and
        format the data and I implemented an async queue combined with Sendgrid transactional emails
        to notify users of the progress. e.g. send emails with a download link once the user data
        has been uploaded to the Google cloud. Another challenge was a broken queue in the package
        used to compress the data, which required me to build a custom queue by sequencing data
        streams.
      </li>
      <li>
        Currently preparing the complete rewrite and transition of the app from Meteor JS to Vue3 +
        Fastify.
      </li>
    </ul>
    <p>
      Major logistics APIs I worked with: DHL, FedeEx, UPS, DHL eCommerce, Sagawa, Yamato, and Japan
      Post.<br /><br />Major ecommerce APIs I worked with include: Shopify, eBay, Prestashop,
      WooCommerce, QuickBooks Commerce, Base, Next Engine, ColorMe and Yahoo! Shoppping Japan.
    </p>
  </div>

  <ProjectImage
    alt-text="shipandco shipment label detail view"
    url="/shipandco_label.png"
    caption="Ship&co makes it easy to print shipping labels"
  />
  <div class="project-content" tabindex="0">
    <ProjectSummary :modifier="$props.modifier" :options="summary" />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';

export default {
  name: 'ShipandcoContent',
  components: { ProjectSummary, ProjectImage },
  props: {
    modifier: { type: String, required: false, default: '' }
  },
  setup() {
    const summary = {
      position: 'Web engineer',
      organization: 'Bertrandco',
      work: ['Full-stack dev'],
      stack: ['Handlebars', 'Meteor', 'Express', 'MongoDB'],
      years: '2018 –'
    };

    return { summary };
  }
};
</script>
