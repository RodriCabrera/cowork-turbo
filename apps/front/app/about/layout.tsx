import React, { PropsWithChildren } from 'react'

export const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <p>custom layout?</p>
      {children}
    </div>
  )
}
export default layout
