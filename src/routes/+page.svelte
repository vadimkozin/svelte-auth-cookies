<script lang="ts">
	import { page } from '$app/stores'
	$: user = $page.data.user
</script>

<section>
	<h1>SvelteKit - auth - cookies</h1>
	<p><strong>demo entry:</strong></p>
	<p>user: alex</p>
	<p>email: alex@mail.ru</p>
	<p>pass: 123-qaz</p>
	<br />

	<hr />

	{#if !user}
		<a href="/login">login</a>
		<a href="/register">register</a>
	{/if}

	{#if user}
		<p>Welcome {user.name}!</p>
		<p>role: {user.role}</p>
		<a data-sveltekit-preload-data="tap" data-sveltekit-reload href="/logout">logout</a>
	{/if}
</section>

<style>
	section {
		margin-top: 2em;
		margin-left: 2em;
	}
	a {
		display: inline-block;
		text-decoration: underline;
		color: cornflowerblue;
	}
	a + a {
		margin-left: 1em;
	}
	a:hover {
		color: blue;
	}
</style>
