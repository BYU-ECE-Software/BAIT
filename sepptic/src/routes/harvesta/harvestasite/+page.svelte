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
        background-color: #4CAF50;
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
        position: fixed;
        width: 100%;
        bottom: 0;
    }
</style>

<header>
    <h1>Harvesta Foods</h1>
    <p>Your local grocery store chain</p>
</header>

<nav>
    <a href="#home">Home</a>
    <a href="#about">About Us</a>
    <a href="#products">Products</a>
    <a href="#contact">Contact</a>
</nav>

<main>
    <section id="home">
        <h2>Welcome to Harvesta Foods</h2>
        <p>We are committed to providing the freshest and highest quality products to our customers.</p>
    </section>

    <section id="about">
        <h2>About Us</h2>
        <p>Harvesta Foods has been serving the community for over 20 years. We pride ourselves on our customer service and our wide selection of products.</p>
    </section>

    <section id="products">
        <h2>Our Products</h2>
        <p>We offer a variety of products including fresh produce, dairy, meats, and more. Visit our stores to see our full selection.</p>
    </section>

    <section id="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, please feel free to reach out to us at contact@harvestafoods.com.</p>
    </section>
</main>

<footer>
    <p>&copy; {year} Harvesta Foods. All rights reserved.</p>
</footer>