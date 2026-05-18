import { useEffect, useMemo, useState } from "react";
import APIService from "../utils/apiService";

const apiService = new APIService(import.meta.env.VITE_BACKEND_URL);
const { get } = apiService;

const GET_ARTICLES = `
  query GetArticles($host: String!) {
    publication(host: $host) {
      posts(first: 10) {
        edges {
          node {
            title
            brief
            slug
            content { html }
            coverImage { url }
            publishedAt
            readTimeInMinutes
            tags { name }
          }
        }
      }
    }
  }
`;

const articeAPIService = new APIService();

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
          setError(
            error.message || "An error occurred while fetching projects",
          );
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

const getArticlesFromHashnode = async () => {
  const response = await articeAPIService.post(
    import.meta.env.VITE_HASHNODE_ENDPOINT,
    {
      query: GET_ARTICLES,
      variables: { host: import.meta.env.VITE_MY_HASHNODE_URL },
    },
    {
      "Content-Type": "application/json",
      Authorization: import.meta.env.VITE_HASHNODE_API_KEY,
    },
  );
  return response;
};

const useGetArticlesFromHashnode = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const articles = await getArticlesFromHashnode();
        setData(articles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { loading, data, error };
};

export { useGetAllProjects, useGetArticlesFromHashnode };
