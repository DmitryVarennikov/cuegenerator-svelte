<script context="module" lang="ts">
  import { cueGeneratorFactory } from '@cuegenerator-v2/core';
  import { cueStore } from '../stores';
  import type { CueInputState } from '../types';

  const cueGenerator = cueGeneratorFactory();
  const fileTypes = ['MP3', 'AAC', 'AIFF', 'ALAC', 'BINARY', 'FLAC', 'MOTOROLA', 'WAVE'];
</script>

<script lang="ts">
  let state: CueInputState = {
    title: '',
    performer: '',
    fileName: '',
    fileType: fileTypes[0],
    trackList: '',
    regionsList: ''
  };
  const onChange = (e: Event) => {
    const target = e.target! as HTMLFormElement;
    state = { ...state, [target.name]: target.value };
  };

  let cue = '';
  $: {
    cue = cueGenerator.create(state);
    cueStore.set({
      input: { ...state },
      output: { cue }
    });
  }
</script>

<div class="container">
  <section class="panel panel-left">
    <label for="performer">Performer:</label>
    <!-- svelte-ignore a11y-autofocus -->
    <input type="text" name="performer" on:keyup={onChange} id="performer" autocomplete="off" autofocus={true} />
    <label for="title">Title:</label>
    <input type="text" name="title" on:keyup={onChange} id="title" autocomplete="off" />
    <label for="fileName">File name:</label>
    <input type="text" name="fileName" on:keyup={onChange} id="fileName" autocomplete="off" />
    <label for="fileType">File type:</label>
    <select name="fileType" id="fileType" on:change={onChange}>
      {#each fileTypes as fileType}
        <option value={fileType}>{fileType}</option>
      {/each}
    </select>
    <label for="trackList">Tracklist:</label>
    <textarea name="trackList" on:keyup={onChange} id="trackList" autocomplete="off" />
    <label for="regionsList">Timings: <sup><a target="_blank" href="/help" tabindex="-1">Help</a></sup></label>
    <textarea name="regionsList" on:keyup={onChange} id="regionsList" autocomplete="off" />
  </section>
  <section class="panel">
    <textarea id="cue" readonly value={cue} />
  </section>
</div>

<style>
  .container {
    margin-top: 2em;
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }
  .panel {
    display: grid;
  }
  .panel-left {
    grid-template-columns: 100px 1fr;
    grid-template-rows: repeat(4, auto) 1fr auto;
  }
  input,
  select,
  textarea {
    resize: none;
    background-color: #fff9e6;
    border: 1px solid #000;
    resize: none;
    border-radius: 0.2em;
    margin-bottom: 0.2em;
  }
  input,
  select {
    height: 1.8em;
  }
  #regionsList {
    height: 10em;
  }
  label sup {
    font-size: 0.7em;
  }
  select:focus,
  textarea:focus,
  input:focus {
    outline: none;
  }
  #cue {
    background-image: url(/images/read-only.gif);
    background-position: 50%;
    background-repeat: no-repeat;
  }
</style>
