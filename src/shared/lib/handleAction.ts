// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function handleAction<S, P>(request: Function) {
  return async function (_prevState: S, payload: P) {
    try {
      const response = await request(payload)

      if (!response.ok) return { data: null, error: response.error }

      return { data: response, error: null }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e)

      return { data: null, error: errorMessage }
    }
  }
}
