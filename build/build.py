#!/usr/bin/env python3
"""Rebuild the standalone dashboard page (index.html at the repo root).

Usage: python3 build/build.py <data_dir>

<data_dir> must hold the nine dataset files: players, player_seasons, player_profiles,
seasons, league, league_seasons, schools, current, programs (each <name>.json, a JSON array).
"""
import json, os, sys
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
data_dir = sys.argv[1] if len(sys.argv) > 1 else '.'
names = ['players','player_seasons','player_profiles','seasons','league','league_seasons','schools','current','programs']
data = {n: json.load(open(os.path.join(data_dir, n + '.json'))) for n in names}
dj = json.dumps(data, separators=(',', ':'), ensure_ascii=False).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
rd = lambda f: open(os.path.join(here, f), encoding='utf-8').read()
out = rd('shell.html').replace('{{BODY}}', rd('body.html')).replace('{{D3}}', rd('d3.min.js')).replace('{{DATA}}', dj).replace('{{APP}}', rd('app.js'))
open(os.path.join(root, 'index.html'), 'w', encoding='utf-8').write(out)
print('wrote index.html', len(out), 'characters')
