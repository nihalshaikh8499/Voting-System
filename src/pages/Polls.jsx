import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get('/polls')
      .then(r => setPolls(r.data))
      .catch(console.error);
  }, []);

  const vote = async (pollId, optId) => {
    try {
      const { data } = await API.post(`/polls/${pollId}/vote`, { optionId: optId });
      setPolls(prev => prev.map(p => p._id === pollId ? data : p));
    } catch (err) {
      alert(err.response?.data?.msg || 'Vote failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Polls</h2>
          <div className="flex gap-3">
            <button
              onClick={() => nav('/create')}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Create Poll
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                nav('/login');
              }}
              className="bg-red-600  hover:bg-red-700 text-gray-100 px-4 py-2 rounded-lg font-bold cursor-pointer" 
            >
              Logout
            </button>
          </div>
        </div>

        {polls.map(p => {
          const total = p.options.reduce((sum, o) => sum + o.votes, 0);
          return (
            <div key={p._id} className="bg-white p-6 rounded-xl shadow mb-6">
              <p className="text-lg font-semibold mb-4 text-gray-700">{p.question}</p>
              {p.options.map(o => {
                const pct = total ? (o.votes / total) * 100 : 0;
                const isClickable = !p.userVote;
                return (
                  <div key={o._id} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">{o.text}</span>
                      <span className="text-xs text-gray-500">{o.votes} votes</span>
                    </div>
                    <div
                      className={`w-full h-5 rounded-md bg-gray-200 overflow-hidden cursor-pointer ${
                        isClickable ? 'hover:bg-gray-300' : 'cursor-not-allowed'
                      }`}
                      onClick={() => isClickable && vote(p._id, o._id)}
                    >
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {p.userVote && (
                <p className="text-sm text-blue-600 mt-2">You have voted</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
