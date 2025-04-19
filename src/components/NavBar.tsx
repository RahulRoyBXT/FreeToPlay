'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setSearchText, clearSearch } from "@/lib/redux/slices/searchSlice";
import { setSelectedPlatform } from "@/lib/redux/slices/platformSlice";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(state => state.search.searchText);
  const selectedPlatform = useAppSelector(state => state.platform.selectedPlatform);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  // Handle platform selection change
  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedPlatform(e.target.value));
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/90 backdrop-blur-md py-3 shadow-lg shadow-purple-500/20' 
          : 'bg-gradient-to-r from-indigo-900/80 to-purple-900/80 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="absolute inset-1 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-black text-xl">G</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                FreeToPlay
              </span>
              <span className="text-xs text-gray-300 -mt-1 tracking-widest">GAMING ZONE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-pink-400 ${pathname === '/' ? 'text-pink-500' : 'text-gray-200'}`}>
              Home
            </Link>
            <Link href="/popular" className={`text-sm font-medium transition-colors hover:text-pink-400 ${pathname === '/popular' ? 'text-pink-500' : 'text-gray-200'}`}>
              Popular
            </Link>
            <Link href="/new" className={`text-sm font-medium transition-colors hover:text-pink-400 ${pathname === '/new' ? 'text-pink-500' : 'text-gray-200'}`}>
              New Games
            </Link>
          </div>

          {/* Platform Selector with Gaming Styling */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <select
                name="platforms"
                id="platforms"
                className="appearance-none bg-gray-800/70 text-gray-200 px-4 py-2 pr-8 rounded-lg border border-purple-500/30 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:border-purple-500"
                value={selectedPlatform}
                onChange={handlePlatformChange}
              >
                <option value="">All Platforms</option>
                <optgroup label="PC-Games">
                  <option value="pc">PC Games</option>
                </optgroup>
                <optgroup label="Browser-Games">
                  <option value="browser">Browser Games</option>
                </optgroup>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Search input and button */}
            <div className="relative">
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="absolute right-0 top-0 w-48 md:w-56 lg:w-64 px-4 py-2 pr-10 rounded-lg bg-gray-800/90 text-gray-200 border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-400 text-sm transition-all"
                  autoFocus
                  onBlur={() => {
                    if (searchText === '') {
                      setShowSearch(false);
                    }
                  }}
                />
              )}
              <button 
                className="bg-gray-800/70 p-2 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all relative z-10"
                onClick={() => {
                  if (showSearch && searchText) {
                    dispatch(clearSearch());
                  }
                  setShowSearch(!showSearch);
                }}
              >
                {showSearch && searchText ? (
                  <svg className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg bg-gray-800/70 border border-purple-500/30"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="/" className={`block px-4 py-2 rounded-lg ${pathname === '/' ? 'bg-purple-900/50 text-pink-500' : 'text-gray-200 hover:bg-gray-800'}`}>
              Home
            </Link>
            <Link href="/popular" className={`block px-4 py-2 rounded-lg ${pathname === '/popular' ? 'bg-purple-900/50 text-pink-500' : 'text-gray-200 hover:bg-gray-800'}`}>
              Popular
            </Link>
            <Link href="/new" className={`block px-4 py-2 rounded-lg ${pathname === '/new' ? 'bg-purple-900/50 text-pink-500' : 'text-gray-200 hover:bg-gray-800'}`}>
              New Games
            </Link>
            
            {/* Mobile search input */}
            <div className="px-4 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800/90 text-gray-200 border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-400 text-sm"
                />
                {searchText && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => dispatch(clearSearch())}
                  >
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="px-4 py-3 space-y-2">
              <label className="text-sm font-medium text-gray-300">Select Platform</label>
              <select
                name="platformsMobile"
                className="w-full appearance-none bg-gray-800 text-gray-200 px-4 py-2 rounded-lg border border-purple-500/30 text-sm"
                value={selectedPlatform}
                onChange={handlePlatformChange}
              >
                <option value="">All Platforms</option>
                <optgroup label="PC-Games">
                  <option value="pc">PC Games</option>
                </optgroup>
                <optgroup label="Browser-Games">
                  <option value="browser">Browser Games</option>
                </optgroup>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Decorative element - RGB gaming line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </nav>
  );
};

export default NavBar;
