<script lang="ts">
  import Header from './header.svelte';
</script>

<svelte:head>
  <title>{import.meta.env.VITE_APP_TITLE}</title>
</svelte:head>

<div class="container">
  <Header />
  <slot />
</div>

<style>
  :root {
    --font-size: 17px;
    --primary-color: #fff9e6;
    --secondary-color: #fcdf79;
    --tertiary-color: #4d4d4d;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--tertiary-color);
    color: var(--primary-color);
    font-family: 'Trebuchet MS', Arial, Tahoma;
    font-size: var(--font-size);
  }
  :global(a) {
    color: var(--secondary-color);
  }
  .container {
    margin: auto;
    margin-top: 2em;
    width: 100%;
    max-width: 1024px;
    /* this is an approximate subtraction */
    height: calc(100vh - 2em - 2em - 1em - 2em - 4em);
  }
</style>
