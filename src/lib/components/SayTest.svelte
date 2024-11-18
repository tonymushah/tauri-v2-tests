<script lang="ts">
	import { invoke } from '@tauri-apps/api/core';

	let {
		title = $bindable('Hello from Tauri!')
	}: {
		title?: string;
	} = $props();
	let nameValue = $state<string>();
	let dataText = $state<string | undefined>(undefined);
	$effect(() => {
		console.log(`name ${dataText}`);
	});
	async function say(name: string) {
		const res = await invoke<string>('say', {
			name
		});
		dataText = res;
	}
</script>

<section>
	<h2>{title}</h2>
	<div>
		<input bind:value={nameValue} />
		<button
			onclick={() => {
				if (nameValue) say(nameValue).catch(console.error);
			}}>Send</button
		>
	</div>
	{#if dataText}
		<p>{dataText}</p>
	{/if}
</section>
