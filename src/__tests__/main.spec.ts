describe('entry.ts', () => {
  it('should render app in #app', () => {
    document.body.innerHTML = '<div id="app"></div>'

    require('../main')

    const pElement = document.getElementsByClassName('schema')
    expect(pElement.length).toBeTruthy()
  })
})
