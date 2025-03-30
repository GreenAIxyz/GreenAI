import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { store } from '../store';
import { theme } from '../styles/theme';

// Default styles for wallet adapter
require('@solana/wallet-adapter-react-ui/styles.css');

// Network configuration
const network = clusterApiUrl('devnet');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Provider>
  );
}

export default MyApp; 