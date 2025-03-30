import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/userSlice';
import WalletButton from '../WalletButton';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            GreenAI
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/meme-generator" className="hover:text-green-200">
              Meme Generator
            </Link>
            <Link to="/environmental-actions" className="hover:text-green-200">
              Actions
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-green-200">
                  Profile
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    Score: {currentUser?.environmentalScore || 0}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <WalletButton />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 