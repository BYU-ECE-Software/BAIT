<script>
    let name = "";
    let borderRadius = "none";
    let padding = "0.5rem 1rem";
    let border = "none";
    let currentTextColor = "black";
    let currentBackgroundColor = "var(--color-primary)";
</script>
<input bind:value={name}
       style = "
       border-radius: {borderRadius};
       padding: {padding};
       border: {border};
       color: {currentTextColor};
       background-color: {currentBackgroundColor};"
>
<p>{name}</p>