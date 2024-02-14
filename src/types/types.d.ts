import 'express-session'

declare module 'express-session' {
  export interface SessionData {
    id?: string
    jwt?: string
  }
}
