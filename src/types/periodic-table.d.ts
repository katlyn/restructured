// Type definitions for periodic-table 0.0
// Project: https://github.com/andrejewski/periodic-table
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'periodic-table' {
  export const csvFile: string

  export interface Element {
    atomicMass: string;
    atomicNumber: number;
    atomicRadius: number;
    boilingPoint: number;
    bondingType: string;
    cpkHexColor: string;
    density: number;
    electronAffinity: number;
    electronegativity: number;
    electronicConfiguration: string;
    groupBlock: string;
    ionRadius: string;
    ionizationEnergy: number;
    meltingPoint: number;
    name: string;
    oxidationStates: string;
    standardState: string;
    symbol: string;
    vanDelWaalsRadius: string;
    yearDiscovered: number;
  }

  export const elements: {
    [key: string]: Element
    Actinium: Element
    Aluminum: Element
    Americium: Element
    Antimony: Element
    Argon: Element
    Arsenic: Element
    Astatine: Element
    Barium: Element
    Berkelium: Element
    Beryllium: Element
    Bismuth: Element
    Bohrium: Element
    Boron: Element
    Bromine: Element
    Cadmium: Element
    Calcium: Element
    Californium: Element
    Carbon: Element
    Cerium: Element
    Cesium: Element
    Chlorine: Element
    Chromium: Element
    Cobalt: Element
    Copernicium: Element
    Copper: Element
    Curium: Element
    Darmstadtium: Element
    Dubnium: Element
    Dysprosium: Element
    Einsteinium: Element
    Erbium: Element
    Europium: Element
    Fermium: Element
    Flerovium: Element
    Fluorine: Element
    Francium: Element
    Gadolinium: Element
    Gallium: Element
    Germanium: Element
    Gold: Element
    Hafnium: Element
    Hassium: Element
    Helium: Element
    Holmium: Element
    Hydrogen: Element
    Indium: Element
    Iodine: Element
    Iridium: Element
    Iron: Element
    Krypton: Element
    Lanthanum: Element
    Lawrencium: Element
    Lead: Element
    Lithium: Element
    Livermorium: Element
    Lutetium: Element
    Magnesium: Element
    Manganese: Element
    Meitnerium: Element
    Mendelevium: Element
    Mercury: Element
    Molybdenum: Element
    Moscovium: Element
    Neodymium: Element
    Neon: Element
    Neptunium: Element
    Nickel: Element
    Nihonium: Element
    Niobium: Element
    Nitrogen: Element
    Nobelium: Element
    Oganesson: Element
    Osmium: Element
    Oxygen: Element
    Palladium: Element
    Phosphorus: Element
    Platinum: Element
    Plutonium: Element
    Polonium: Element
    Potassium: Element
    Praseodymium: Element
    Promethium: Element
    Protactinium: Element
    Radium: Element
    Radon: Element
    Rhenium: Element
    Rhodium: Element
    Roentgenium: Element
    Rubidium: Element
    Ruthenium: Element
    Rutherfordium: Element
    Samarium: Element
    Scandium: Element
    Seaborgium: Element
    Selenium: Element
    Silicon: Element
    Silver: Element
    Sodium: Element
    Strontium: Element
    Sulfur: Element
    Tantalum: Element
    Technetium: Element
    Tellurium: Element
    Tennessine: Element
    Terbium: Element
    Thallium: Element
    Thorium: Element
    Thulium: Element
    Tin: Element
    Titanium: Element
    Tungsten: Element
    Uranium: Element
    Vanadium: Element
    Xenon: Element
    Ytterbium: Element
    Yttrium: Element
    Zinc: Element
    Zirconium: Element
  }

  export const jsonFile: string

  export const numbers: Array<Element>

  export const symbols: {
    [key: string]: Element
    Ac: Element
    Ag: Element
    Al: Element
    Am: Element
    Ar: Element
    As: Element
    At: Element
    Au: Element
    B: Element
    Ba: Element
    Be: Element
    Bh: Element
    Bi: Element
    Bk: Element
    Br: Element
    C: Element
    Ca: Element
    Cd: Element
    Ce: Element
    Cf: Element
    Cl: Element
    Cm: Element
    Cn: Element
    Co: Element
    Cr: Element
    Cs: Element
    Cu: Element
    Db: Element
    Ds: Element
    Dy: Element
    Er: Element
    Es: Element
    Eu: Element
    F: Element
    Fe: Element
    Fl: Element
    Fm: Element
    Fr: Element
    Ga: Element
    Gd: Element
    Ge: Element
    H: Element
    He: Element
    Hf: Element
    Hg: Element
    Ho: Element
    Hs: Element
    I: Element
    In: Element
    Ir: Element
    K: Element
    Kr: Element
    La: Element
    Li: Element
    Lr: Element
    Lu: Element
    Lv: Element
    Mc: Element
    Md: Element
    Mg: Element
    Mn: Element
    Mo: Element
    Mt: Element
    N: Element
    Na: Element
    Nb: Element
    Nd: Element
    Ne: Element
    Nh: Element
    Ni: Element
    No: Element
    Np: Element
    O: Element
    Og: Element
    Os: Element
    P: Element
    Pa: Element
    Pb: Element
    Pd: Element
    Pm: Element
    Po: Element
    Pr: Element
    Pt: Element
    Pu: Element
    Ra: Element
    Rb: Element
    Re: Element
    Rf: Element
    Rg: Element
    Rh: Element
    Rn: Element
    Ru: Element
    S: Element
    Sb: Element
    Sc: Element
    Se: Element
    Sg: Element
    Si: Element
    Sm: Element
    Sn: Element
    Sr: Element
    Ta: Element
    Tb: Element
    Tc: Element
    Te: Element
    Th: Element
    Ti: Element
    Tl: Element
    Tm: Element
    Ts: Element
    U: Element
    V: Element
    W: Element
    Xe: Element
    Y: Element
    Yb: Element
    Zn: Element
    Zr: Element
  }
}
