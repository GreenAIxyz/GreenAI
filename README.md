# GreenAI Project

<div align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="200" height="200">
  <!-- Definitions -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a" />
      <stop offset="100%" style="stop-color:#1a1a1a" />
    </linearGradient>
    <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00E676" />
      <stop offset="100%" style="stop-color:#00B0FF" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="softShadow">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#00E676" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Main Background -->
  <circle cx="250" cy="250" r="240" fill="url(#bgGradient)" />
  
  <!-- Tech Circuit Ring -->
  <g transform="translate(250, 250)">
    <circle cx="0" cy="0" r="210" fill="none" stroke="url(#circuitGradient)" stroke-width="2" 
            stroke-dasharray="1,8" opacity="0.5" />
    <circle cx="0" cy="0" r="220" fill="none" stroke="url(#circuitGradient)" stroke-width="1" 
            stroke-dasharray="1,15" opacity="0.3" />
    <circle cx="0" cy="0" r="200" fill="none" stroke="url(#circuitGradient)" stroke-width="1.5" 
            stroke-dasharray="10,5" opacity="0.4" />
  </g>
  
  <!-- Neural Network Elements -->
  <g transform="translate(250, 250)">
    <!-- Outer Ring Nodes -->
    <g id="outerNodes">
      <circle cx="0" cy="-170" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="120" cy="-120" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="170" cy="0" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="120" cy="120" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="0" cy="170" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="-120" cy="120" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="-170" cy="0" r="8" fill="#00E676" filter="url(#glow)" />
      <circle cx="-120" cy="-120" r="8" fill="#00E676" filter="url(#glow)" />
    </g>
    
    <!-- Middle Ring Nodes -->
    <g id="midNodes">
      <circle cx="0" cy="-100" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="70" cy="-70" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="100" cy="0" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="70" cy="70" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="0" cy="100" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="-70" cy="70" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="-100" cy="0" r="6" fill="#00B0FF" filter="url(#glow)" />
      <circle cx="-70" cy="-70" r="6" fill="#00B0FF" filter="url(#glow)" />
    </g>
    
    <!-- Center Node -->
    <circle cx="0" cy="0" r="20" fill="#FFFFFF" filter="url(#softShadow)" />
    
    <!-- Connection Lines -->
    <g stroke="url(#circuitGradient)" stroke-width="1.5" fill="none" opacity="0.7">
      <!-- Outer to Mid Connections -->
      <path d="M0,-170 L0,-100" />
      <path d="M120,-120 L70,-70" />
      <path d="M170,0 L100,0" />
      <path d="M120,120 L70,70" />
      <path d="M0,170 L0,100" />
      <path d="M-120,120 L-70,70" />
      <path d="M-170,0 L-100,0" />
      <path d="M-120,-120 L-70,-70" />
      
      <!-- Mid to Center Connections -->
      <path d="M0,-100 L0,0" />
      <path d="M70,-70 L0,0" />
      <path d="M100,0 L0,0" />
      <path d="M70,70 L0,0" />
      <path d="M0,100 L0,0" />
      <path d="M-70,70 L0,0" />
      <path d="M-100,0 L0,0" />
      <path d="M-70,-70 L0,0" />
      
      <!-- Cross Connections -->
      <path d="M0,-170 C-50,-120 -50,-80 -100,0" />
      <path d="M170,0 C120,50 80,50 0,100" />
      <path d="M-170,0 C-120,-50 -80,-50 0,-100" />
      <path d="M0,170 C50,120 50,80 100,0" />
    </g>
  </g>
  
  <!-- Animated Data Flow (Static in SVG) -->
  <g opacity="0.8">
    <circle cx="250" cy="80" r="4" fill="#FFFFFF" />
    <circle cx="370" cy="130" r="4" fill="#FFFFFF" />
    <circle cx="420" cy="250" r="4" fill="#FFFFFF" />
    <circle cx="370" cy="370" r="4" fill="#FFFFFF" />
    <circle cx="250" cy="420" r="4" fill="#FFFFFF" />
    <circle cx="130" cy="370" r="4" fill="#FFFFFF" />
    <circle cx="80" cy="250" r="4" fill="#FFFFFF" />
    <circle cx="130" cy="130" r="4" fill="#FFFFFF" />
  </g>
  
  <!-- Center Element -->
  <g transform="translate(250, 250)">
    <!-- Leaf-AI Fusion Symbol -->
    <path d="M0,-15 C20,0 20,0 0,15 C-20,0 -20,0 0,-15 Z" fill="#00E676" />
    <path d="M-15,0 C0,-20 0,-20 15,0 C0,20 0,20 -15,0 Z" fill="#00B0FF" />
    
    <!-- Circuit Detail -->
    <path d="M-10,-10 L10,10 M-10,10 L10,-10" stroke="#FFFFFF" stroke-width="2" />
  </g>
</svg>
</div>

A decentralized platform that combines AI-powered meme generation with environmental action tracking on the Solana blockchain.

## Overview

GreenAI is an innovative platform that encourages environmental consciousness through the creative use of AI-generated memes and blockchain technology. Users can create memes about environmental issues, track their environmental actions, and earn rewards for their positive impact.

## Key Features

- AI-powered meme generation focused on environmental themes
- Environmental action tracking and verification
- Solana blockchain integration for transparent reward distribution
- NFT minting for verified environmental actions
- Community engagement through meme sharing and voting
- Real-time impact visualization

## System Architecture

The project follows a modern microservices architecture:

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express and TypeORM
- **Smart Contracts**: Solana (Rust)
- **Database**: PostgreSQL
- **File Storage**: IPFS
- **AI Services**: OpenAI GPT-4 and DALL-E

## Technical Stack

### Frontend
- React.js 18+
- TypeScript
- Redux Toolkit
- TailwindCSS
- Web3.js

### Backend
- Node.js
- Express.js
- TypeORM
- PostgreSQL
- JWT Authentication

### Blockchain
- Solana
- Anchor Framework
- Rust

### DevOps
- Docker
- GitHub Actions
- AWS (ECS, RDS, S3)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/GreenAIxyz/GreenAI.git
   cd GreenAI
   ```

2. Install dependencies:
   ```bash
   npm install
   cd apps/frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development environment:
   ```bash
   docker-compose up
   ```

## Core Features

### Meme Generation
- AI-powered meme creation using environmental themes
- Custom template support
- Text-to-image generation
- Style transfer options

### Environmental Action Tracking
- Action verification system
- Impact calculation
- Progress tracking
- Reward distribution

### Blockchain Integration
- Smart contract interaction
- NFT minting
- Token rewards
- Transaction history

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- Website: [https://www.greenai.work](https://www.greenai.work)
- Twitter: [@greenaiwork](https://x.com/greenaiwork)

Built with 💚 by the GreenAI Team 