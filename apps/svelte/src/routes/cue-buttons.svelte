<script lang="ts">
  import { cueStore } from '../stores';
  import { makeCueFileName } from '../utils';

  let cue = '';
  let fileName = '';
  cueStore.subscribe((state) => {
    if (!state) return;
    const { input, output } = state;
    cue = output.cue;
    fileName = input.fileName;
  });

  const saveCueAsFile = (cue: string, fileName: string) => {
    const blob = new Blob([cue], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = makeCueFileName(fileName);
    a.click();
  };

  const onSaveCueToFileClick = () => saveCueAsFile(cue, fileName);
</script>

<input
  type="button"
  on:click={onSaveCueToFileClick}
  disabled={!cue}
  value="Save Cue to file"
  class="btn btn-save-cue"
/>
<input type="button" on:click={() => alert('Load my prev Cue!')} value="Load my prev Cue" class="btn btn-load-cue" />
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
