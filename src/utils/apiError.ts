export default class ApiError extends Error {
  public code: number
  public log: boolean
  public logStack: boolean

  /**
     * @param error.code
     * @param error.error
     * @param error.message
     * @param error.log
     * @param error.logStack
     */
  public constructor (error: { code?: number, error?: string, message?: any, log?: boolean, logStack?: boolean }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(error.error ?? error.message)

    this.code = error.code ?? 500
    this.message = error.error ?? error.message ?? undefined
    console.log(error)
    this.logStack = error.logStack ?? false
    this.log = error.log ?? false
  }

  public toString (): string | undefined {
    return this.logStack ?? process.env.NODE_ENV === 'development' ? this.stack : super.toString()
  }
}
