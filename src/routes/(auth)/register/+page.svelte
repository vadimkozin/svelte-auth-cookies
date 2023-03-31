<script lang="ts">
	import { enhance } from '$app/forms'
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
		<h1 class="title">Регистрация</h1>
		<form action="?/register" method="POST" use:enhance>
			<label>
				имя:
				<input
					type="text"
					name="username"
					placeholder="username"
					minlength="3"
					maxlength="50"
					required
					use:focus
				/>
			</label>
			<label>
				email:
				<input type="email" name="email" placeholder="user@example.com" required />
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

			<label>
				роль:
				<select name="role" required>
					<option value="admin">admin</option>
					<option value="user" selected>user</option>
				</select>
			</label>
			<button type="submit" disabled={isWrong}>Зарегистрировать</button>

			{#if form?.user}
				<p class="alarm">Username is taken. {wrong()}</p>
			{/if}
		</form>
	</div>
</section>

<style>
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
	select,
	input {
		display: inline-block;
		margin-left: 1em;
		height: 2em;
		padding: 0.2em 0.5em;
		border: 1px solid var(--border-input-color, hsl(0, 2%, 89%));
		border-radius: 0.2em;
		box-sizing: border-box;
	}
	select:focus,
	input:focus,
	button:focus {
		box-shadow: 0 0 5px var(--focus-outline-color, hsl(210, 96%, 47%));
	}
	input,
	select {
		width: 11em;
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
		color: var(--blue-1);
	}
	button:disabled {
		opacity: 0.5;
	}
	.alarm {
		display: block;
		margin-top: 1em;
		font-size: 80%;
		color: var(--warning-color, tomato);
	}
	.shake-horizontal {
		animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
	}
</style>
