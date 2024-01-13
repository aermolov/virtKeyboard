var Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    focusedTextArea: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    // main container
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // add css to main containers
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");

    // add elements to DOM
    document.body.append(this.elements.main);
    this.elements.main.append(this.elements.keysContainer);

    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    document.querySelectorAll(".use-keyboard-input").forEach((textArea) => {
      textArea.addEventListener("focus", () => {
        this.open(textArea, textArea.value);
      });
    });
  },

  _createKeys() {
    var fragment = document.createDocumentFragment();

    var keys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    // generate key icon

    var createInnerHtmlIcon = (icon) => {
      return `<i class="material-icons">${icon}</i>`;
    };

    keys.forEach((key) => {
      var keyElement = document.createElement("button");
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      var insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createInnerHtmlIcon("backspace");
          this.properties.value = this.properties.value.substring(
            0,
            this.properties.value.length - 1
          );
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._onInput();
          });
          break;
        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createInnerHtmlIcon("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });
          break;
        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createInnerHtmlIcon("keyboard_return");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + "\n";
            this._onInput();
          });
          break;
        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createInnerHtmlIcon("space_bar");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value + " ";
            this._onInput();
          });
          break;
        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createInnerHtmlIcon("check_circle");
          keyElement.addEventListener("click", () => {
            this.close();
          });
          break;
        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._onInput();
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (/^[a-zA-Z]$/.test(key.textContent)) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(textArea, initialValue) {
    this.elements.main.classList.remove("keyboard--hidden");
    this.elements.focusedTextArea = textArea;
    this.properties.value = initialValue || "";
  },

  close() {
    this.properties.value = "";
    this.elements.main.classList.add("keyboard--hidden");
  },

  _onInput() {
    this.elements.focusedTextArea.value = this.properties.value;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
