// Theme switching with a circular reveal from the centre of the viewport.
// The keyframes are injected at call time because ::view-transition-new(root)
// only exists while a transition is running, and the animation has to be
// registered before startViewTransition captures the old state.
export function toggleTheme(
  currentTheme: string | undefined,
  setTheme: (theme: string) => void,
) {
  const styleId = `theme-transition-${Date.now()}`;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @supports (view-transition-name: root) {
      ::view-transition-old(root) {
        animation: none;
      }
      ::view-transition-new(root) {
        animation: circle-expand 0.4s ease-out;
        transform-origin: center;
      }
      @keyframes circle-expand {
        from { clip-path: circle(0% at 50% 50%); }
        to { clip-path: circle(150% at 50% 50%); }
      }
    }
  `;
  document.head.appendChild(style);

  const performToggle = () =>
    setTheme(currentTheme === "dark" ? "light" : "dark");

  if ("startViewTransition" in document) {
    document.startViewTransition(performToggle);
  } else {
    performToggle();
  }

  setTimeout(() => document.getElementById(styleId)?.remove(), 3000);
}
