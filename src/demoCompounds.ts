export const sulfurTrioxide = {
  atoms: [
    {
      id: '1',
      symbol: 'O',
      x: 100,
      y: 0,
      valenceElectrons: 6
    },
    {
      id: '6679cf92-f1eb-4234-89c7-34679bc6891d',
      symbol: 'S',
      valenceElectrons: 0,
      x: 100,
      y: 100
    },
    {
      id: '2241b64c-dfa0-450f-b89c-4a41a6c37ee3',
      symbol: 'O',
      valenceElectrons: 6,
      x: 200,
      y: 100
    },
    {
      id: '64ef3b90-1d71-409c-9086-ab7fce6ce138',
      symbol: 'O',
      valenceElectrons: 4,
      x: 0,
      y: 100
    }
  ],
  bonds: [
    {
      id: '2b62deea-1636-4132-b8a0-5d8091668e46',
      from: '1',
      to: '6679cf92-f1eb-4234-89c7-34679bc6891d',
      type: 'single'
    },
    {
      id: '61b8b703-4d89-4bd9-ae11-4c740a8cd1f8',
      from: '6679cf92-f1eb-4234-89c7-34679bc6891d',
      to: '2241b64c-dfa0-450f-b89c-4a41a6c37ee3',
      type: 'single'
    },
    {
      id: '7ecf1e68-2505-4660-8b34-4516c3bca899',
      from: '6679cf92-f1eb-4234-89c7-34679bc6891d',
      to: '64ef3b90-1d71-409c-9086-ab7fce6ce138',
      type: 'double'
    }
  ]
}

export const dihydrogenMonoxide = {
  atoms: [
    {
      id: '0',
      symbol: 'H',
      x: 0,
      y: 75,
      valenceElectrons: 0
    },
    {
      id: '1',
      symbol: 'O',
      x: 75,
      y: 0,
      valenceElectrons: 4
    },
    {
      id: '2',
      symbol: 'H',
      x: 150,
      y: 75,
      valenceElectrons: 0
    }
  ],
  bonds: [
    {
      id: '0',
      from: '0',
      to: '1',
      type: 'single'
    },
    {
      id: '1',
      from: '1',
      to: '2',
      type: 'single'
    }
  ]
}

export const presentationCompound = {
  atoms: [],
  bonds: []
}
