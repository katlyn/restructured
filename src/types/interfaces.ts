export interface LayoutAtom {
  id: number
  symbol: string
  x: number
  y: number
  valenceElectrons: number
}

export interface LayoutBond {
  id: number,
  from: number
  to: number
  type: 'single'|'double'|'triple'
}

export interface Layout {
  atoms: LayoutAtom[]
  bonds: LayoutBond[]
}
