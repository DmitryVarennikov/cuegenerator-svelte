<script lang="ts">
  import { cueGeneratorFactory } from '@cuegenerator-v2/core';

  const cueGenerator = cueGeneratorFactory();

  // import {cueGeneratorFactory} from '../../../../packages/core/build';
  const fileTypes = ['MP3', 'AAC', 'AIFF', 'ALAC', 'BINARY', 'FLAC', 'MOTOROLA', 'WAVE'];
  let cue = '';

  let state = { title: '', performer: '', fileName: '', fileType: '', trackList: '', regionsList: '' };
  const onChange = (e: Event) => {
    const target = e.target! as HTMLFormElement;
    state = { ...state, [target.name]: target.value };
  };

  console.log('cueGenerator.create(state)', cueGenerator.create(state));

  $: cue = cueGenerator.create(state);
</script>

<div class="container">
  <section class="panel panel-left">
    <label for="performer">Performer:</label>
    <input type="text" name="performer" on:keyup={onChange} id="performer" />
    <label for="title">Title:</label>
    <input type="text" name="title" on:keyup={onChange} id="title" />
    <label for="fileName">File name:</label>
    <input type="text" name="fileName" on:keyup={onChange} id="fileName" />
    <label for="fileType">File type:</label>
    <select name="fileType" id="fileType">
      {#each fileTypes as fileType}
        <option value={fileType}>{fileType}</option>
      {/each}
    </select>
    <label for="trackList">Tracklist:</label>
    <textarea name="trackList" on:keyup={onChange} id="trackList" />
    <label for="regionsList">Timings: <sup><a target="_blank" href="/help">Help</a></sup></label>
    <textarea name="regionsList" on:keyup={onChange} id="regionsList" />
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
  }
  .panel {
    display: grid;
  }
  .panel-left {
    grid-template-columns: 100px 1fr;
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
  #trackList {
    height: 300px;
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
