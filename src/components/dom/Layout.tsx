import { useRef, forwardRef, useImperativeHandle } from 'react'

const Layout = forwardRef(({ children, ...props }: any, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)
  return (
    <div
      {...props}
      ref={localRef}
      className='fixed top-0 left-0 z-0 w-screen h-screen overflow-x-hidden dom bg-zinc-900 text-gray-50'>
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
