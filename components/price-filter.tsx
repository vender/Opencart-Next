"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "#/components/ui/input-clean"
import { Label } from "#/components/ui/label"

interface PriceFilterProps {
  onPriceChange?: (min: number, max: number) => void
  minPrice?: number
  maxPrice?: number
  currency?: string
}

export function PriceFilter({ onPriceChange, minPrice = 0, maxPrice = 1000, currency = "₽" }: PriceFilterProps) {
  const [min, setMin] = useState<number | undefined>(minPrice)
  const [max, setMax] = useState<number | undefined>(maxPrice)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value)
    setMin(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : Number(e.target.value)
    setMax(value)
  }

  const handleMinBlur = () => {
    if (min !== undefined && max !== undefined && onPriceChange) {
      onPriceChange(min, max)
    }
  }

  const handleMaxBlur = () => {
    if (min !== undefined && max !== undefined && onPriceChange) {
      onPriceChange(min, max)
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Цена</div>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Label htmlFor="min-price" className="sr-only">
            Минимальная цена
          </Label>
          <div className="relative">
            <Input
              id="min-price"
              type="number"
              placeholder="От"
              value={min === undefined ? "" : min}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
              min={0}
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{currency}</span>
          </div>
        </div>
        <div className="flex-1">
          <Label htmlFor="max-price" className="sr-only">
            Максимальная цена
          </Label>
          <div className="relative">
            <Input
              id="max-price"
              type="number"
              placeholder="До"
              value={max === undefined ? "" : max}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
              min={0}
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{currency}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
