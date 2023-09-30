<script lang="ts">
  import { onMount } from "svelte";
  import CreatePollForm from "./components/CreatePollForm.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import PollList from "./components/PollList.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import MainLoading from "./loaders/MainLoading.svelte";
  import polls from "./stores/store";

  let list: string[] = ["Current Polls", "Add New Poll"];
  let active: string = list[1]; // Set the initial active tab

  let showInitialLoader: boolean = true;
  let loadingTime: number = 5000; // ms

  function justFirstLoad(): void {
    const hasLoadedBefore = JSON.parse(localStorage.getItem("loadedBefore"));

    if (!hasLoadedBefore) {
      showInitialLoader = true;
    }
    localStorage.setItem("loadedBefore", "true");
  }

  onMount(() => {
    active = list[0];

    // justFirstLoad()

    const timeout = setTimeout(() => {
      showInitialLoader = false;
    }, loadingTime);

    return () => clearTimeout(timeout);
  });

  function handleAdd(e: CustomEvent): void {
    let poll = e.detail; // using svelte disptacher
    $polls = [poll, ...$polls];
    localStorage.setItem("polls", JSON.stringify($polls));
    // switch to poll list in 2s
    const timeout = setTimeout(() => {
      active = list[0];
    }, 2000);

    () => clearTimeout(timeout);
  }

  function handleVote(e: CustomEvent): void {
    let { id, type } = e.detail;
    $polls = $polls.map((poll) => {
      return poll.id === id
        ? {
            ...poll,
            [type]: poll[type] + 1,
          }
        : poll;
    });
  }

  function deletePoll(e: CustomEvent): void {
    $polls = [...$polls].filter((poll) => poll.id !== e.detail);
  }
</script>

{#if showInitialLoader}
  <MainLoading />
{:else}
  <Header />
  <main>
    <Tabs {list} {active} on:tabChange={(e) => (active = e.detail)} />
    {#if active === list[0]}
      <PollList pollList={$polls} on:id={deletePoll} on:type={handleVote} />
    {:else if active === list[1]}
      <CreatePollForm on:add={handleAdd} />
    {/if}
  </main>
  <Footer />
{/if}

<style>
  main {
    min-height:100vh;
    max-width: 1260px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
  }
</style>
