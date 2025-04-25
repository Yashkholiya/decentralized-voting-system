import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

// Custom auth context (handles identity from IdentityKit)
import { AuthProvider } from "./StateManagement/useContext/useClient";

// IdentityKit for authentication (supports NFID, Plug, Internet Identity)
import {
  IdentityKitProvider,
  IdentityKitTheme
} from "@nfid/identitykit/react";

import {
  IdentityKitAuthType,
  NFIDW,
  Plug,
  InternetIdentity
} from "@nfid/identitykit";

// IdentityKit default styling
import "@nfid/identitykit/react/styles.css";

// Supported identity providers (wallets)
const signers = [NFIDW, Plug, InternetIdentity];

// Canister ID for your voting smart contract (defined in .env)
const votingCanisterId = import.meta.env.CANISTER_ID_VOTING_BACKEND;

ReactDOM.createRoot(document.getElementById('root')).render(
  <IdentityKitProvider
    signers={signers}
    theme={IdentityKitTheme.SYSTEM} // SYSTEM, LIGHT, or DARK
    authType={IdentityKitAuthType.DELEGATION}
    signerClientOptions={{
      targets: [votingCanisterId], // important: targets voting canister
      retryTimes: 2
    }}
  >
    <React.StrictMode>
      <AuthProvider> {/* Provides login/logout and identity context */}
        <App /> {/* Main app (e.g., shows question, voting UI, etc.) */}
      </AuthProvider>
    </React.StrictMode>
  </IdentityKitProvider>
);
