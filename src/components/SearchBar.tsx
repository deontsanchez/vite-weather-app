import { useState, useEffect, FC } from 'react';
import { Location, searchLocations } from '../utils/api';

interface SearchBarProps {
  onSelectLocation: (location: Location) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState<string>('');
  const [initialQuery, setInitialQuery] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInitialQuery(value);
    setQuery(value);
    setError(null); // Clear error when user types
  };

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 3) {
        setIsLoading(true);
        setError(null);
        const result = await searchLocations(query);
        if (result.error) {
          setError(result.error);
          setLocations([]);
          setShowDropdown(false);
        } else {
          setLocations(result.locations);
          setShowDropdown(result.locations.length > 0);
        }
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
    setInitialQuery(
      location.LocalizedName +
        ', ' +
        location.AdministrativeArea.LocalizedName +
        ', ' +
        location.Country.LocalizedName
    );
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={initialQuery}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Error message display */}
      {error && <div className="mt-1 ml-4 text-sm text-red-600">{error}</div>}

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
