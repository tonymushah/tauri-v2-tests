<script lang="ts">
	import listenStore from '$lib/utils/listenerStore';
	import { emit } from '@tauri-apps/api/event';

	const someEvent = listenStore<string | undefined>('my-event', undefined);
	let inputText = $state<string>('');
	$effect(() => {
		emit('my-event', inputText).catch(console.error);
	});
</script>

<textarea placeholder="my-event input lol" bind:value={inputText}></textarea>

{#if $someEvent}
	<p>{$someEvent}</p>
{/if}
