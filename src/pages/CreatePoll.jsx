import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';


export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const nav = useNavigate();

  const addOption = () => setOptions([...options, ""]);
  const updateOption = (idx, text) =>
    setOptions((opts) => opts.map((o, i) => (i === idx ? text : o)));

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/polls", { question, options });
    nav("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create a New Poll
        </h2>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <textarea
              placeholder="Enter your poll question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option {i + 1}
                </label>
                <input
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() =>
                    setOptions((opts) => opts.filter((_, idx) => idx !== i))
                  }
                  className="text-red-600 hover:text-red-800 mt-6"
                  title="Delete Option"
                >
                  <FaTrash size={18} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg"
          >
            + Add Option
          </button>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
            >
              Create Poll
            </button>
            <Link
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
