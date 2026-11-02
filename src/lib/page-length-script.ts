/**
 * Runs before first paint (see layout.tsx), so the short version never flashes
 * the full page first. `?view=short` wins over the stored choice and is not
 * stored, which makes it a link you can send without changing anyone's setting.
 *
 * In its own module because the server layout needs the string, and anything
 * imported from preferences.ts would arrive as a client reference instead.
 */
export const PAGE_LENGTH_SCRIPT = `try{var v=new URLSearchParams(location.search).get("view")||localStorage.getItem("page-length");if(v==="short")document.documentElement.dataset.view="short"}catch(e){}`;
