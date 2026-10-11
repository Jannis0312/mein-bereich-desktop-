# Mein Bereich als Desktop-App

## App starten

1. Installiere [Node.js LTS](https://nodejs.org/).
2. Öffne PowerShell in diesem Ordner.
3. Führe diese Befehle aus:

   ```powershell
   npm install
   npm start
   ```

Das Dashboard wird in einem eigenen Fenster geöffnet. Deine Daten werden weiterhin lokal im App-Browser gespeichert.
Der Desktop-App-Speicher ist getrennt vom Browser. Über „Sicherung“ kannst du die bisherigen Browser-Daten exportieren und anschließend in der Desktop-App importieren.

## Windows-Installationsdatei erstellen

Führe nach `npm install` diesen Befehl aus:

```powershell
npm run dist
```

Die Installationsdatei wird im Ordner `dist` erstellt. Sie kann auf diesem Windows-PC gestartet und installiert werden.

## Automatische Updates veröffentlichen

Die installierte App prüft beim Start automatisch nach Updates. Wenn eine neue Version heruntergeladen wurde, fragt sie nach einem Neustart. Releases werden aus GitHub Actions für das Windows-x64-Format gebaut und über GitHub Releases verteilt.

Für ein neues Release müssen die Änderungen zuerst committet werden. Danach erhöht `npm version patch` die Patch-Version, aktualisiert die Lockdatei, erstellt einen Commit und setzt den passenden Versions-Tag. Beispiel in PowerShell:

```powershell
npm version patch
git push origin main --follow-tags
```

Der Release-Workflow erstellt anschließend automatisch den Windows-Installer und die Update-Metadaten. Bei einer neuen Funktion müssen die geänderten Dateien zuerst wie gewohnt committet und gepusht werden; danach wird mit `npm version patch` die Update-Version erstellt.

Die erste automatische Aktualisierung funktioniert erst, nachdem die Version `1.0.1` mit integriertem Updater einmal installiert wurde.
