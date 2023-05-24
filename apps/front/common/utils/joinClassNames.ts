export const joinClassNames = (...classes: Array<string>) =>
  classes.filter(Boolean).join(' ')
