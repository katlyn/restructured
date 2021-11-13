export interface LayoutAtom {
  id: string
  symbol: string
  x: number
  y: number
  valenceElectrons: number
}

export interface LayoutBond {
  id: string,
  from: string
  to: string
  type: 'single'|'double'|'triple'|'quadrouple'
}

export interface Layout {
  atoms: LayoutAtom[]
  bonds: LayoutBond[]
}
