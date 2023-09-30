import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
