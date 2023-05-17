import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  --max-width: 900px;

  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
    "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
    "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;

  --primary-glow: conic-gradient(
    from 180deg at 50% 50%,
    #16abff33 0deg,
    #0885ff33 55deg,
    #54d6ff33 120deg,
    #0071ff33 160deg,
    transparent 360deg
  );
  --secondary-glow: radial-gradient(
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );

  @font-face {
    font-family: "NotoSansKR400";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url("/fonts/NotoSansKR-Regular.otf") format("opentype");
  }

  @font-face {
    font-family: "NotoSansKR500";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/NotoSansKR-Medium.otf") format("opentype");
  }

  @font-face {
    font-family: "NotoSansKR700";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("/fonts/NotoSansKR-Bold.otf") format("opentype");
  }

  @font-face {
    font-family: "HSBomBaram";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/HSBombaram2.1.ttf") format("woff2");
  }

  @font-face {
    font-family: "RidiBatang";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("/fonts/RIDIBatang.otf") format("opentype");
  }

  --tile-start-rgb: 239, 245, 249;
  --tile-end-rgb: 228, 232, 233;
  --tile-border: conic-gradient(
    #00000080,
    #00000040,
    #00000030,
    #00000020,
    #00000010,
    #00000010,
    #00000080
  );

  --callout-rgb: 238, 240, 241;
  --callout-border-rgb: 172, 175, 176;
  --card-rgb: 180, 185, 188;
  --card-border-rgb: 131, 134, 135;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;

    --primary-glow: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
    --secondary-glow: linear-gradient(
      to bottom right,
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0),
      rgba(1, 65, 255, 0.3)
    );

    --tile-start-rgb: 2, 13, 46;
    --tile-end-rgb: 2, 5, 19;
    --tile-border: conic-gradient(
      #ffffff80,
      #ffffff40,
      #ffffff30,
      #ffffff20,
      #ffffff10,
      #ffffff10,
      #ffffff80
    );

    --callout-rgb: 20, 20, 20;
    --callout-border-rgb: 108, 108, 108;
    --card-rgb: 100, 100, 100;
    --card-border-rgb: 200, 200, 200;
  }
}

* {
  box-sizing: border-box;
}

html {
  max-width: 900px;
  --color-background: #3d3a4b;
  --color-primary: #cca4fc;
  --color-light: #e3dfff;
  height: calc(var(--vh, 1vh) * 100);
  background-color: white;
}

@media (min-width: 901px) {
  html {
    margin-left: auto;
    margin-right: auto;
  }
}

body {
  font-family: "RidiBatang", "NotoSansKR400", "NotoSansKR500", "HSBomBaram", "NotoSansKR700",  
    sans-serif;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0rem;
  padding: 0;
  overflow-x: hidden;
  background: var(--color-background);
}
.scrollable {
  overflow: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
`;
