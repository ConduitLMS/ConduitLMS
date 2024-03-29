import * as firebaseAuth from '@firebase/auth'
import { ConfigProvider, theme } from 'antd'
import { initializeApp, getApp, getApps } from 'firebase/app'
import { RecoilRoot } from 'recoil'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
// Recoil Root for statemanagemnt

import './i18n'

import './scaffold.css'
import './index.css'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const firebaseApp = ((config) => {
  const apps = getApps()
  if (!apps.length) {
    initializeApp(config)
  }
  return getApp()
})(firebaseConfig)

export const firebaseClient = {
  firebaseAuth,
  firebaseApp, // optional
}

//const myEnvironmentKey = new EnvironmentKey('My Environment')
//const myEnvironment = useMyRelayEnvironment()

function App() {
  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
          <AuthProvider>
            <RedwoodApolloProvider useAuth={useAuth}>
              <RecoilRoot>
                <Routes />
              </RecoilRoot>
            </RedwoodApolloProvider>
          </AuthProvider>
        </RedwoodProvider>
      </ConfigProvider>
    </FatalErrorBoundary>
  )
}

export default App
