<script>
  import * as Pancake from "@sveltejs/pancake";
  import { fade } from "svelte/transition";
  import data from "./data.js";

  $: isSlopeHovered = false;
  $: hoverId = null;
  $: isLeftToolTip = true;
  $: isRightToolTip = true;

  $: displayData =
    isSlopeHovered != false && hoverId
      ? data.find(d => d.shape === hoverId)
      : "";
  let y2 = -Infinity;
  let y1 = Infinity;

  const rightArrow = [
    { x: 2.1, y: 65 },
    { x: 2.3, y: 65 },
    { x: 2.3, y: 65 },
    { x: 2.5, y: 95 }
  ];

  const leftArrow = [{ x: 0.9, y: 60 }, { x: 0.5, y: 45 }, { x: 0.5, y: 45 }];

  //array of the left lables in order by default
  const left_labels = data.reduce((a, c) => {
    a.push(c.y2001);
    return a;
  }, []);

  //array of right labels - not ordered
  const right_labels = data.reduce((a, c) => {
    a.push(c.y2002);
    return a;
  }, []);

  // TODO refactor forloops into one function that can be imported as helper

  const slopeData = data.slice(0);
  const positionData = data.slice(0);

  //sets the y1 to max value of data
  positionData.forEach((d, i) => {
    if (i === 0) {
      y2 = d.y2001;
      y1 = d.y2001;
    }
    let a = d.y2001;
    let b = d.y2002;
    if (Math.max(a, b) > y2) {
      y2 = Math.max(a, b);
    }
    if (Math.min(a, b) < y1) {
      y1 = Math.min;
    }
  });

  //our initial shift centers svg line to center of text
  let left_label_shifts = data.map(d => {
    return "- .5rem";
  });
  let right_label_shifts = data.map(d => {
    return "- .5rem";
  });

  //Look for overlapping pairs that can be shifted apart with minimal disruption
  //labels too closely packed ar bumped out to side circles (clusters)
  const leftClusters = [];
  const rightClusters = [];

  function findClusters(arr, start, limit, key, dep) {
    let remainder = arr.slice(start, limit - 1);
    let cluster = true;

    //if the starting value is already in cluster return
    if (dep.includes(arr[start])) {
      return;
    } else {
      let currentCluster = remainder.filter((cur, i, a) => {
        let nxt = a[i + 1];
        if (!nxt === false && cur[key] - nxt[key] < 15 && cluster === true) {
          return true;
        } else {
          cluster = false;
          return false;
        }
      });
      dep.push(...currentCluster);
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (i != 0 && i <= data.length - 2) {
      let nxt = data[i + 1].y2001;
      if (data[i].y2001 - nxt < 15) {
        let space_above = data[i - 1].y2001 - data[i].y2001;
        let space_below = nxt - data[i + 2].y2001;
        if (space_above > 7 && space_below > 6) {
          let diff = data[i].y2001 - nxt;
          left_label_shifts[i] = (15 - diff) * -1;
          left_label_shifts[i + 1] = -4;
        } else {
          findClusters(data, i, data.length - 2, "y2001", leftClusters);
        }
      }
    }
  }

  const sorted_by_right_labels = Array.prototype.slice
    .call(data)
    .sort((a, b) => {
      return b.y2002 - a.y2002;
    });
  console.log("sorted by right labels", sorted_by_right_labels);

  for (let i = 0; i < data.length; i++) {
    if (i != 0 && i < data.length - 2) {
      let nxt = sorted_by_right_labels[i + 1].y2002;
      if (sorted_by_right_labels[i].y2002 - nxt < 15) {
        let space_above =
          sorted_by_right_labels[i - 1].y2002 - sorted_by_right_labels[i].y2002;
        let space_below = nxt - sorted_by_right_labels[i + 2].y2002;
        if (space_above > 7 && space_below > 6) {
          let diff = sorted_by_right_labels[i].y2002 - nxt;

          right_label_shifts[i] = (17 - diff) * -1;

          right_label_shifts[i + 1] = -4;
        } else {
          findClusters(
            sorted_by_right_labels,
            i,
            sorted_by_right_labels.length - 2,
            "y2002",
            rightClusters
          );
        }
      }
    }
  }

  //define svg points
  const points = data.map(d => ({
    p: [{ x: 1, y: d.y2001 }, { x: 2, y: d.y2002 }],
    id: d.shape
  }));

  function toggleHovered() {
    isSlopeHovered = !isSlopeHovered;
    console.log("slope hovered ", isSlopeHovered);
  }

  function updateHoverId(id) {
    if (isSlopeHovered) {
      if (leftClusters.find(d => d.shape === id) != undefined) {
        isLeftToolTip = true;
      }
      if (rightClusters.find(d => d.shape === id) != undefined) {
        isRightToolTip = true;
      }
      hoverId = id;
      console.log(id, "hovered");
    } else {
      hoverId = "";
    }
  }

  function highlightSlope(id) {
    toggleHovered();
    updateHoverId(id);
  }

  function cancelHighlight() {
    toggleHovered();
    updateHoverId(null);
  }
</script>

<style>
  .chart {
    height: 600px;
    padding: 4em 0 2em 2em;
    margin: 0 0 36px 0;
    color: #2f2f2f;
  }

  .data,
  .arrows {
    stroke: #2f2f2f50;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
    fill: none;
    transition: all 1s ease-out;
  }

  .upward {
    stroke: #233627;
  }
  .downward {
    stroke: #877e76;
  }

  .arrows {
    stroke: #2f2f2f75;
  }

  path.highlight {
    stroke: rgba(255, 62, 0, 0.8);
    color: rgba(255, 62, 0, 0.8);
    z-index: 10;
  }

  .left-labels,
  .left-header {
    text-align: right;
    margin-right: 1rem;
    transform: translate(0, -0.5rem);
    transition: all 1s ease-out;
  }

  .title {
    text-align: center;
    transform: translate(0, -4rem);
  }

  .right-labels,
  .right-header {
    margin-left: 1rem;
    transform: translate(0, -0.5rem);
  }

  .left-header,
  .right-header {
    transform: translate(0, -2rem);
  }

  .left-labels,
  .right-labels,
  .tool-tip {
    font-size: 12px;
    cursor: default;
  }

  .tool-tip {
    padding: 0 1rem;
  }

  .tool-tip-container {
    font-size: 12px;
    margin: 0rem;
    width: max-content;
    padding: 1rem 0;
    background-color: white;
  }

  div.right .tool-tip {
    text-align: center;
  }

  .right {
    float: left;
    transform: translate(100%, -37%);

    padding: 1rem;
  }

  .tool-tip {
    text-align: center;
  }

  .tool-tip:hover,
  .left-labels:hover,
  .right-labels:hover {
    color: rgba(255, 62, 0, 0.8);
  }

  .left,
  .right {
    border-radius: 50%;
    border-color: #2f2f2f75;
    border: 1px dotted #2f2f2f75;
  }

  .left {
    float: right;
    transform: translate(-100%, -37%);
  }
  .result h2 {
    text-align: center;
    color: rgba(255, 62, 0, 0.8);
    text-transform: capitalize;
    transition: all 400ms;
  }

  .result .yr {
    display: flex;
    justify-content: space-around;
    transition: all 400ms;
  }

  .l,
  .r {
    width: 45%;
    text-align: center;
    transition: all 400ms;
  }
  .l h3,
  .r h3 {
    color: #2f2f2f75;
    padding: 0.5rem 0;
    text-decoration: underline;
  }

  .l p,
  .r p {
    padding: 0;
    margin: 0;
  }

  @media (max-width: 750px) {
    h2 {
      font-size: 1rem;
      transform: translate(0px, -4rem);
    }

    .arrows {
      display: none;
    }
  }
</style>

<div class="chart">
  <Pancake.Chart {y2} y1={0} x1={0} x2={3}>

    <Pancake.Box {y2}>
      <div class="left-header">2001</div>
    </Pancake.Box>

    <Pancake.Box {y2} x1={1} x2={2}>
      <h2 class="title">UFO Sightings (By Shape)</h2>
    </Pancake.Box>
    <Pancake.Box {y2} x1={2} x2={3}>
      <div class="right-header">2002</div>
    </Pancake.Box>

    <Pancake.Svg>
      <Pancake.SvgLine data={rightArrow} let:d>
        <path class="arrows" {d} />
      </Pancake.SvgLine>
      <Pancake.SvgLine data={leftArrow} let:d>
        <path class="arrows" {d} />
      </Pancake.SvgLine>

      {#each points as point, i}
        <Pancake.SvgLine data={point.p} let:d>
          <path
            on:mouseenter={() => {
              highlightSlope(point.id);
            }}
            on:mouseout={cancelHighlight}
            class={`data ${hoverId === point.id ? 'highlight' : point.p[0].y > point.p[1].y ? 'downward' : 'upward'}`}
            {d} />
        </Pancake.SvgLine>
      {/each}
    </Pancake.Svg>

    {#each data as d, i}
      {#if leftClusters.find(j => j.shape === d.shape) === undefined}
        <Pancake.Box x2={1} y2={d.y2001} y1={0}>
          <div
            on:mouseenter={() => highlightSlope(d.shape)}
            on:mouseout={cancelHighlight}
            class={`left-labels ${d.shape === hoverId ? 'highlight' : ''}`}
            style={`transform: translate(0, ${left_label_shifts[i]}px)`}>
            {`${d.shape}`}
          </div>
        </Pancake.Box>
      {/if}
    {/each}
    {#each data as d, i}
      {#if rightClusters.find(j => j.shape === d.shape) === undefined}
        <Pancake.Box x1={2} x2={3} y2={d.y2002} y1={0}>
          <div
            on:mouseenter={() => highlightSlope(d.shape)}
            on:mouseout={cancelHighlight}
            class={`right-labels ${d.shape === hoverId ? 'highlight' : ''}`}
            style={`transform: translate(0, ${right_label_shifts[i]}px)`}>
            {`${d.shape} `}
          </div>
        </Pancake.Box>
      {/if}
    {/each}
    <Pancake.Box
      x2={1}
      y2={leftClusters[0].y2001 + 30}
      y1={leftClusters[0].y2001 + 30 - leftClusters.length * 15}>
      {#if isLeftToolTip}
        <div transition:fade class="tool-tip-container left">
          {#each leftClusters as d}
            <div
              on:mouseenter={() => highlightSlope(d.shape)}
              on:mouseout={cancelHighlight}
              class={`tool-tip  ${d.shape === hoverId ? 'highlight' : ''}`}>
              {`${d.shape}`}
            </div>
          {/each}
        </div>
      {/if}
    </Pancake.Box>

    <Pancake.Box
      x1={2}
      x2={3}
      y1={rightClusters[0].y2002}
      y2={rightClusters[0].y2002 - rightClusters.length * 15}>
      {#if isRightToolTip}
        <div transition:fade class="tool-tip-container right">
          {#each rightClusters as d}
            <div
              on:mouseenter={() => highlightSlope(d.shape)}
              on:mouseout={cancelHighlight}
              class={`tool-tip  ${d.shape === hoverId ? 'highlight' : ''}`}>
              {`${d.shape}`}
            </div>
          {/each}
        </div>
      {/if}
    </Pancake.Box>

    {#if hoverId}
      <Pancake.Box x1={1} x2={2} y1={400} y2={550}>
        <div transition:fade class="result">
          <h2>{hoverId}</h2>
          <div class="yr">
            <div class="l">
              <h3>2001</h3>
              <p>{displayData.y2001}</p>
            </div>
            <div class="r">
              <h3>2002</h3>
              <p>{displayData.y2002}</p>
            </div>
          </div>

        </div>
      </Pancake.Box>
    {/if}
  </Pancake.Chart>
</div>
<p>
  Based on
  <a href="http://skedasis.com/d3/slopegraph/">
    http://skedasis.com/d3/slopegraph/
  </a>
</p>
