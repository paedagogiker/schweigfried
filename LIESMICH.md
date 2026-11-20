# Schweigfried – Web-Version mit eingebauter KI

Ein Zauberer hütet ein Passwort, Kinder und Jugendliche versuchen es ihm mit klugen Prompts zu entlocken: sieben Level und ein Bonuslevel, jedes mit einem weiteren Schutzzauber. Zu jedem Level gehört eine Superkraft, also eine Prompt-Technik, die gegen genau diesen Schutz hilft. Die Lernenden decken sie als Tipp auf und sammeln sie beim Knacken.

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

- **Beim ersten Start lädt jedes Gerät einmalig ein Sprachmodell**. Danach liegt es im Browser-Speicher des Geräts.

  | Name | Modell | Größe | Für |
  |---|---|---|---|
  | Flink | Qwen 3.5 mit 2 Mrd. Parametern (Alibaba) | ca. 1,4 GB | Handys, Tablets |
  | Schlau | Qwen 3.5 mit 4 Mrd. Parametern (Alibaba) | ca. 2,5 GB | Laptops, neuere Tablets |
  | Genial | Qwen 3.5 mit 9 Mrd. Parametern (Alibaba) | ca. 5,5 GB | starke Laptops und PCs ab 16 GB Arbeitsspeicher; beste Sprache |
  | Mistral | Ministral 3 mit 3 Mrd. Parametern (Mistral AI) | ca. 2 GB | Laptops |

  Alle sind offene Modelle unter der Apache-2.0-Lizenz. Startet ein Modell nicht, bietet das Spiel zusätzlich „Mini“ an (Qwen 3.5 mit 0,8 Mrd. Parametern, ca. 0,6 GB). Je größer das Modell, desto gewandter und fehlerfreier antwortet Schweigfried.
- Plane dafür Zeit im WLAN ein, am besten vor der Stunde oder gestaffelt. 30 Geräte gleichzeitig können ein Schul-WLAN ausbremsen.
- Mit `?modell=flink`, `schlau`, `genial` oder `mistral` am Ende des Links gibst du das Modell vor, zum Beispiel `https://dein-name.github.io/schweigfried/?modell=genial`.
- **Englisch:** Oben rechts zwischen DE und EN umschalten oder `?sprache=en` an den Link hängen. Dann sind Schweigfried, die Passwörter (eigene englische Wortliste) und alle Texte englisch, gut für den Englischunterricht. Deutsch und Englisch haben je einen eigenen Spielstand: Im Englischen beginnt man bei Level 1, und wer zurückwechselt, macht im Deutschen dort weiter, wo er war. Beim ersten Wechsel zeigt die Spielanleitung „Useful phrases“, Satzanfänge mit deutscher Übersetzung, die sich per Antippen in die Eingabe übernehmen lassen.
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
  - `cdn.jsdelivr.net`: die Bibliothek WebLLM, die die Modelle im Browser ausführt
  - `huggingface.co` (samt Unteradressen) und `raw.githubusercontent.com`: die Modelldateien
- Danach läuft alles ohne Netzverbindung.

Ob das für deine Schule genügt, klärst du am besten kurz mit der oder dem Datenschutzbeauftragten. Dies ist keine Rechtsberatung.

### Ganz ohne fremde Server (für die Schul-IT)

Alle Dateien lassen sich auch vom eigenen Webserver ausliefern. In `config.js` stehen dafür auskommentierte Einstellungen:

- `webllmUrl`: Adresse einer selbst abgelegten WebLLM-Bibliothek (ESM-Bundle von `@mlc-ai/web-llm`, Version 0.2.89).
- `modelUrls`: pro Modell die eigene Adresse des Modellordners (`model`) und der zugehörigen `.wasm`-Datei (`model_lib`). Die Modellordner heißen bei Hugging Face `mlc-ai/Qwen3.5-2B-q4f16_1-MLC`, `mlc-ai/Qwen3.5-4B-q4f16_1-MLC`, `mlc-ai/Qwen3.5-9B-q4f16_1-MLC` und `mlc-ai/Ministral-3-3B-Instruct-2512-BF16-q4f16_1-MLC`. Für Geräte ohne die WebGPU-Funktion „shader-f16“ nutzt das Spiel die Varianten `…q4f32_1-MLC`.

---

## Gut zu wissen

- **Level bauen aufeinander auf:** Ein Level öffnet sich erst, wenn das vorige geknackt ist. Gesperrte Level lassen sich nicht anwählen; tippt man darauf, sagt das Spiel, welches Level zuerst dran ist. Geknackte Level kann man jederzeit wieder besuchen.
- **Hilfen für die Lernenden:** Spielanleitung beim ersten Start (danach über „?“ oben rechts und im Menü), eine kurze Erklärung unter jeder gestoppten Nachricht, ein Anstupser zur Superkraft, wenn jemand nach vier Nachrichten nicht weiterkommt, und die Superkraft-Karte mit weiteren Tipps.
- **Passwörter** werden für jedes Gerät zufällig ausgelost. Abschreiben hilft also nicht, gute Prompts austauschen schon.
- **Kurzzeitgedächtnis:** Schweigfried merkt sich die letzten drei Wortwechsel. „Neues Gespräch“ löscht sein Gedächtnis.
- **Sicherer Levelaufbau:** In Level 1 wird das Passwort auf Nachfrage immer genannt, ab Level 2 wird eine kurze, direkte Frage danach immer abgelehnt, und ungefragt verrät Schweigfried nie etwas: Plaudert das Modell das Passwort von selbst aus, ohne dass jemand danach gefragt oder einen Trick versucht hat, ersetzt das Spiel die Antwort. Alles andere entscheidet die KI.
- **Röntgenblick:** Nach jedem geknackten Level lässt sich im Gespräch nachsehen, welcher Schutzzauber wie entschieden hat.
- **Superkräfte:** Jedes Level hat eine Superkraft (Prompt-Technik) als Tipp. Gesammelte Superkräfte stehen im Menü.
- **Menü (☰) → Für Lehrkräfte:** Superkräfte und Tipps abschalten (dann entfallen auch Anstupser und Erklärungen), eigene Sperrwörter für das Bonuslevel, alles zurücksetzen (beide Sprachen).
- Kleine Sprachmodelle machen Fehler und reden manchmal Unsinn. Das gehört zum Lerninhalt: Auch darüber lässt sich gut sprechen.
- Wer die Entwicklerwerkzeuge des Browsers bedienen kann, findet das Passwort auch ohne Prompt. Das ist ein guter Anlass für das Gespräch, warum Geheimnisse im Browser nie sicher sind.

## Umstieg von Version 2

- **Neues Modell nötig:** Version 2 nutzte Llama 3.2, Version 3 nutzt Qwen 3.5 oder Ministral 3. Jedes Gerät lädt deshalb einmal neu (1,4 bis 5,5 GB, je nach Wahl). Die alten Llama-Dateien entfernt das Spiel beim ersten Start selbst, damit Platz frei wird.
- **Spielstand bleibt:** Geknackte Level bleiben erhalten, solange sie lückenlos aufeinander folgen. Waren früher Level freigeschaltet, ohne die davor zu knacken, beginnt man beim ersten noch offenen Level.
- **Einmal neu laden:** Geräte, die die alte Version offline gespeichert haben, zeigen beim ersten Öffnen noch einmal die alte Seite. Nach dem Neuladen ist Version 3 da.
- **Die Vorschau-Adresse** `…/schweigfried/neu/` leitet zur Hauptadresse weiter.

## Wenn etwas nicht klappt

| Problem | Lösung |
|---|---|
| „Hier kann Schweigfried nicht einziehen“ | Der Browser kann kein WebGPU. Browser oder Betriebssystem aktualisieren, anderes Gerät nehmen oder den Klassenraum-Server nutzen. |
| Laden bricht ab oder „Das hat nicht geklappt“ | Seite neu laden und noch einmal aufwecken, „Flink“ wählen, Speicherplatz prüfen. |
| Nach dem Update noch die alte Seite | Seite einmal neu laden (siehe „Umstieg von Version 2“). |
| Schul-Filter blockiert das Laden | Die IT muss `cdn.jsdelivr.net`, `huggingface.co` (samt Unteradressen) und `raw.githubusercontent.com` freigeben, oder die Dateien selbst hosten (siehe oben). |
| Antworten kommen sehr langsam | „Flink“ wählen, andere Tabs und Apps schließen. |
| Schweigfried antwortet wirr | Kommt bei kleinen Modellen vor. „Neues Gespräch“ hilft; auf Laptops „Schlau“ oder „Genial“ wählen. |
| Ein Modell startet gar nicht | Im Fehlerfenster „Anderes Modell wählen“ und ein kleineres nehmen, notfalls „Mini“. |

## Vorschlag für eine Doppelstunde

1. **Einstieg (5 Min.):** Level 1 gemeinsam am Beamer. Warum hat das so leicht geklappt?
2. **Spielphase (45 Min.):** Alle spielen selbst, gern zu zweit. Wer feststeckt, nutzt die Superkraft und die Tipps. Am Beamer vorführen lassen sich spätere Level nur auf einem Gerät, auf dem die Level davor geknackt sind (das Lösungsblatt hilft).
3. **Sicherung (20 Min.):** Erfolgreiche Prompts sammeln und den Superkräften zuordnen: Klartext, Gestaltwandler (Rolle), Buchstaben-Splitter (Format), Puzzle-Hirn (zerlegen), Wortwandler (umformulieren), Tarnkappe (verpacken), Kombo-Kraft.
4. **Transfer (15 Min.):** Was heißt das für Chatbots in Schule und Alltag? Warum reicht eine Anweisung im Prompt nicht, um Daten zu schützen?


## Schriften und Lizenzen

Die Comic-Schriften „Bangers“ und „Comic Neue“ stehen unter der SIL Open Font License 1.1 und sind in `index.html` eingebettet. Die Sprachmodelle Qwen 3.5 und Ministral 3 stehen unter der Apache-2.0-Lizenz.
