import { ClassValue, clsx } from 'clsx'
import { MutableRefObject, Ref } from 'react'
import { twMerge } from 'tailwind-merge'
import { MaterialInput } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToSection = (id) => {
  const targetSection = document.querySelector(id)

  if (targetSection) {
    const y = targetSection.getBoundingClientRect().top + window.pageYOffset

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    })
  }
}

export function groupBy<T, S extends string>(xs: T[], selector: (x: T) => S): { [key in S]: T[] } {
  return xs.reduce(function (rv, x) {
    ;(rv[selector(x)] = rv[selector(x)] || []).push(x)
    return rv
  }, {} as { [key in S]: T[] })
}

export const applyMaterials = (ref: MutableRefObject<any>, materials: MaterialInput[]) => {
  if (ref.current) {
    ref.current.traverse((child) => {
      if (child.isMesh) {
        // console.log(child.material.name)
        const material = materials.find(({ name }) => name === child.material.name)
        if (material) {
          child.material = material.material
        }
      }
    })
  }
}
