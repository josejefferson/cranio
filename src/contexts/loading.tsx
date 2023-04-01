import { createContext, useContext, useState } from 'react'
import Loading from '@/components/Loading'

const LoadingContext = createContext({})

export function LoadingProvider({ children }: any) {
  let sharedState = {
    loading: useState(false),
    text: useState('Aguarde')
  }

  return (
    <LoadingContext.Provider value={sharedState}>
      {children}
      <Loading loading={sharedState.loading[0]} text={sharedState.text[0]} />
    </LoadingContext.Provider>
  )
}

export function useLoadingContext() {
  const { loading: loadingState, text: textState }: any = useContext(LoadingContext)
  const [loading, setLoading] = loadingState
  const [text, setText] = textState

  return (newLoadingState: boolean, newText?: string) => {
    if (newLoadingState) setText(newText)
    setLoading(newLoadingState)
  }
}
