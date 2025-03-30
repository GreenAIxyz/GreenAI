import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home: React.FC = () => {
  const { isAuthenticated, currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Welcome to GreenAI
          </h1>
          <p className="text-xl text-green-600 mb-8">
            Combining AI-powered meme generation with environmental action tracking
          </p>
          {!isAuthenticated && (
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Connect your wallet to start making a difference
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Create Environmental Memes
            </h2>
            <p className="text-gray-600 mb-4">
              Use AI to generate impactful memes about environmental issues
            </p>
            <Link
              to="/meme-generator"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Start Creating
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Track Environmental Actions
            </h2>
            <p className="text-gray-600 mb-4">
              Record and verify your positive environmental impact
            </p>
            <Link
              to="/environmental-actions"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              View Actions
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Earn Rewards
            </h2>
            <p className="text-gray-600 mb-4">
              Get rewarded for your environmental contributions
            </p>
            {isAuthenticated ? (
              <div>
                <p className="text-lg font-semibold text-green-600 mb-2">
                  Your Score: {currentUser?.environmentalScore || 0}
                </p>
                <Link
                  to="/profile"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  View Profile
                </Link>
              </div>
            ) : (
              <p className="text-gray-500">Connect wallet to view rewards</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 