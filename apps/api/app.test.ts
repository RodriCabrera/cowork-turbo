import { App } from './app'

describe('Server to instantiate correctly', () => {
  const app = new App('8070', 'Testing server')
  afterAll(() => app.stop())
  it('Should run without errors', () => {
    app.start()
    expect(app.port).toBe('8070')
  })
})
