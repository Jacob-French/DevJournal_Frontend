export function isMobileScreen(){
  const screen = window.matchMedia('(min-width: 768px)')
  return screen
}