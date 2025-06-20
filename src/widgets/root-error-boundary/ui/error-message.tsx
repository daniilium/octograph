import { ErrorInfo } from 'react'

import { Link } from '@/shared/ui/atoms/link'
import { Subtitle } from '@/shared/ui/atoms/subtitle'
import { Title } from '@/shared/ui/atoms/title'

type Props = {
  error: Error | null
  errorInfo: ErrorInfo | null
}

export function ErrorMessage({ error, errorInfo }: Props) {
  return (
    <div style={{ padding: '30px' }}>
      <Title>Oops something went wrong</Title>
      <Subtitle style={{ marginBottom: '20px' }}>Please try again</Subtitle>

      <Link to="/logout" reloadDocument>
        Reset session and retry
      </Link>

      {import.meta.env.DEV && (
        <details style={{ marginTop: '20px' }}>
          <summary>Error</summary>
          {error && error.toString()}
          <br />
          {errorInfo && errorInfo.componentStack}
        </details>
      )}
    </div>
  )
}
