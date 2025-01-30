<script>
    let year = new Date().getFullYear();
</script>

<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }
    header {
        background-color: #333;
        color: white;
        padding: 1rem;
        text-align: center;
    }
    nav {
        display: flex;
        justify-content: center;
        background-color: #333;
    }
    nav a {
        color: white;
        padding: 1rem;
        text-decoration: none;
    }
    nav a:hover {
        background-color: #ddd;
        color: black;
    }
    main {
        padding: 2rem;
    }
    footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
        width: 100%;
        bottom: 0;
    }
</style>

<header style="display: flex; justify-content: space-between; align-items: center; padding: 1rem;">
    <div style="display: flex; align-items: center;">
        <img src="/HarvestaLogo.png" alt="Harvesta Foods Logo" style="height: 50px; margin-right: 1rem;">
        <div>
            <h1 style="margin: 0;">Harvesta Foods</h1>
            <p style="margin: 0;">Your local grocery store chain</p>
        </div>
    </div>
    <nav style="display: flex;">
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
    </nav>
</header>

<main>
    <section id="home" style="display: flex; align-items: center; background-color: #f5e6cc; padding: 2rem;">
        <img src="/ManByBananas.jpg" alt="Harvesta Foods" style="width: 50%; height: auto; margin-right: 2rem;">
        <div style="width: 50%;">
            <h1 style="margin: 0; font-size: 3rem; font-weight: bold;">Welcome to Harvesta Foods</h1>
            <p style="margin: 0;">We are committed to providing the freshest and highest quality products to our customers.</p>
        </div>
    </section>

    <section id="about" style="display: flex; align-items: center; padding: 2rem;">
        <div style="width: 50%;">
            <h2 style="font-size: 2rem; font-weight: bold;">About Us</h2>
            <p>Harvesta Foods has been serving the community for over 20 years. We pride ourselves on our customer service and our wide selection of products.</p>
        </div>
        <img src="/PineappleGirl.jpg" alt="About Us" style="width: 50%; height: auto; margin-left: 2rem;">
    </section>

    <section id="products" style="display: flex; align-items: center; padding: 2rem;">
        <img src="/BrightProduce.jpg" alt="Harvesta Foods" style="width: 50%; height: auto; margin-right: 2rem;">
        <div style="width: 50%;">
            <h2 style="font-size: 2rem; font-weight: bold;">Our Products</h2>
            <p>We offer a variety of products including fresh produce, dairy, meats, and more. Visit our stores to see our full selection.</p>
        </div>
    </section>

    <section id="contact" style="display: flex; align-items: center; padding: 2rem;">
        <div style="width: 50%;">
        <h2 style="font-size: 2rem; font-weight: bold;">Contact Us</h2>
        <p>If you have any questions or feedback, please feel free to reach out to us at contact@harvestafoods.com.</p>
    </div>
    <img src="/CorporateHQ.jpg" alt="About Us" style="width: 50%; height: auto; margin-left: 2rem;">
    </section>
</main>

<footer>
    <p>&copy; {year} Harvesta Foods. All rights reserved.</p>
</footer>