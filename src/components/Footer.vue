<template>
  <footer>
    <div class="section-header-container">
      <h2 class="section-header">Connect</h2>
    </div>
    <div class="footer-container">
      <h3 class="item-title" tabindex="0">
        Want to hire me?
      </h3>
      <p class="item-text">
        Feel free to
        <a
          class="contact-link reversed"
          href="mailto:trofin.victor@gmail?subject=Hi"
          target="_blank"
          rel="noopener"
        >
          <span>
            send me a message
          </span>
        </a>
        .
      </p>
      <ul class="thanks">
        <li>Stock photos and icons by:</li>
        <li>
          <a href="https://www.pexels.com/@vanessa-loring">Vanessa Loring</a>
        </li>
        <li>
          <a
            href="https://burst.shopify.com/@lightleaksin?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Different+Packages+Ready+To+Be+Shipped&amp;utm_medium=referral&amp;utm_source=credit"
          >
            Samantha Hurley
          </a>
        </li>
        <li>
          <a
            href="https://unsplash.com/@chuttersnap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          >
            Chuttersnap
          </a>
        </li>
        <li>
          <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
            Pixel perfect
          </a>
        </li>
        <li>Thank you very much!</li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: { modifier: { type: String, required: false, default: '' } }
};
</script>

<style>
footer {
  grid-row-start: -1;
  background: linear-gradient(39.4deg, var(--magenta) -2.55%, rgba(182, 160, 234, 0) 45.21%),
    var(--light-magenta);
  color: var(--black);
  width: 100%;
  margin-top: 2.5rem;
}
.section-header-container {
  background-color: var(--background-white);
}
footer .section-header {
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  line-height: 0.5em;
}
.footer-container {
  display: grid;
  grid-gap: 20px;
  width: 90%;
  max-width: 1280px;
  color: black;
  margin: 0 auto;
  padding: 0;
  text-align: left;
}
@media all and (min-width: 600px) {
  .footer-container {
    grid-template-columns: 5fr 1fr;
    grid-template-rows: repeat(2 auto);
    margin-bottom: 3rem;
  }
  .footer-container h3.item-title {
    grid-column: 1/2;
  }
  .footer-container p.item-text {
    grid-column: 1/2;
  }
  .thanks {
    grid-column: 2/3;
    grid-row: 1/-3;
  }
}

.footer-container h3.item-title {
  font-size: 7vmin;
  font-weight: 500;
  margin-left: 0;
  margin-bottom: 0;
  word-break: normal;
}
@media all and (min-width: 600px) {
  .footer-container h3.item-title {
    font-size: 1.8rem;
  }
}
.footer-container p.item-text {
  max-width: 100%;
  padding-bottom: 1rem;
  margin-left: 0;
  margin-bottom: 0;
  width: auto;
}

.thanks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin: 1.5rem 0;
  font-size: 0.8rem;
}

.thanks li {
  margin-top: 0.3rem;
}
.thanks li:not(:first-of-type):not(:last-of-type):not(:nth-last-of-type(2)):after {
  content: '|';
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.thanks li:first-of-type {
  font-weight: 700;
  margin-right: 0.2rem;
}
.thanks li:nth-last-of-type(2):after {
  content: '.';
  margin-left: -0.1rem;
}

.thanks li a {
  cursor: pointer;
  text-decoration: none;
  color: var(--black);
}
@media all and (min-width: 600px) {
  .thanks {
    flex-direction: column;
    flex-wrap: nowrap;
    margin-bottom: 0;
  }
  .thanks li:first-of-type {
    max-width: 100px;
  }
  .thanks li:nth-last-of-type(2):after,
  .thanks li:after {
    display: none;
  }
}
</style>
