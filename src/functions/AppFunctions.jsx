export function isMobileScreen(){
  const screen = window.matchMedia('(min-width: 768px)')
  return screen
}

export function remToPixels(rem){
  const fontSize = parseFloat(getComputedStyle( document.documentElement).fontSize)
  return parseInt(rem * fontSize)
}