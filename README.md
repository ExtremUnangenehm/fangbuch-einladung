# fangbuch-einladung

Statische Bridge-Seite, die Vereins-Einladungs-Links in die FangBuch-App weiterleitet.

Die Einladungs-E-Mail enthaelt einen Link `https://einladung.fang-buch.de/?token=TOKEN`.
Diese Seite liest den Token, validiert ihn und oeffnet die App ueber das Custom-Scheme
`fangbuch://invite/TOKEN`. Eine Webseite kann die Einladung nicht selbst annehmen
(das braucht App + Login) — sie ist nur die Web->App-Bruecke.

Bezug: Issue ExtremUnangenehm/fangbuch#194.

## Lokal testen

    node --test

## Deployment

GitHub Pages aus `main`, Custom-Domain `einladung.fang-buch.de` (Datei `CNAME`).
Kein Build-Step: die Dateien werden 1:1 ausgeliefert.
