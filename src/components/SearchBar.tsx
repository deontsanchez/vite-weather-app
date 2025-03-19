import { useState, useEffect, FC } from 'react';
import { Location, searchLocations } from '../utils/api';

interface SearchBarProps {
  onSelectLocation: (location: Location) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 3) {
        setIsLoading(true);
        const results = await searchLocations(query);
        setLocations(results);
        setShowDropdown(results.length > 0);
        setIsLoading(false);
      } else {
        setLocations([]);
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleLocationSelect = (location: Location) => {
    onSelectLocation(location);
    setQuery(location.LocalizedName);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul>
            {locations.map(location => (
              <li
                key={location.Key}
                onClick={() => handleLocationSelect(location)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {location.LocalizedName},{' '}
                {location.AdministrativeArea.LocalizedName},{' '}
                {location.Country.LocalizedName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
