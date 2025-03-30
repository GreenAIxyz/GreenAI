import { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>GreenAI - Environmental Action Platform</title>
        <meta name="description" content="Convert environmental actions into tokens with AI-powered verification" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            Welcome to GreenAI
          </Typography>

          <Typography variant="h2" component="h2" gutterBottom>
            Convert Environmental Actions into Value
          </Typography>

          <Box sx={{ mt: 4 }}>
            <WalletMultiButton />
          </Box>

          <Typography variant="body1" sx={{ mt: 4, textAlign: 'center', maxWidth: 600 }}>
            GreenAI is a revolutionary platform that combines AI technology with blockchain
            to incentivize and verify environmental actions. Connect your wallet to start
            earning rewards for your eco-friendly activities.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home; 