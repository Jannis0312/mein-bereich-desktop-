# Mein Bereich als Desktop-App

## App starten

1. Installiere [Node.js LTS](https://nodejs.org/).
2. Öffne PowerShell in diesem Ordner.
3. Führe diese Befehle aus:

   ```powershell
   npm install
   npm start
   ```

Das Dashboard wird in einem eigenen Fenster geöffnet. Änderungen an Aufgaben, Links, Notizen, Routinen, Terminen, deiner Film- und Serien-Watchlist, Spielen, Ausgaben und deinem Profil speichert die App automatisch auf diesem Gerät.
Der Desktop-App-Speicher ist getrennt vom Browser. Über „Sicherung“ kannst du Browser-Daten exportieren und anschließend in der Desktop-App importieren.

## Cloud-Synchronisierung einrichten

Die Cloud-Synchronisierung ist optional. Ohne Cloud-Einrichtung bleiben deine Daten lokal und werden weiterhin automatisch gespeichert.

1. Erstelle ein Projekt bei [Supabase](https://supabase.com/dashboard).
2. Öffne **Project Settings → API**. Kopiere die **Project URL** und den öffentlichen **Publishable key** (oder den bisherigen **anon key**) in `cloud-config.js`.
3. Führe den gesamten Inhalt von `supabase-setup.sql` einmal im Supabase **SQL Editor** aus.
4. Aktiviere in den Supabase-Authentifizierungseinstellungen die Anmeldung per E-Mail. Wenn E-Mail-Bestätigung aktiviert ist, bestätige die Nachricht nach der Kontoerstellung.
5. Installiere die App mit diesen Cloud-Dateien auf deinen Geräten. In der App wählst du **Cloud → Konto erstellen** oder meldest dich mit demselben Konto an.

Die Daten werden lokal sofort gespeichert und eine Sekunde nach einer Änderung zur Cloud hochgeladen. Die App fragt die Cloud zusätzlich alle 30 Sekunden ab, solange sie geöffnet ist. Beim ersten Verbinden eines Geräts mit vorhandenen Inhalten wirst du gefragt, welche Version übernommen werden soll. Die Film- und Serien-Watchlist wird ebenfalls zwischen deinen Geräten synchronisiert.

In der Watchlist kannst du Filme und Serien eintragen, optional den Streamingdienst notieren, ihren Status auf „Auf der Liste“, „Schaue ich“ oder „Gesehen“ setzen und über das Filmroulette zufällig einen noch offenen Titel auswählen.

Der Ausgaben-Tracker speichert Beträge in Euro mit Datum, Notiz und festen Kategorien. Er zeigt Monatsgesamtsummen und eine Aufschlüsselung nach Kategorien; du kannst Monate ansehen und die Liste nach Kategorie filtern. Ausgaben werden wie die übrigen Daten lokal gespeichert, mit der Cloud synchronisiert und in Sicherungen aufgenommen.

Im Spiele-Backlog kannst du Spiele mit Plattform, Status und optionaler Notiz festhalten. Filtere nach „Als Nächstes“, „Spiele ich“ oder „Durchgespielt“ und lass dir zufällig ein Spiel aus deiner „Als Nächstes“-Liste auswählen. Deine Spiele werden lokal gespeichert, mit deinem Cloud-Konto synchronisiert und in Sicherungen einbezogen.

Nur der öffentliche Supabase-Client-Key gehört in `cloud-config.js`; **niemals** dort einen `service_role`-Key eintragen oder veröffentlichen. Der SQL-Aufbau aktiviert Row Level Security und beschränkt Datenbankzugriffe auf das jeweilige angemeldete Konto. Das Cloud-Konto ist vom GitHub-Konto für App-Releases getrennt.

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

Die erste automatische Aktualisierung funktioniert erst, nachdem eine App-Version mit integriertem Updater einmal installiert wurde.
