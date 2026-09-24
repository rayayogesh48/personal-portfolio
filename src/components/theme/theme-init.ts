export type Theme = "system" | "light" | "dark";
export const themeStorageKey = "portfolio-theme";
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${themeStorageKey}');document.documentElement.dataset.theme=t==='light'||t==='dark'||t==='system'?t:'dark'}catch(e){}})()`;
