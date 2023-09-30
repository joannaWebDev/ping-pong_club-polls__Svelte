import './app.css';
import App from './App.svelte';

const app = new App({
  /** 
  used <!> to silence Type 'HTMLElement | null' is not assignable to type 'Document | Element | ShadowRoot'.
  Type 'null' is not assignable to type 'Document | Element | ShadowRoot'.
  **/
  target: document.getElementById('app')!,
});

export default app;
