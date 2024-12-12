<script lang="ts">
	import listenStore from '$lib/utils/listenerStore';
	import { text } from '@sveltejs/kit';
	import { emit } from '@tauri-apps/api/event';
	type MyEventPayload = {
		text: string;
	};
	const someEvent = listenStore<MyEventPayload | undefined>('my-event', undefined);
	let inputText = $state<string | undefined>(undefined);
	$effect(() => {
		if (inputText != undefined && inputText?.length != 0) {
			emit('my-event', {
				text: inputText
			}).catch(console.error);
		}
	});
</script>

<textarea placeholder="my-event input lol" bind:value={inputText}></textarea>

{#if $someEvent}
	<p>{$someEvent.text}</p>
{/if}
