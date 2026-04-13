<template>
	<div class="min-h-screen bg-white">
		<div
			v-if="mountError"
			class="mx-auto max-w-3xl px-6 py-12 text-sm text-red-700"
		>
			<h1 class="mb-4 text-2xl font-semibold text-red-900">
				Keystatic failed to render
			</h1>
			<pre
				class="overflow-x-auto whitespace-pre-wrap rounded border border-red-200 bg-red-50 p-4"
				>{{ mountError }}</pre
			>
		</div>

		<div
			v-else-if="isBooting"
			class="mx-auto max-w-3xl px-6 py-12 text-sm text-stone-700"
		>
			Loading Keystatic…
		</div>

		<div ref="rootEl" class="min-h-screen bg-white" />
	</div>
</template>

<script setup lang="ts">
	import type { Config } from '@keystatic/core';
	import { Component, createElement, type ReactNode } from 'react';
	import { Keystatic } from '@keystatic/core/ui';
	import { createRoot, type Root } from 'react-dom/client';
	import keystaticConfig from '@/keystatic.config';

	const rootEl = ref<HTMLDivElement | null>(null);
	const isBooting = ref(true);
	const mountError = ref('');
	const keystaticUiConfig = keystaticConfig as Config;
	let reactRoot: Root | null = null;
	let cleanupListeners: (() => void) | null = null;

	function getRootElement() {
		return rootEl.value;
	}

	type ErrorBoundaryProps = {
		children?: ReactNode;
		onError: (error: Error) => void;
	};

	type ErrorBoundaryState = {
		error: Error | null;
	};

	class KeystaticErrorBoundary extends Component<
		ErrorBoundaryProps,
		ErrorBoundaryState
	> {
		override state: ErrorBoundaryState = {
			error: null,
		};

		static getDerivedStateFromError(error: Error) {
			return { error };
		}

		override componentDidCatch(error: Error) {
			this.props.onError(error);
		}

		override render() {
			if (this.state.error) {
				return createElement(
					'div',
					{
						style: {
							padding: '24px',
							fontFamily: 'monospace',
							color: '#991b1b',
							whiteSpace: 'pre-wrap',
						},
					},
					this.state.error.stack || this.state.error.message
				);
			}

			return this.props.children;
		}
	}

	onMounted(async () => {
		await nextTick();

		const resolvedRoot =
			getRootElement() ??
			(await new Promise<HTMLDivElement | null>((resolve) => {
				setTimeout(() => resolve(getRootElement()), 0);
			}));

		if (!resolvedRoot) {
			mountError.value = 'Keystatic root element was not found.';
			isBooting.value = false;
			return;
		}

		const handleWindowError = (event: ErrorEvent) => {
			mountError.value = event.error?.stack || event.message;
			isBooting.value = false;
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			const reason =
				event.reason instanceof Error
					? event.reason.stack || event.reason.message
					: String(event.reason);

			mountError.value = reason;
			isBooting.value = false;
		};

		window.addEventListener('error', handleWindowError);
		window.addEventListener('unhandledrejection', handleUnhandledRejection);
		cleanupListeners = () => {
			window.removeEventListener('error', handleWindowError);
			window.removeEventListener(
				'unhandledrejection',
				handleUnhandledRejection
			);
		};

		try {
			reactRoot = createRoot(resolvedRoot);
			reactRoot.render(
				createElement(
					KeystaticErrorBoundary,
					{
						onError(error: Error) {
							mountError.value = error.stack || error.message;
							isBooting.value = false;
						},
					},
					createElement(Keystatic, {
						config: keystaticUiConfig,
					})
				)
			);
		} catch (error) {
			mountError.value =
				error instanceof Error
					? error.stack || error.message
					: String(error);
		} finally {
			setTimeout(() => {
				if (!mountError.value) {
					isBooting.value = false;
				}
			}, 300);
		}
	});

	onBeforeUnmount(() => {
		cleanupListeners?.();
		cleanupListeners = null;
		reactRoot?.unmount();
		reactRoot = null;
	});
</script>
