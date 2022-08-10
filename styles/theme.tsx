// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
import '@fontsource/manrope'

const fonts = {
  body: `Manrope, sans-serif`, 
}

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em'
}

// 2. Call `extendTheme` and pass your custom values
const customTheme = extendTheme({
  fonts,
  breakpoints,
})

export default customTheme;