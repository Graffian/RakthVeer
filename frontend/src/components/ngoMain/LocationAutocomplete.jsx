"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./InputDesign.module.css";

function LocationAutocomplete({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const inputRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Fetch location suggestions from OpenStreetMap Nominatim API
  const fetchSuggestions = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
        {
          headers: {
            "Accept-Language": "en",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } else {
        console.error("Failed to fetch location suggestions");
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useRef(
    debounce((query) => fetchSuggestions(query), 300),
  ).current;

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    const locationName = suggestion.display_name;
    setInputValue(locationName);
    onChange(locationName);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.locationAutocompleteContainer}>
      <input
        ref={inputRef}
        type="text"
        className={styles.inputField}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue.length >= 3 && setShowSuggestions(true)}
        placeholder="Enter location"
      />

      {isLoading && (
        <div className={styles.locationLoading}>
          <span className={styles.locationLoadingDot}></span>
          <span className={styles.locationLoadingDot}></span>
          <span className={styles.locationLoadingDot}></span>
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <ul ref={suggestionRef} className={styles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className={styles.suggestionItem}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              <div className={styles.suggestionContent}>
                <span className={styles.suggestionIcon}>📍</span>
                <div className={styles.suggestionText}>
                  <span className={styles.suggestionPrimary}>
                    {suggestion.name || suggestion.display_name.split(",")[0]}
                  </span>
                  <span className={styles.suggestionSecondary}>
                    {suggestion.display_name}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationAutocomplete;
