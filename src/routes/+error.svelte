<script lang="ts" context="module">
	import { page } from '$app/stores';
</script>

<section class="wrapper">
	{#if $page.status === 404}
		<h1>Запрашиваемая страница не существует</h1>
		<p>Можно перейти на главную</p>
		<a data-sveltekit-reload href="/">&#8592; На главную</a>
	{:else}
		<h1>{$page.status}</h1>
		<h4>{$page.error?.message}</h4>
	{/if}
</section>

<style>
	.wrapper {
		text-align: center;
		margin-top: 5%;
	}
	h1 {
		font-size: 2em;
	}
	a {
		display: inline-block;
		margin-top: 1em;
		padding: 0.5em 1em;
		border: 1px solid grey;
		border-radius: 1em;
	}
	a:hover {
		outline: 1px double grey;
		border-color: brown;
		color: brown;
	}
</style>
