import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setLoading,
  setError,
  addMeme,
  setGeneratedMeme,
} from '../store/slices/memeGeneratorSlice';

const MemeGenerator: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, generatedMeme } = useSelector(
    (state: RootState) => state.memeGenerator
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('funny');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(setError('Please connect your wallet to generate memes'));
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await fetch('/api/v1/memes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, style }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate meme');
      }

      const data = await response.json();
      dispatch(setGeneratedMeme(data));
    } catch (err) {
      dispatch(setError((err as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSave = async () => {
    if (!generatedMeme) return;

    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/v1/memes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedMeme),
      });

      if (!response.ok) {
        throw new Error('Failed to save meme');
      }

      const savedMeme = await response.json();
      dispatch(addMeme(savedMeme));
      dispatch(setGeneratedMeme(null));
    } catch (err) {
      dispatch(setError((err as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Environmental Meme Generator
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg mb-8">
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-gray-700 mb-2">
            Describe your environmental meme
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
            placeholder="E.g., A funny meme about recycling plastic bottles"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="style" className="block text-gray-700 mb-2">
            Meme Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="funny">Funny</option>
            <option value="serious">Serious</option>
            <option value="educational">Educational</option>
            <option value="inspiring">Inspiring</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-400"
        >
          {loading ? 'Generating...' : 'Generate Meme'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {generatedMeme && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src={generatedMeme.imageUrl}
            alt={generatedMeme.text}
            className="w-full max-w-md mx-auto mb-4"
          />
          <div className="text-center">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
            >
              Save Meme
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeGenerator; 