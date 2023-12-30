import 'express-session'

declare module 'express-session' {
  export interface SessionData {
    user: Record<string> // declara mas não inicializa
  }
}
