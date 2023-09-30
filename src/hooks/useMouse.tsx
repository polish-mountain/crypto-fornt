import { useEffect, useState } from 'react'

type MousePosition = {
  mouseX: number
  mouseY: number
}
// mousePosition is value from 0 to 1000
const useMouse = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ mouseX: 0, mouseY: 0 })

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        mouseX: 1 - e.clientX / window.innerWidth - 0.5,
        mouseY: 1 - e.clientY / window.innerHeight - 0.5,
      })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  /* useEffect(() => {
    console.log(mousePosition)
  }) */

  return mousePosition
}
export default useMouse
