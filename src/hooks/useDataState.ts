import { useState, useEffect, useMemo } from "react";
import appData from "@/data/appData.json";
import emptyData from "@/data/emptyData.json";

export interface DataState {
  isLoading: boolean;
  isEmpty: boolean;
  data: typeof appData;
}

export interface UseDataStateOptions {
  loadingTimeout?: number; // in milliseconds
  emptyTimer?: number; // in milliseconds
}

export const useDataState = (options: UseDataStateOptions = {}): DataState => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  // Destructure options with default values
  const {
    loadingTimeout = 2000, // Default: 2 seconds
    emptyTimer = 8000, // Default: 8 seconds
  } = options;

  // Memoize the data to prevent unnecessary re-renders and make it reactive
  const data = useMemo(() => {
    return isEmpty ? emptyData : appData;
  }, [isEmpty]);

  useEffect(() => {
    const loadingTimerId = setTimeout(() => {
      setIsLoading(false);
    }, loadingTimeout);

    const emptyTimerId = setTimeout(() => {
      setIsEmpty(false);
    }, emptyTimer);

    return () => {
      clearTimeout(loadingTimerId);
      clearTimeout(emptyTimerId);
    };
  }, [loadingTimeout, emptyTimer]);

  return {
    isLoading,
    isEmpty,
    data,
  };
};
