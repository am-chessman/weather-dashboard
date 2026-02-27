import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('weather app core files exist', () => {
  for (const f of ['app/page.jsx', 'app/layout.jsx', 'components/overlay.jsx', 'components/weatherCard.jsx']) {
    assert.equal(fs.existsSync(f), true, `Missing ${f}`);
  }
});

test('page includes city add/remove flow hooks', () => {
  const src = fs.readFileSync('app/page.jsx', 'utf8');
  assert.match(src, /handleAddCity/);
  assert.match(src, /handleRemoveCity/);
  assert.match(src, /Add City/i);
});
