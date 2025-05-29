<script lang="ts">
  let year = new Date().getFullYear();
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Harvesta Foods</title>
</svelte:head>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: #333;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  .logo-title {
    display: flex;
    align-items: center;
  }
  .logo-title img {
    height: 50px;
    margin-right: 1rem;
  }
  nav {
    display: flex;
    background-color: #444;
  }
  nav a {
    color: white;
    padding: 1rem;
    text-decoration: none;
    font-weight: bold;
    white-space: nowrap;
  }
  nav a:hover {
    background-color: #ddd;
    color: black;
  }
  main {
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
  }
  section {
    margin-bottom: 4rem;
  }
  section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ccc;
    padding-bottom: .5rem;
  }
  .two-col {
    display: flex;
    flex-wrap: wrap;
  }
  .two-col > div {
    flex: 1 1 45%;
    margin: 1rem;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }
  .testimonial {
    border: 1px solid #eee;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: #fafafa;
  }
  .newsletter {
    background: #f5e6cc;
    padding: 2rem;
    text-align: center;
    border-radius: 8px;
  }
  .newsletter input[type="email"] {
    padding: .5rem;
    width: 250px;
    max-width: 100%;
    margin-right: .5rem;
    margin-bottom: .5rem;
  }
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
  }

  /* RESPONSIVE BREAKPOINTS */
  @media (max-width: 1024px) {
    .two-col > div {
      flex: 1 1 100%;
      margin: .5rem 0;
    }
  }
  @media (max-width: 768px) {
    header {
      flex-direction: column;
      text-align: center;
    }
    .logo-title {
      justify-content: center;
      margin-bottom: .5rem;
    }
    nav {
      flex-direction: column;
      width: 100%;
    }
    nav a {
      padding: .75rem;
      border-top: 1px solid #555;
    }
    .newsletter input[type="email"] {
      margin-right: 0;
    }
  }
</style>

<header>
  <div class="logo-title">
    <img src="/HarvestaLogomini.png" alt="Harvesta Foods Logo" />
    <div>
      <h1 style="margin: 0;">Harvesta Foods</h1>
      <p style="margin: 0; font-size: .9rem;">Your local grocery store chain</p>
    </div>
  </div>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About Us</a>
    <a href="#products">Products</a>
    <a href="#recipes">Recipes</a>
    <a href="#blog">Blog</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<main>
  <!-- Home -->
  <section id="home" style="background-color: #f5e6cc; padding: 2rem;">
    <div class="two-col" style="align-items: center;">
      <div>
        <img src="/ManByBananas.jpg" alt="Fresh produce display" />
      </div>
      <div>
        <h2>Welcome to Harvesta Foods</h2>
        <p>Committed to the freshest, highest-quality groceries for over 20 years. From farm to table, our locally sourced produce and artisanal products bring the best of the community to you.</p>
        <ul>
          <li>Organically grown fruits & vegetables</li>
          <li>Grass-fed dairy and meats</li>
          <li>Gluten-free and vegan-friendly options</li>
          <li>Homemade bakery and deli specials</li>
        </ul>
      </div>
    </div>
  </section>

    <!-- About -->
    <section id="about">
        <div class="two-col">
            <div>
                <h2>About Us</h2>
                <p>Harvesta Foods started in 2003 with a single market stall. Today, we’re proud to operate 12 locations across the region, supporting local farmers, small-batch producers, and sustainable practices.</p>
                <p>Our mission:</p>
                <blockquote style="margin:1rem 0; padding:1rem; background:#fafafa; border-left:4px solid #ccc;">
                    To nourish our community with honest food, foster local partnerships, and promote a healthy lifestyle for all.
                </blockquote>
            </div>
            <div>
                <img src="/PineappleGirl.jpg" alt="Team picking produce" style="width:100%; border-radius:8px;">
            </div>
        </div>
    </section>

    <!-- Products -->
    <section id="products">
        <h2>Our Products</h2>
        <div class="two-col">
            <div>
                <img src="/BrightProduce.jpg" alt="Colorful produce" style="width:100%; border-radius:8px;">
            </div>
            <div>
                <p>From farm-fresh fruits and vegetables to a curated selection of dairy, meats, and pantry staples—explore our departments:</p>
                <ul>
                    <li>Produce & Herbs</li>
                    <li>Deli & Bakery</li>
                    <li>Meat & Seafood</li>
                    <li>Bulk Grains & Nuts</li>
                    <li>Organic & Specialty</li>
                </ul>
                <p><em>Tip:</em> Join our loyalty program for exclusive discounts and early access to seasonal items!</p>
            </div>
        </div>
    </section>

    <!-- Recipes (needs images: swap in real food shots) -->
    <section id="recipes">
        <h2>Recipe Ideas</h2>
        <div class="two-col">
            <div class="recipe-card">
                <img src="/Salad.jpg" alt="Colorful quinoa salad" style="width:80%; border-radius:8px;">
                <h3>Summer Quinoa Salad</h3>
                <p>A light, protein-packed mix of quinoa, fresh berries, mint, and a zesty vinaigrette.</p>
                <a href="/recipes/quinoa-salad">View full recipe →</a>
            </div>
            <div class="recipe-card">
                <img src="/Soup.jpg" alt="Hearty vegetable soup" style="width:80%; border-radius:8px;">
                <h3>Hearty Veggie Soup</h3>
                <p>Warm up with seasonal roots, herbs, and our homemade vegetable broth.</p>
                <a href="/recipes/veggie-soup">View full recipe →</a>
            </div>
        </div>
        <p><em>Note:</em> You’ll want high-quality food photos here—consider a quick photoshoot or stock-photo purchase for these dishes.</p>
    </section>

    <!-- Blog teaser -->
    <section id="blog">
        <h2>From Our Blog</h2>
        <ul style="list-style:none; padding:0;">
            <li>
                <h3><a href="/blog/farm-tour">Behind the Scenes: Our Local Farms</a></h3>
                <p>Join us on a visit to Sunnyvale Orchards, one of our partner farms.</p>
            </li>
            <li>
                <h3><a href="/blog/eating-seasonal">Why Seasonal Eating Matters</a></h3>
                <p>Learn the benefits of eating with the seasons—for health, taste, and the planet.</p>
            </li>
        </ul>
    </section>

    <!-- Testimonials (needs customer photos if possible) -->
    <section id="testimonials">
        <h2>What Our Customers Say</h2>
        <div class="testimonial">
            <p>“I love Harvesta’s weekly fruit box—it’s the freshest I’ve ever tasted!”</p>
            <p><strong>– Sarah W.</strong></p>
        </div>
        <div class="testimonial">
            <p>“The staff is so friendly, and their recipe cards at checkout are a lifesaver.”</p>
            <p><strong>– Miguel R.</strong></p>
        </div>
    </section>

    <!-- Store Locator (placeholder map) -->
    <section id="stores">
        <h2>Find a Store Near You</h2>
        <p>Enter your ZIP code to see our nearest locations:</p>
        <form>
            <input type="text" placeholder="e.g. 80202" style="padding:.5rem; width:150px;">
            <button type="submit" style="padding:.5rem 1rem;">Search</button>
        </form>
        <p style="margin-top:1rem;"><em>Map placeholder below—swap in an embedded Google Map or static image.</em></p>
        <img src="/Map.jpg" alt="Store Locator Map" style="width:100%; height:auto; border-radius:8px;">
    </section>

    <!-- Newsletter sign-up -->
    <section class="newsletter">
        <h2>Stay in the Loop</h2>
        <p>Get recipes, deals, and news straight to your inbox.</p>
        <form>
            <input type="email" placeholder="Your email address">
            <button type="submit" style="padding:.5rem 1rem;">Subscribe</button>
        </form>
    </section>

    <!-- Contact -->
    <section id="contact">
        <div class="two-col">
            <div>
                <h2>Contact Us</h2>
                <p>Questions, feedback, or custom orders? Reach us at <a href="mailto:contact@harvestafoods.com">contact@harvestafoods.com</a> or call (555) 123-4567.</p>
                <p>Follow us on social media:</p>
                <p>
                    <a href="#">Facebook</a> |
                    <a href="#">Instagram</a> |
                    <a href="#">Twitter</a>
                </p>
            </div>
            <div>
                <img src="/CorporateHQ.jpg" alt="Harvesta HQ" style="width:100%; border-radius:8px;">
            </div>
        </div>
    </section>
</main>

<footer>
    <p>&copy; {year} Harvesta Foods. All rights reserved.</p>
</footer>
