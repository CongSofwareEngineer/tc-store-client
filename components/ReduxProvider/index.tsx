'use client'

// import storeRedux, { persistor } from '@/Redux/store'
import storeRedux from '@/redux/store'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { PersistGate } from 'redux-persist/integration/react'
// import LoadingFirstPage from '../LoadingFirstPage'

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={storeRedux}>
      {/* <PersistGate persistor={persistor} /> */}

      {children}
    </Provider>
  )
}

export default ReduxProvider
