export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.classList.add(t);}else{document.documentElement.classList.add('dark');localStorage.setItem('theme','dark');}}catch(e){}})();`
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
