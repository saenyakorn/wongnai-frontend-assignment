import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4D9BD8"
    },
    secondary: {
      main: "#323232"
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 560,
      md: 720,
      lg: 960,
      xl: 1080
    }
  },
  typography: {
    fontFamily: "Prompt, sans-serif"
  }
})

export default theme
