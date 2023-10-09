<script context="module" lang="ts">
  import { cueStore, cueHistoryStore, apiCueCounterStore } from '../stores';
  import type { CueState } from '../types';
  import { makeCueFileName } from '../utils';
  import { createEventDispatcher } from 'svelte';
  import { apiService, analyticService } from '../services';
</script>

<script lang="ts">
  const prevCueDispatch = createEventDispatcher<{ onLoadPrevCue: CueState }>();

  let cue = '';
  let fileName = '';
  let cueState: CueState | undefined;
  let prevCueState: CueState | undefined;

  cueStore.subscribe((state) => {
    cueState = state;
    if (!state) return;
    const { input, output } = state;
    cue = output.cue;
    fileName = input.fileName;
  });
  cueHistoryStore.subscribe((cueState) => (prevCueState = cueState));

  const saveCueAsFile = (cue: string, fileName: string) => {
    const blob = new Blob([cue], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = makeCueFileName(fileName);
    a.click();
  };

  const onSaveCueToFileClick = async () => {
    saveCueAsFile(cue, fileName);
    if (cueState) {
      cueHistoryStore.set(cueState);
      analyticService.logCueFileSaved();

      const counter = await apiService.postCounter({ ...cueState.input, ...cueState.output });
      if (counter) apiCueCounterStore.set(counter);
    }
  };
  const onLoadPrevCueClick = () => {
    if (prevCueState) prevCueDispatch('onLoadPrevCue', prevCueState);
    analyticService.logPrevCueLoaded();
  };
</script>

<input
  type="button"
  on:click={onSaveCueToFileClick}
  disabled={!cue}
  value="Save Cue to file"
  class="btn btn-save-cue"
/>
<input
  type="button"
  on:click={onLoadPrevCueClick}
  disabled={!prevCueState}
  value="Load my prev Cue"
  class="btn btn-load-cue"
/>
<div class="clear" />

<style>
  .btn {
    float: right;
    padding: 0.4em 0.8em;
    font-size: var(--font-size);
    font-weight: bold;
    border: 1px solid #000;
    border-radius: 0.3em;
  }
  .clear {
    clear: both;
  }
  .btn-save-cue {
    background-color: var(--secondary-color);
  }
  .btn-load-cue {
    margin-right: 1em;
  }
</style>
