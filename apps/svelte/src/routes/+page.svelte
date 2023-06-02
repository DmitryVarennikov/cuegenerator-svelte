<script lang="ts">
  import type { CueState } from '../types';
  import CueButtons from './cue-buttons.svelte';
  import Form from './form.svelte';

  let cueState: CueState | undefined;
  const onLoadPrevCue = (e: CustomEvent<CueState>) => (cueState = e.detail);
</script>

<CueButtons on:onLoadPrevCue={onLoadPrevCue} />
{#if cueState}
  <Form {...cueState.input} />
{:else}
  <Form />
{/if}
