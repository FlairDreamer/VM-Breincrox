const launcherWindow = document.getElementById("launcher-window");
const myAlert = document.getElementById("my-alert");
const background = document.getElementById("black-background");
const myHelp = document.getElementById("my-help");
const tools = document.getElementById("tools");
const archives = document.getElementById("archives");
const file1 = document.getElementById("file-1");
const file2 = document.getElementById("file-2");
const folderBc3Aa = document.getElementById("folder-Bc3Aa");
const goBack = document.getElementById("go-back");
const folder = document.getElementById("folder");
const textFile = document.getElementById("text-file");

const folderTable = document.getElementById("folder-table");
let previousRow = null;
const titleArchives = document.getElementById("title-archives");
const titleFile1 = document.getElementById("title-file1");
const registerFile1 = document.getElementById("register-file1");
const titleFile2 = document.getElementById("title-file2");
const registerFile2 = document.getElementById("register-file2");
const returnArchives = document.getElementById("return-archives");
const closeArchives = document.getElementById("close-archives");
const routesBar = document.querySelector(".routes-bar");
const bottomBar = document.querySelector(".bottom-bar");
const myConsole = document.getElementById("my-console");
const loading = document.querySelector("#my-console > div");
const shuttingDownElement = document.getElementById("shutting-down");
const folderUnaccessible = document.querySelectorAll(".folder-unaccessible");

// Global variable for the player.
let player = null;
let player2 = null;
let player3 = null;

function onPlayerReady() {
  // Bind events.
  file1.addEventListener("dblclick", function () {
    setTimeout(function () {
      player.playVideo();
    }, 60);
  });
  file2.addEventListener("dblclick", function () {
    setTimeout(function () {
      player.playVideo();
    }, 60);
  });
  player3.addEventListener("onStateChange", (event) => {
    if (event.data === 0) {
      player3.playVideo();
    }
  });
}

// This function gets called when API is ready to use.

// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
  // Create the global player from the specific iframe.
  /* global YT */
  player = new YT.Player("sound-file", {
    events: {
      // Call this function when player is ready to use.
      onReady: onPlayerReady,
    },
  });

  player2 = new YT.Player("background-sound-1", {
    events: {
      onReady: onPlayerReady,
    },
  });

  player3 = new YT.Player("background-sound-2", {
    events: {
      onReady: onPlayerReady,
    },
  });
}
// Inject YouTube API script.
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const elementsId = [
  "launcher",
  "help",
  "tool-archives",
  "close-archives",
  "return-archives",
  "folder-Bc3Aa",
  "file-1",
  "file-2",
  "go-back",
  "exit",
];
// OPTIMIZE: I could use querySelectorAll for ids too.
const elementsClass = document.querySelectorAll(
  ".tool, .close, .folder-unaccessible"
);

function generateRandomSymbols() {
  const symbols = [
    "Æ",
    "Ç",
    "Ë",
    "Ï",
    "Ð",
    "Ñ",
    "Ø",
    "Ù",
    "Ý",
    "Þ",
    "ß",
    "â",
    "æ",
    "ç",
    "ë",
    "ï",
    "ñ",
    "ö",
    "ù",
    "ø",
    "ü",
    "ý",
    "þ",
    "ÿ",
    "╣",
    "║",
    "╗",
    "╝",
    "¢",
    "¥",
    "┐",
    "└",
    "┴",
    "┬",
    "├",
    "─",
    "┼",
    "╚",
    "╔",
    "╩",
    "╦",
    "╠",
    "=",
    "╬",
    "┘",
    "┌",
    "█",
    "▄",
  ];
  const randomSymbols = [];
  for (let i = 0; i < symbols.length; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    randomSymbols.push(symbols[randomIndex]);
  }
  return randomSymbols;
}

const symbols = generateRandomSymbols();

function encryptDate(date) {
  return date
    .split("/")
    .map((part) => {
      return part
        .split("")
        .map((char) => {
          if (/\d/.test(char)) {
            return symbols[parseInt(char)];
          }
          return char;
        })
        .join("");
    })
    .join("/");
}

function encryptTime(time) {
  return time
    .split("")
    .map((char) => {
      if (/\d/.test(char)) {
        return symbols[parseInt(char)];
      }
      return char;
    })
    .join("");
}

setInterval(() => {
  const date = new Date();
  const formattedDate =
    encryptDate(
      `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`
    ) +
    "<br>" +
    encryptTime(
      `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`
    );
  document.getElementById("date-hour").innerHTML = formattedDate;
}, 1000);

function generateRandomEncriptedDate() {
  function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  return (
    randomSymbol() +
    randomSymbol() +
    "/" +
    randomSymbol() +
    randomSymbol() +
    "/" +
    randomSymbol() +
    randomSymbol() +
    randomSymbol() +
    randomSymbol()
  );
}

const dateFolders = document.querySelectorAll(".dateFolder");

dateFolders.forEach((dateFolder) => {
  dateFolder.textContent = generateRandomEncriptedDate();
});

/**
 * Returns the CSS property of an element.
 * @param {string} element - The HTML element.
 * @param {string} property - The property you are looking for.
 * @returns {string} The name of the CSS property.
 */
function computedValue(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

function showFolderUnaccessible(trueOrFalse) {
  folderUnaccessible.forEach((folder) => {
    if (trueOrFalse === true) {
      folder.style.display = "table-row";
    } else {
      folder.style.display = "none";
    }
  });
}

// OPTIMIZE: I could use the events propagation, later.
elementsId.forEach((element) => {
  const theId = document.getElementById(element);
  theId.addEventListener("dblclick", () => {
    if (theId.id === "folder-Bc3Aa") {
      folderBc3Aa.style.display = "none";
      showFolderUnaccessible(false);
      goBack.style.display = "flex";
      file1.style.display = "table-row";
      file2.style.display = "table-row";
    }
    if (theId.id === "file-1") {
      routesBar.style.display = "none";
      titleArchives.style.display = "none";
      closeArchives.style.display = "none";
      folderTable.style.display = "none";
      registerFile1.style.display = "block";
      registerFile1.scrollTo(0, 0);
      bottomBar.style.display = "none";
      titleFile1.style.display = "flex";
      returnArchives.style.display = "flex";
      textFile.style.display = "flex";
      folder.style.backgroundColor = "var(--primary-colour)";
    }
    if (theId.id === "file-2") {
      routesBar.style.display = "none";
      titleArchives.style.display = "none";
      closeArchives.style.display = "none";
      folderTable.style.display = "none";
      registerFile2.style.display = "block";
      registerFile2.scrollTo(0, 0);
      bottomBar.style.display = "none";
      titleFile2.style.display = "flex";
      returnArchives.style.display = "flex";
      textFile.style.display = "flex";
      folder.style.backgroundColor = "var(--primary-colour)";
    }
  });
  theId.addEventListener("click", () => {
    if (theId.id === "launcher") {
      if (computedValue(launcherWindow, "display") === "none") {
        launcherWindow.style.display = "flex";
        tools.scrollTo(0, 0);
      } else {
        launcherWindow.style.display = "none";
      }
    }
    if (theId.id === "help") {
      background.style.display = "flex";
      myAlert.style.display = "none";
    }
    if (theId.id === "tool-archives") {
      launcherWindow.style.display = "none";
      file1.style.display = "none";
      file2.style.display = "none";
      folderBc3Aa.style.display = "table-row";
      goBack.style.display = "none";
      archives.style.display = "flex";
      folder.style.display = "flex";
      folderBc3Aa.style.backgroundColor = "transparent";
      folderBc3Aa.style.color = "white";
      file1.style.backgroundColor = "transparent";
      file1.style.color = "white";
      file2.style.backgroundColor = "transparent";
      file2.style.color = "white";
      titleFile1.style.display = "none";
      titleFile2.style.display = "none";
      returnArchives.style.display = "none";
      registerFile1.style.display = "none";
      registerFile2.style.display = "none";
      routesBar.style.display = "flex";
      titleArchives.style.display = "flex";
      closeArchives.style.display = "flex";
      folderTable.style.display = "table";
      bottomBar.style.display = "flex";
      folder.style.backgroundColor = "var(--thirdly-colour)";
      textFile.style.display = "none";
      showFolderUnaccessible(true);
      folderUnaccessible.forEach((folder) => {
        folder.style.backgroundColor = "transparent";
        folder.style.color = "white";
      });
    }
    if (theId.id === "close-archives") {
      archives.style.display = "none";
      folder.style.display = "none";
    }
    if (theId.id === "go-back") {
      file1.style.display = "none";
      file2.style.display = "none";
      goBack.style.display = "none";
      folderBc3Aa.style.display = "table-row";
      showFolderUnaccessible(true);
    }
    if (theId.id === "return-archives") {
      textFile.style.display = "none";
      folder.style.backgroundColor = "var(--thirdly-colour)";
      registerFile1.style.display = "none";
      registerFile2.style.display = "none";
      titleArchives.style.display = "flex";
      titleFile1.style.display = "none";
      titleFile2.style.display = "none";
      closeArchives.style.display = "flex";
      returnArchives.style.display = "none";
      bottomBar.style.display = "flex";
      folderTable.style.display = "table";
      routesBar.style.display = "flex";
    }
    if (theId.id === "exit") {
      monitor.style.animation = "fade-out 1.5s ease-in-out forwards";
      setTimeout(() => {
        myConsole.style.display = "flex";
        shuttingDownElement.style.display = "flex";
        monitor.style.display = "none";
        player2.pauseVideo();
      }, 1200);
    }
  });
});

elementsClass.forEach((element) => {
  const theClass = element.className;
  element.addEventListener("dblclick", () => {
    if (theClass === "folder-unaccessible") {
      if (computedValue(background, "display") === "none") {
        background.style.display = "flex";
        myHelp.style.display = "none";
      }
    }
  });

  element.addEventListener("click", () => {
    if (theClass === "tool") {
      if (computedValue(background, "display") === "none") {
        background.style.display = "flex";
        myHelp.style.display = "none";
      }
    }
    if (theClass === "close") {
      if (computedValue(background, "display") === "flex") {
        background.style.display = "none";
        myHelp.style.display = "flex";
        myAlert.style.display = "flex";
      }
    }
  });
});

// Controls the colours of the table by clicking.
for (let i = 1; i < folderTable.rows.length; i++) {
  const row = folderTable.rows[i];

  row.addEventListener("click", () => {
    if (previousRow) {
      previousRow.style.backgroundColor = "";
      previousRow.style.color = "";
    }
    if (
      row.id === "folder-Bc3Aa" ||
      row.id === "file-1" ||
      row.id === "file-2"
    ) {
      row.style.backgroundColor = "var(--thirdly-colour)";
      row.style.color = "white";
    } else {
      row.style.backgroundColor = "red";
      row.style.color = "lightcoral";
    }
    previousRow = row;
  });
}

const loadingTitle = new TypeIt("#loading-title", {
  cursor: false,
});
loadingTitle
  .type("CARGANDO", {
    instant: true,
  })
  .type("<span style='font-size: 1rem'> - </span>", { instant: true })
  .go();

/* global TypeIt */
const loadingDots = new TypeIt("#loading-dots", {
  cursor: false,
  deleteSpeed: 1,
  speed: 400,
});
loadingDots.type("... ", { loop: true }).go();

const monitor = document.getElementById("monitor");
const booting = new TypeIt("#booting", {
  speed: 1,
  cursor: false,
  afterComplete: async () => {
    loadingTitle.reset();
    loadingDots.reset();
    booting.reset();
    monitor.style.display = "flex";
    myConsole.style.display = "none";
    loading.style.display = "none";
  },
});
booting
  .type("Servicio")
  .break()
  .type("Público de")
  .break()
  .type("Ocio y")
  .break()
  .type("Recreación")
  .break()
  .type("Espacial")
  .break()
  .type("Para la")
  .break()
  .type("Educación, el")
  .break()
  .type("Desarrollo")
  .break()
  .type("Intercultural y la")
  .break()
  .type("Armonía")
  .break()
  .break()
  .type("Solicitando acceso")
  .break()
  .type("Verificando identidad")
  .break()
  .type("Identidad verificada")
  .break()
  .type("Buscando el nodo más cercano")
  .break()
  .type("Nodo encontrado: BRCX-01")
  .break()
  .type("Estableciendo conexión remota con el nodo BRCX-01")
  .break()
  .type("Enviando clave pública del dispositivo al nodo BRCX-01")
  .break()
  .type("Recibiendo clave pública del nodo BRCX-01")
  .break()
  .type("Generando clave simétrica para la comunicación segura")
  .break()
  .type(
    "Intercambiando clave simétrica con el nodo BRCX-01 usando cifrado asimétrico"
  )
  .break()
  .type("Estableciendo conexión segura con el nodo BRCX-01")
  .break()
  .type("Conexión establecida, acceso autorizado")
  .break()
  .pause(3500)
  .empty()
  .exec(async () => {
    player2.playVideo();
    player3.playVideo();
    player3.setVolume(15);
    /* This trick is for Opera's browsers. For some reason, only
          reproduces the video when there is some click on the window. */
    setInterval(() => {
      player2.playVideo();
      player3.playVideo();
    }, 1000);
  })
  .go();

const shuttingDown = new TypeIt("#shutting-down", {
  speed: 1,
  cursor: false,
  waitUntilVisible: true,
});
shuttingDown
  .pause(1500)
  .type("Desconectando de BRCX-01")
  .break()
  .type("Terminando la conexión segura con el nodo BRCX-01")
  .break()
  .type("Cerrando la sesión del usuario en el nodo BRCX-01")
  .break()
  .type("Liberando el recurso del nodo BRCX-01")
  .break()
  .type("Desconectado de BRCX-01")
  .break()
  .type("Enlazando con ")
  .options({ speed: 400 })
  .type("S P O R E P E D I A")
  .exec(() => {
    window.location.href = "https://www.sporepedia2.com";
  })
  .go();
