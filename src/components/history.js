import { createHashHistory } from 'history'

export default createHashHistory({
  basename: '/', // The base URL of the app (see below)
  hashType: 'slash' // The hash type to use (see below)
  // A function to use to confirm navigation with the user (see below)
})
