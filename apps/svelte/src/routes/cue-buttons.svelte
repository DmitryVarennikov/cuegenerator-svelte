<input type="button" on:click={() => alert('Save cue to file!')} value="Save Cue to file" class="btn btn-save-cue" />
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
