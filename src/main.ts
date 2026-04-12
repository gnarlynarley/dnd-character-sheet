import { mount } from "svelte";
import "./app.scss";
import App from "./App.svelte";

const target = document.getElementById("app");
if (!target) throw new Error("Missing target to mount to.");
const app = mount(App, {
	target,
});

export default app;
