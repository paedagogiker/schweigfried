# Schweigfried – Web-Version mit eingebauter KI

Ein Zauberer hütet ein Passwort, Kinder und Jugendliche versuchen es ihm mit klugen Prompts zu entlocken: sieben Level und ein Bonuslevel, jedes mit einem weiteren Schutzzauber.

Das Besondere an dieser Version: **Das Sprachmodell läuft direkt im Browser des jeweiligen Geräts.** Es gibt keine Anmeldung, keinen KI-Dienst im Hintergrund und keine Kosten. Was die Lernenden schreiben, verlässt das Gerät nicht. Nach dem ersten Laden funktioniert das Spiel auch ohne Internet, und beliebig viele Geräte können gleichzeitig spielen.

---

## In 5 Schritten zum eigenen Link (GitHub Pages, kostenlos)

1. Auf <https://github.com> anmelden (oder ein kostenloses Konto anlegen) und oben rechts **+ → New repository** wählen. Name zum Beispiel `schweigfried`, Sichtbarkeit **Public**, dann **Create repository**.
2. Auf der neuen Seite **uploading an existing file** anklicken und **den gesamten Inhalt dieses Ordners** ins Fenster ziehen (`index.html`, `sw.js`, `config.js`, `manifest.webmanifest` und den Ordner `icons`). Unten **Commit changes** klicken.
3. Im Repository **Settings → Pages** öffnen. Bei „Build and deployment“ als Source **Deploy from a branch** wählen, Branch **main** und Ordner **/(root)**, dann **Save**.
4. Nach ein bis zwei Minuten steht oben auf dieser Seite dein Link, zum Beispiel `https://dein-name.github.io/schweigfried/`.
5. Link (oder einen QR-Code davon) an die Klasse geben. Fertig.

Jeder andere Webspace geht genauso: Ordnerinhalt hochladen, die Seite muss per **https** erreichbar sein. Ein Doppelklick auf `index.html` genügt nicht, weil Browser die nötigen Funktionen nur für richtige Webadressen freigeben.

**Aktualisieren:** Neue Dateien einfach wieder hochladen und die alten überschreiben. Die Geräte holen sich die neue Version beim nächsten Besuch.

---

## Vor der ersten Stunde

- **Beim ersten Start lädt jedes Gerät einmalig das Sprachmodell**: „Flink“ mit ca. 0,7 GB (Handys, Tablets) oder „Schlau“ mit ca. 1,8 GB (Laptops, PCs; antwortet besser). Danach liegt es im Browser-Speicher des Geräts.
- Plane dafür Zeit im WLAN ein, am besten vor der Stunde oder gestaffelt. 30 Geräte gleichzeitig können ein Schul-WLAN ausbremsen.
- Mit `?modell=flink` oder `?modell=schlau` am Ende des Links gibst du das Modell vor, zum Beispiel `https://dein-name.github.io/schweigfried/?modell=flink`.
- Auf iPads und Handys lohnt sich „Zum Home-Bildschirm“: Dann startet das Spiel wie eine App, und der Browser räumt das Modell nicht nach einigen Tagen wieder weg.
- Private Fenster (Inkognito) speichern das Modell nicht dauerhaft.

## Welche Geräte funktionieren?

Der Browser muss **WebGPU** beherrschen. Stand Ende 2026:

| Gerät | Browser |
|---|---|
| Windows, Mac, Chromebook | aktuelles Chrome oder Edge; Firefox unter Windows und auf neueren Macs |
| iPad, iPhone | ab iPadOS/iOS 26 (Safari und alle anderen Browser) |
| Android | aktuelles Chrome auf neueren Geräten (ab Android 12) |

Geräte mit wenig Arbeitsspeicher sollten „Flink“ nehmen. Erkennt das Spiel kein WebGPU, erklärt es das auf dem Bildschirm. Für solche Geräte gibt es den **Klassenraum-Server** (eigenes Paket): Dann rechnet der Computer der Lehrkraft für alle.

---

## Datenschutz

- **Keine Anmeldung, keine Konten, keine Cookies, kein Tracking.**
- **Nachrichten und Antworten bleiben auf dem Gerät.** Die KI rechnet lokal, es gibt keinen Server, der mitliest.
- Spielstand und Verlauf liegen nur im Browser-Speicher des Geräts („Alles zurücksetzen“ im Menü löscht sie).
- **Beim ersten Laden** werden Dateien von diesen Servern abgerufen. Dabei wird, wie bei jedem Seitenaufruf, die IP-Adresse übertragen, sonst nichts:
  - deine Webadresse (z. B. GitHub Pages): die Spieldateien
  - `cdn.jsdelivr.net`: die Bibliothek WebLLM, die das Modell im Browser ausführt
  - `huggingface.co` und `raw.githubusercontent.com`: die Modelldateien (Llama 3.2 von Meta, im Format des MLC-Projekts)
- Danach läuft alles ohne Netzverbindung.

Ob das für deine Schule genügt, klärst du am besten kurz mit der oder dem Datenschutzbeauftragten. Dies ist keine Rechtsberatung.

### Ganz ohne fremde Server (für die Schul-IT)

Alle Dateien lassen sich auch vom eigenen Webserver ausliefern. In `config.js` stehen dafür zwei auskommentierte Einstellungen:

- `webllmUrl`: Adresse einer selbst abgelegten WebLLM-Bibliothek (ESM-Bundle von `@mlc-ai/web-llm`, Version 0.2.84).
- `modelUrls`: pro Modell die eigene Adresse des Modellordners (`model`) und der zugehörigen `.wasm`-Datei (`model_lib`). Die Modellordner heißen bei Hugging Face `mlc-ai/Llama-3.2-1B-Instruct-q4f16_1-MLC` und `mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC`. Für Geräte ohne die WebGPU-Funktion „shader-f16“ nutzt das Spiel die Varianten `…q4f32_1-MLC`.

---

## Gut zu wissen

- **Passwörter** werden für jedes Gerät zufällig ausgelost. Abschreiben hilft also nicht, gute Prompts austauschen schon.
- **Kurzzeitgedächtnis:** Schweigfried merkt sich die letzten drei Wortwechsel. „Neues Gespräch“ löscht sein Gedächtnis.
- **Sicherer Levelaufbau:** In Level 1 wird das Passwort auf Nachfrage immer genannt, ab Level 2 wird eine kurze, direkte Frage danach immer abgelehnt. Alles andere entscheidet die KI.
- **Röntgenblick:** Nach jedem geknackten Level lässt sich im Gespräch nachsehen, welcher Schutzzauber wie entschieden hat.
- **Menü (☰) → Für Lehrkräfte:** alle Level freischalten, Tipps abschalten, eigene Sperrwörter für das Bonuslevel, alles zurücksetzen.
- Kleine Sprachmodelle machen Fehler und reden manchmal Unsinn. Das gehört zum Lerninhalt: Auch darüber lässt sich gut sprechen.
- Wer die Entwicklerwerkzeuge des Browsers bedienen kann, findet das Passwort auch ohne Prompt. Das ist ein guter Anlass für das Gespräch, warum Geheimnisse im Browser nie sicher sind.

## Wenn etwas nicht klappt

| Problem | Lösung |
|---|---|
| „Hier kann Schweigfried nicht einziehen“ | Der Browser kann kein WebGPU. Browser oder Betriebssystem aktualisieren, anderes Gerät nehmen oder den Klassenraum-Server nutzen. |
| Laden bricht ab oder „Das hat nicht geklappt“ | Seite neu laden und noch einmal aufwecken, „Flink“ wählen, Speicherplatz prüfen. |
| Schul-Filter blockiert das Laden | Die IT muss `cdn.jsdelivr.net`, `huggingface.co` (samt Unteradressen) und `raw.githubusercontent.com` freigeben, oder die Dateien selbst hosten (siehe oben). |
| Antworten kommen sehr langsam | „Flink“ wählen, andere Tabs und Apps schließen. |
| Schweigfried antwortet wirr | Kommt bei kleinen Modellen vor. „Neues Gespräch“ hilft; auf Laptops „Schlau“ wählen. |

## Vorschlag für eine Doppelstunde

1. **Einstieg (5 Min.):** Level 1 gemeinsam am Beamer. Warum hat das so leicht geklappt?
2. **Spielphase (45 Min.):** Alle spielen selbst, gern zu zweit. Wer feststeckt, nutzt die Tipps.
3. **Sicherung (20 Min.):** Erfolgreiche Prompts sammeln und ordnen: umformulieren, Rollenspiel, verpacken, zerlegen, Sprache wechseln, Format vorgeben.
4. **Transfer (15 Min.):** Was heißt das für Chatbots in Schule und Alltag? Warum reicht eine Anweisung im Prompt nicht, um Daten zu schützen?
