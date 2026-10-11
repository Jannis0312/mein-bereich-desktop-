const { app, BrowserWindow, dialog, shell } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

autoUpdater.autoInstallOnAppQuit = true;

function openExternalUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch (error) {
    console.error("Externer Link konnte nicht geöffnet werden:", error);
    return;
  }
  if (url.protocol === "https:" || url.protocol === "http:") {
    shell.openExternal(url.href).catch(error => {
      console.error("Externer Link konnte nicht geöffnet werden:", error);
      dialog.showErrorBox("Link konnte nicht geöffnet werden", error.message);
    });
  }
}

async function createWindow() {
  const window = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 360,
    minHeight: 560,
    title: "Mein Bereich",
    backgroundColor: "#f6f6f2",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: "deny" };
  });

  await window.loadFile(path.join(__dirname, "index.html"));
  return window;
}

function showStartupError(error) {
  console.error("Mein Bereich konnte nicht gestartet werden:", error);
  dialog.showErrorBox("Mein Bereich konnte nicht gestartet werden", error.message);
  app.quit();
}

autoUpdater.on("error", error => {
  console.error("Die App konnte nicht nach Updates suchen oder ein Update installieren:", error);
  dialog.showErrorBox(
    "Update fehlgeschlagen",
    "Mein Bereich konnte nicht nach Updates suchen oder ein Update installieren. Bitte prüfe deine Internetverbindung und versuche es später erneut."
  );
});

autoUpdater.on("update-available", info => {
  console.info(`Update ${info.version} wird heruntergeladen.`);
});

autoUpdater.on("update-downloaded", async info => {
  try {
    const options = {
      type: "info",
      title: "Update bereit",
      message: `Mein Bereich ${info.version} wurde heruntergeladen.`,
      detail: "Starte die App jetzt neu, um das Update zu installieren. Wenn du „Später“ auswählst, wird es beim nächsten Schließen installiert.",
      buttons: ["Jetzt neu starten", "Später"],
      defaultId: 0,
      cancelId: 1
    };
    const parent = BrowserWindow.getFocusedWindow();
    const { response } = parent
      ? await dialog.showMessageBox(parent, options)
      : await dialog.showMessageBox(options);
    if (response === 0) autoUpdater.quitAndInstall();
  } catch (error) {
    console.error("Die Update-Installationsaufforderung konnte nicht angezeigt werden:", error);
    dialog.showErrorBox("Update bereit", "Das Update ist heruntergeladen und wird beim Schließen der App installiert.");
  }
});

app.whenReady().then(() => {
  app.setAppUserModelId("de.meinbereich.dashboard");
  createWindow().catch(showStartupError);
  if (app.isPackaged) {
    setTimeout(() => {
      autoUpdater.checkForUpdates().catch(error => {
        console.error("Die Updateprüfung ist fehlgeschlagen:", error);
      });
    }, 5000);
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow().catch(showStartupError);
    }
  });
}).catch(showStartupError);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
