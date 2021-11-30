<template>
  <div class="presentation">
    <div class="content">
      <h2>How do we edit this?</h2>
      <code>
<pre>
{
  atoms: [
    {
      id: '0fe49d4e-7c66-430c-9947-a8a39906bdcf',
      symbol: 'H',
      valenceElectrons: 0,
      x: 0,
      y: 0
    },
    {
      id: '07578c1a-56ea-4b59-a901-4ba1bd389336',
      symbol: 'H',
      valenceElectrons: 0,
      x: 200,
      y: 0
    },
    {
      id: '976f24ee-aaee-4fdd-89f4-6f610e66318b',
      symbol: 'O',
      valenceElectrons: 2,
      x: 100,
      y: 0
    }
  ],
  bonds: [
    {
      id: 'f8689b4a-8d4a-467e-acb8-5e1a3b4cbc7a',
      from: '0fe49d4e-7c66-430c-9947-a8a39906bdcf',
      to: '976f24ee-aaee-4fdd-89f4-6f610e66318b',
      type: 'single'
    },
    {
      id: 'a49adfa4-810e-4ea5-9e47-5515600f011a',
      from: '976f24ee-aaee-4fdd-89f4-6f610e66318b',
      to: '07578c1a-56ea-4b59-a901-4ba1bd389336',
      type: 'single'
    }
  ]
}
</pre>
      </code>
    </div>
    <div class="slide-controls">
      <RouterLink to="/presentation/9">⮜ Previous</RouterLink>
      <RouterLink to="/presentation/11">Next ⮞</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
code {
  white-space: pre;
}
</style>
