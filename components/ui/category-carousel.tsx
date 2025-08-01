"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryCarouselProps {
  children: React.ReactNode
}

export function CategoryCarousel({ children }: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    direction: "rtl",
  })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative -mx-4 px-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2">{children}</div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md hidden sm:flex"
        onClick={scrollPrev}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md hidden sm:flex"
        onClick={scrollNext}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
    </div>
  )
}
