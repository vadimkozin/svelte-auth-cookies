<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let form
	let isWrong = false

	const wrong = () => {
		isWrong = true
		setTimeout(() => (isWrong = false), 900)
		return ''
	}

	const focus = (element: HTMLInputElement) => {
		setTimeout(() => element.focus(), 0)
	}
</script>

<section class="box">
	<div class="wrapper" class:shake-horizontal={isWrong}>
		<h1 class="title">Авторизация</h1>
		<form
			action="?/login"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					// rerun the `load` function for the page
					// https://kit.svelte.dev/docs/modules#$app-navigation-invalidateall
					invalidateAll()

					// since we're customizing the default behaviour
					// we don't want to reimplement what `use:enhance` does
					// so we can use `applyResult` and pass the `result`
					await applyAction(result)
				}
			}}
		>
			<label>
				имя или email:
				<input
					type="text"
					name="username"
					placeholder="ivan or ivan@mail.ru"
					minlength="3"
					required
					use:focus
				/>
			</label>
			<label>
				пароль:
				<input
					type="password"
					name="password"
					placeholder="password"
					autocomplete="on"
					minlength="6"
					required
				/>
			</label>

			<button type="submit" disabled={isWrong}>Войти</button>

			{#if form?.invalid}
				<p class="error">name and password expected</p>
				{wrong()}
			{/if}

			{#if form?.credentials}
				<p class="error">You have entered the wrong credentials.</p>
				{wrong()}
			{/if}
		</form>
	</div>
</section>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.wrapper {
		margin-top: 5%;
		border-radius: 0.25em;
	}
	h1 {
		margin: 0;
	}
	.title {
		padding: 0.2em;
		font-size: 1.6em;
		font-weight: 300;
		text-align: center;
		letter-spacing: 1px;
		background-color: var(--primary-color, hsl(210, 96%, 47%));
		color: var(--header-text-color, white);
		border-radius: 0.15em 0.15em 0 0;
	}
	form {
		max-width: 500px;
		padding: 1.5em;
		display: flex;
		flex-direction: column;
		border-radius: 0 0 0.25em 0.25em;
		box-shadow: 0px 0px 10px var(--btn-box-shadow-color, hsl(0, 1%, 70%));
	}
	label {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	label + label {
		margin-top: 0.5em;
	}
	input {
		display: inline-block;
		margin-left: 1em;
		height: 2em;
		padding: 0.2em 0.5em;
		border: 1px solid var(--border-input-color, hsl(0, 2%, 89%));
		border-radius: 0.2em;
	}
	input:focus,
	button:focus {
		box-shadow: 0 0 5px var(--focus-outline-color, hsl(210, 96%, 47%));
	}
	button {
		margin-top: 1.5em;
		border-radius: 0.25em;
		padding: 0.5em 1em;
		color: var(--btn-text-color);
		border: 1px solid hsl(0, 0%, 50%);
		background-color: hsl(0, 0%, 90%);
		transition: all 0.25s ease-in-out;
	}
	button:not(:disabled):hover {
		cursor: pointer;
		background-color: hsl(0, 0%, 80%);
	}
	button:disabled {
		opacity: 0.5;
	}
	.error {
		display: block;
		margin-top: 2em;
		font-size: 80%;
		color: var(--warning-color, hsl(9, 100%, 64%));
	}
	.shake-horizontal {
		animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
	}
</style>
