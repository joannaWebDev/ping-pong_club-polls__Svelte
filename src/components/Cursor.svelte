<script lang="ts">
  export let x:number = 0
  export let y:number = 0
</script>

<div style={`top: ${y}px; left: ${x}px`} class="cursor" />

<style>
  .cursor {
    display: flex;
    height: 10px;
    aspect-ratio: 1;
    position: fixed;
    background-color: red;
    border-radius: 50%;
    z-index: 99999;
   cursor: none;
   
  }
</style>
