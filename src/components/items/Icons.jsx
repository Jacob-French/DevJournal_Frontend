export function MenuIcon({ className }){
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>
  )
}

export function CopyIcon({ className }){

  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="currentColor">
      <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
    </svg>
  )
}

export function TipsIcon({ className }){

  return(
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="currentColor">
      <path d="M480-680q17 0 28.5-11.5T520-720q0-17-11.5-28.5T480-760q-17 0-28.5 11.5T440-720q0 17 11.5 28.5T480-680Zm-40 320h80v-240h-80v240ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
    </svg>
  )
}

export function MoreIcon({ className }){
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="currentColor">
      <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
    </svg>
  )
}

export function MinimizeIcon({ className }){
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="currentColor">
      <path d="M240-440v-80h480v80H240Z"/>
    </svg>
  )
}

export function CloseIcon({ className }){

  return(
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="currentColor">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>
  )
}

export function InfoIcon({ className }){

  return(
    <svg 
      className={className}
      width="30" 
      height="30" 
      viewBox="0 0 30 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7136 22V11.0909H16.2846V22H13.7136ZM15.0062 9.54261C14.599 9.54261 14.2486 9.40767 13.9551 9.13778C13.6615 8.86316 13.5147 8.53409 13.5147 8.15057C13.5147 7.76231 13.6615 7.43324 13.9551 7.16335C14.2486 6.88873 14.599 6.75142 15.0062 6.75142C15.4181 6.75142 15.7685 6.88873 16.0574 7.16335C16.3509 7.43324 16.4977 7.76231 16.4977 8.15057C16.4977 8.53409 16.3509 8.86316 16.0574 9.13778C15.7685 9.40767 15.4181 9.54261 15.0062 9.54261Z" fill="currentColor"/>
      <circle cx="15" cy="15" r="12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export function Circle({ className }){
  return (
  <svg className={className} width="186" height="186" viewBox="0 0 186 186" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="93" cy="93" r="93" fill="currentColor"/>
    <defs>
      <clipPath id="clip0_1_2">
      <rect width="186" height="186" fill="white"/>
      </clipPath>
    </defs>
  </svg>
  )
}

export function Line({ className }){
  return (
    <svg 
      className={className} 
      preserveAspectRatio="none" 
      width="186" 
      height="186" 
      viewBox="0 0 186 186" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <line x1="93.5" y1="2.15032e-08" x2="93.5" y2="186" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}