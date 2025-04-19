// src/pages/admin/CreatePollPage.jsx
import React,{ useState } from 'react';
// import API from '../../api/axios';

const CreatePollPage = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']); // 2 default options
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length <= 2) return; // keep minimum 2
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Create Poll:', { title, options });
    // try {
    //   const res = await API.post('/admin/create-poll', { title, options });
    //   setMessage('Poll created successfully!');
    //   setTitle('');
    //   setOptions(['', '']);
    // } catch (err) {
    //   setMessage(err.response?.data?.message || 'Error creating poll');
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create New Poll</h2>

        {message && <p className="text-center text-sm mb-4 text-green-600">{message}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Poll Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Options</label>
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 text-sm mt-1 hover:underline"
          >
            + Add Option
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white mt-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePollPage;
