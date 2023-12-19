"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const dictionary = async () => {
    const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${searchTerm}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5811369c61msh422c3eb262c22c4p1943b9jsne7dc9874dd46',
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setDefinition(result['definition']);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  var { isLoading, data, refetch } = useQuery({
    queryKey: ['dictionary'],
    queryFn: dictionary,
    refetchOnWindowFocus: false,
    enabled: false 
  }
  );

  const handleClick = () => {
    refetch();
  };

  return (
    <main>
      <h1 className="text-8xl items-center pb-10 max-sm:pb-5 bg-gradient-to-r from-textGradientStart via-textGradientVia to-textGradientFrom font-bold inline-block text-transparent bg-clip-text">My Dictionary</h1>
      <div className="mb-3">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search for Meaning"
            aria-label="Search"
            aria-describedby="button-addon1"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg bg-blue-400"
            type="button"
            id="button-addon1"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <h1 className="text-5xl">Here is the Meaning:</h1>
            <span className="p-10"><br />{definition}</span>
          </div>
      </div>
    </main>
  );
}