# How index.html is built

`index.html` (the public page) is generated. Do not edit it by hand.

- `shell.html`  page frame, styles and a small stand-in for the Claude dashboard engine
- `body.html`   the visible text and layout (Read me, tabs, filters)
- `app.js`      all calculations and charts
- `d3.min.js`   d3 v7, inlined into the page
- `build.py`    `python3 build/build.py <data_dir>` rebuilds `index.html` from the nine dataset JSON files
- `test.js`     optional browser smoke test (needs puppeteer-core and Google Chrome)

Dates and counts that change with each monthly data refresh are hard-coded in `body.html`
(Read me, Definitions, "as of" dates) and in `app.js` (the "out of N players league-wide" line in `leadF`).
Created by Brian Walby.
