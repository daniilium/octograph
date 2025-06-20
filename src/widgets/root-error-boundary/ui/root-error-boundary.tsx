import React, { Component, ErrorInfo } from 'react'

import { ErrorMessage } from './error-message'

type State = {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

type Props = {
  children: React.ReactNode
}

export class RootErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      )
    }

    return this.props.children
  }
}

export default RootErrorBoundary
