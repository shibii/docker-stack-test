<script>
  import ky from "ky";
  import { onMount } from "svelte";

  let results = [];
  let content = '{"content":"test content"}';

  const get = () => {
    ky.get("/notes")
      .json()
      .then((res) => {
        console.log(res);
        results = res;
      })
      .catch((err) => console.log(err));
  };

  const add = () => {
    if (content) {
      ky.post("/notes", { json: JSON.parse(content) })
        .then((res) => {
          console.log(res);
          get();
        })
        .catch((err) => console.log(err));
    }
  };

  const del = (id) => {
    ky.delete(`/notes/${id}`)
      .then((res) => {
        console.log(res);
        get();
      })
      .catch((err) => console.log(err));
  };

  onMount(() => {
    get();
  });
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 300px;
  }
  textarea {
    resize: none;
  }
</style>

<h1>notes</h1>
<p>insert json object into the database</p>
<form on:submit|preventDefault={add}>
  <textarea name="content" cols="30" rows="8" bind:value={content} />
  <input type="submit" value="insert" />
</form>
{#each results as result (result.id)}
  <p>
    {JSON.stringify(result)}
    <button
      on:click={() => {
        del(result.id);
      }}>remove</button>
  </p>
{/each}
