import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'

const APP_ROOT = new URL('../', import.meta.url)

const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

// Porta e host definidos dinamicamente pela Vercel
const port = process.env.PORT || 3333
const host = '0.0.0.0'

new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booting(async () => {
      await import('#start/env')
    })
    app.listen('SIGTERM', () => app.terminate())
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
  })
  .httpServer()
  //@ts-expect-error ignore
  .start((server) => {
    //@ts-expect-error ignore
    server.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`)
    })
  })
  .catch((error) => {
    process.exitCode = 1
    prettyPrintError(error)
  })
