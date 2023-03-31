#how to use sass with SvelteKit
https://www.edoardocasella.it/blog/post/How-to-use-SASS-with-SvelteKit

(1) npm install -D svelte-preprocess

(2) svelte.config.js
import preprocess from 'svelte-preprocess';

const config = {
  preprocess: preprocess({})
  ...
}

(3)
<style lang="scss">
...
</script>

(4) share a global style file with your entire application. Example, variables
const config = {
  preprocess: preprocess({
     scss: {
       prependData: `@import './src/styles/variables.scss';`
     } 
  })
  ...
}

# -----------------------------------------
#how_to_use_autoprefixer_and_scss_together_in/
https://www.reddit.com/r/sveltejs/comments/vggw7r/how_to_use_autoprefixer_and_scss_together_in/
