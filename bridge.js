// Spiegelt die Token-Regex der App (deep_link_service.dart:23):
// alphanumerisch, Bindestrich, Unterstrich, 1..128 Zeichen.
const TOKEN_RE = /^[a-zA-Z0-9\-_]{1,128}$/;

/**
 * Liest `token` aus einem Query-String (z. B. location.search) und baut den
 * App-Deep-Link. URLSearchParams ist in Node und Browsern global verfuegbar.
 * @param {string} search - z. B. "?token=abc"
 * @returns {{ok:true, token:string, url:string} | {ok:false, reason:'missing'|'invalid'}}
 */
export function inviteDeepLink(search) {
  const token = new URLSearchParams(search).get('token');
  if (!token) return { ok: false, reason: 'missing' };
  if (!TOKEN_RE.test(token)) return { ok: false, reason: 'invalid' };
  return { ok: true, token, url: `fangbuch://invite/${token}` };
}
