<script lang="ts">
  import { format } from "date-fns";
  import { v4 as uuidv4 } from "uuid";
  import { fade } from "svelte/transition";
  import addRandom from "../helper/functions/addRandomPoll";
  import Button from "../shared/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import getRandomHexColor from "../helper/functions/getRandomHexColor";

  interface Fields {
  question: string;
  answers: {
    answerA: string;
    answerB: string;
  };
}

interface Error {
  question: boolean;
  answers: {
    answerA: boolean;
    answerB: boolean;
  };
}

  let dispatch = createEventDispatcher();

  let done = false;
  let fields: Fields = {
    question: "",
    answers: {
      answerA: "",
      answerB: "",
    },
  };

  let error: Error = {
    question: false,
    answers: {
      answerA: false,
      answerB: false,
    },
  };

  let checkErrors = false;

  $: number = 3;

  let show = false;

  function submitHandler() {
    done = false;
    show = true;
    error.question = fields.question.trim().length < 5 ? true : false;
    error.answers.answerA = fields.answers.answerA.trim() === "" ? true : false;
    error.answers.answerB = fields.answers.answerB.trim() === "" ? true : false;
    checkErrors = Object.values(error.answers).some((el) => el === true);

    if (!error.question && !checkErrors) {
      let poll = {
        ...fields,
        votesA: 0,
        votesB: 0,
        createdAt: format(new Date(), "hh:mm:ss dd.MM.yyyy"),
        id: uuidv4(),
        bg: getRandomHexColor(),
      };

      dispatch("add", poll);
      fields = {
        question: "",
        answers: {
          answerA: "",
          answerB: "",
        },
      };
      done = true;
      const timeout = setTimeout(() => {
        done = false;
      }, 5000);
      const interval = setInterval(() => {
        number -= 1;
      }, 650);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="mouse" on:mousemove={(e) => coordonates(e)} />

<style>
  .mouse {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 0;
    transition: all 200ms ease;
    cursor: none;
  }
</style>
