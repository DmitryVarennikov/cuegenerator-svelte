<script context="module" lang="ts">
  import { onMount } from 'svelte';
  import { apiCueCounterStore } from '../stores';
  import { apiService } from '../services';
</script>

<script lang="ts">
  onMount(async () => {
    const counter = await apiService.getCounter();
    apiCueCounterStore.set(counter);
  });
</script>

<div class="grid">
  <a href="/"><img src="images/CUEgenerator.png" alt="Cuegenerator logo" /></a>
  <div title="cues-counter">{$apiCueCounterStore}</div>
  <div style="text-align: right">
    <a href="https://github.com/DmitryVarennikov/cuegenerator-svelte" target="_blank" rel="noreferrer">
      Leave your feedback on GitHub
    </a>
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 217px 1fr 1fr;
  }
</style>
