import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inviteDeepLink } from './bridge.js';

test('gueltiger Token -> ok + Custom-Scheme-URL', () => {
  const r = inviteDeepLink('?token=abc-123_XYZ');
  assert.deepEqual(r, { ok: true, token: 'abc-123_XYZ', url: 'fangbuch://invite/abc-123_XYZ' });
});

test('fehlender token-Param -> missing', () => {
  assert.deepEqual(inviteDeepLink(''), { ok: false, reason: 'missing' });
  assert.deepEqual(inviteDeepLink('?foo=bar'), { ok: false, reason: 'missing' });
});

test('leerer Token -> missing', () => {
  assert.deepEqual(inviteDeepLink('?token='), { ok: false, reason: 'missing' });
});

test('ungueltige Zeichen -> invalid', () => {
  assert.equal(inviteDeepLink('?token=ab cd').reason, 'invalid');
  assert.equal(inviteDeepLink('?token=ab/cd').reason, 'invalid');
  assert.equal(inviteDeepLink('?token=%2e%2e%2fetc').reason, 'invalid'); // ../etc dekodiert
});

test('zu langer Token (>128) -> invalid', () => {
  const longTok = 'a'.repeat(129);
  assert.equal(inviteDeepLink('?token=' + longTok).reason, 'invalid');
});

test('Token an Laengengrenze (128) -> ok', () => {
  const tok = 'a'.repeat(128);
  assert.equal(inviteDeepLink('?token=' + tok).ok, true);
});
