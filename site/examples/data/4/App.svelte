<script>
  import * as Pancake from "@sveltejs/pancake";
  import { fly, scale } from "svelte/transition";
  import data from "./data.js";
  const fruits = ["apples", "bananas", "cherries", "dates"];
  const colors = ["#00e047", "#7ceb68", "#b7f486", "#ecfda5"];

  let shiftX = 1 / fruits.length;
  let isFlattened = false;

  const stacks = Pancake.stacks(data, fruits, "year");

  const max = stacks.reduce(
    (max, stack) => Math.max(max, ...stack.values.map(v => v.end)),
    0
  );
</script>

<style>
  .chart {
    height: 200px;
    padding: 3em 0 2em 2em;
    margin: 0 0 36px 0;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: calc(100% + 2em);
    left: -2em;
  }

  .grid-line span {
    position: absolute;
    left: 0;
    bottom: 0;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
    line-height: 1;
  }

  .year-label {
    position: absolute;
    width: 4em;
    left: -2em;
    bottom: -22px;
    font-family: sans-serif;
    font-size: 14px;
    color: #999;
    text-align: center;
  }

  .box {
    position: absolute;
    left: 2px;
    top: 0;
    width: calc(100% - 4px);
    height: 100%;
    border-radius: 2px;
  }
  .radio-inputs {
    display: flex;
  }

  label {
    margin: 0 1rem;
  }
</style>

<div class="radio-inputs">
  <label>
    <input type="radio" bind:group={isFlattened} value={false} />
    Stacked
  </label>
  <label>
    <input type="radio" bind:group={isFlattened} value={true} />
    Grouped
  </label>
</div>

<div class="chart">
  <Pancake.Chart x1={2019.5} x2={2015.5} y1={0} y2={max}>
    <Pancake.Grid horizontal count={5} let:value let:first>
      <div class="grid-line horizontal">
        <span>{value}</span>
      </div>
    </Pancake.Grid>
    <Pancake.Grid vertical count={5} let:value>
      <span class="year-label">{value}</span>
    </Pancake.Grid>
    {#each stacks as stack, i}
      {#if !isFlattened}
        {#each stack.values as d, vi}
          <Pancake.Box x1={d.i + 0.5} x2={d.i - 0.5} y1={d.start} y2={d.end}>
            <div
              in:scale={{ delay: i * 100 }}
              class="box"
              style="background-color: {colors[i]}" />
          </Pancake.Box>
        {/each}
      {:else}
        {#each stack.values as d, vi}
          <Pancake.Box
            x1={d.i + 0.5 - i * shiftX}
            x2={d.i + 0.5 - i * shiftX - shiftX}
            y1={d.value}
            y2={0}>
            <div
              in:fly={{ y: ((d.end - d.value) / 2) * -1, delay: i * 10 }}
              class="box"
              style="background-color: {colors[i]}" />
          </Pancake.Box>
        {/each}
      {/if}
    {/each}
  </Pancake.Chart>
</div>
