import { useEffect, useState } from "react";
import APIService from "../utils/apiService";

const apiService = new APIService();
const { get } = apiService;

const useGetAllProjects = () => {
  const [allProjects, setAllProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await get("/projects");

      if (response.success) {
        setAllProjects(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch projects");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError(error.message || "An error occurred while fetching projects");
      setAllProjects(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const safeFetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await get("/projects");

        if (isMounted) {
          if (response.success) {
            setAllProjects(response.data);
          } else {
            throw new Error(response.message || "Failed to fetch projects");
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch projects:", error);
          setError(error.message || "An error occurred while fetching projects");
          setAllProjects(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    safeFetchProjects();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    projects: allProjects,
    loading,
    error,
    isEmpty: !loading && !error && (!allProjects || allProjects.length === 0),
    refetch: fetchProjects,
  };
};

export { useGetAllProjects };