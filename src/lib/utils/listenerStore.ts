import { listen } from '@tauri-apps/api/event';
import { readable } from 'svelte/store';
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

export default function listenStore<T = unknown>(event: string) {
	return readable<T>(undefined, (set) => {
		const unlisten = listen<T>(event, (event) => {
			set(event.payload);
		});
		return () => {
			unlisten.then((u) => u());
		};
	});
}

export function currentWebviewListenStore<T = unknown>(event: string) {
	return readable<T>(undefined, (set) => {
        const appWindow = getCurrentWebviewWindow();
		const unlisten = appWindow.listen<T>(event, (event) => {
			set(event.payload);
		});
		return () => {
			unlisten.then((u) => u());
		};
	});
}