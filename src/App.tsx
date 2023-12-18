import { useState } from 'react';
import RepoList from './components/RepoList';
import useDebounce from './hooks/useDebounce';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const delayQuery = useDebounce(searchTerm, 250);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center text-base overflow-hidden">
      <div className=" pt-16 md:w-3/4 w-10/12">
        <div>
          <h1 className="text-xl md:text-3xl mb-2">Search a repository as you like.</h1>
          <p className="text-base md:text-2xl text-slate-400">
            react related repositories by default.
          </p>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search a repository name"
            className="w-full p-4 mt-8 mb-8 border-solid border border-slate-400 focus-visible:outline-sky-600"
          />
        </div>
        <RepoList searchTerm={delayQuery} />
      </div>
    </div>
  );
}

export default App;
