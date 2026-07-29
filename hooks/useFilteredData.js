import { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';

// A custom hook to load, parse, and filter the 100k student records.
export default function useFilteredData(filters, search) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load CSV
    const loadCSV = async () => {
      try {
        const response = await fetch('/src/data/placement.csv'); // or use import
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setIsLoading(false);
          },
        });
      } catch (err) {
        console.error("Error loading CSV:", err);
        setIsLoading(false);
      }
    };
    loadCSV();
  }, []);

  // useMemo for heavy filtering calculation
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    
    return data.filter(student => {
      // Branch filter
      if (filters.branch && filters.branch !== 'All' && student.Branch !== filters.branch) return false;
      
      // Placement Status filter
      if (filters.status && filters.status !== 'All' && student.Placement_Status !== filters.status) return false;
      
      // Tier filter
      if (filters.tier && filters.tier !== 'All' && student.College_Tier !== filters.tier) return false;
      
      // Search term
      if (search) {
        const term = search.toLowerCase();
        if (
          !student.Student_ID.toLowerCase().includes(term) &&
          !student.Branch.toLowerCase().includes(term)
        ) {
          return false;
        }
      }
      
      return true;
    });
  }, [data, filters, search]);

  return { data: filteredData, isLoading, totalCount: data.length };
}
