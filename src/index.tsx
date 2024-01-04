/* @refresh reload */
import { render } from "solid-js/web";

import "@lastfm-viewer/ui";

import App from "./App";

const root = document.getElementById("root");

render(() => <App />, root!);
