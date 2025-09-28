import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ProjectFilter from "../../components/ui/ProjectFilter";
import ScrollProgress from "../../components/ui/ScrollProgress";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectStats from "./components/ProjectStats";
import SortControls from "./components/SortControls";
import ProjectListItem from "./components/ProjectListItem";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Footer from "../../components/Footer";
import SkillsOverview from "./components/SkillsOverview";

const PortfolioProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const projectsPerPage = 12;

  // Mock Projects Data
  const mockProjects = [
    {
      id: 1,
      title: "Everything Gadget Accessories Store",
      description:
        "This project was one of the first projects that i completed all on my own using HTML and CSS, focusing on styling, layout (Flexbox), and making designs responsive for different screen sizes. I learned the process of responsive layout",
      fullDescription: `This project was one of the first projects that i completed all on my own using HTML and CSS, focusing on styling, layout (Flexbox), and making designs responsive for different screen sizes. I learned the process of responsive layout. This foundational project helped me understand the core principles of web development and responsive design patterns.`,
      image: "assets/images/downloadrr.png",
      images: ["assets/images/downloadrr.png"],
      technologies: ["HTML5", "CSS3", "Flexbox", "Responsive Design"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "https://jasin445.github.io/Everything_Gadget/",
      githubUrl: "https://github.com/Jasin445/Everything_Gadget",
      architecture:
        "The application follows a microservices architecture with separate services for authentication, inventory, orders, and analytics. The frontend uses React with Redux for state management and implements a component-based architecture for maximum reusability.",
      keyFeatures: [
        "Real-time analytics dashboard with interactive charts",
        "Advanced inventory management with low-stock alerts",
        "Order processing workflow with status tracking",
        "Customer management with detailed profiles",
        "Responsive design optimized for all devices",
        "Role-based access control and permissions",
        "Export functionality for reports and data",
      ],
      codeSnippet: `// Real-time dashboard hook
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io('/dashboard');
    
    socket.on('analytics-update', (newData) => {
      setData(newData);
      setLoading(false);
    });

    return () => socket.disconnect();
  }, []);

  return { data, loading };
};`,
      challenges: [
        {
          problem:
            "Managing real-time data updates across multiple dashboard components without causing performance issues or unnecessary re-renders.",
          solution:
            "Implemented a custom WebSocket hook with selective data subscriptions and used React.memo with proper dependency arrays to optimize rendering performance.",
        },
        {
          problem:
            "Handling large datasets in the inventory management section while maintaining smooth user experience.",
          solution:
            "Integrated react-window for virtualization and implemented server-side pagination with intelligent caching to handle thousands of products efficiently.",
        },
      ],
    },
    {
      id: 2,
      title: "Vidchill Creator Dashboard Page",
      description:
        "I leveraged advanced HTML and CSS techniques like Grid and Flexbox for complex layouts and for responsive tabulated data.",
      fullDescription: `I leveraged advanced HTML and CSS techniques like Grid and Flexbox for complex layouts and for responsive tabulated data. This project focused on creating sophisticated layouts using modern CSS technologies and ensuring optimal display across different devices.`,
      image: "assets/images/downloadiui.png",
      images: ["assets/images/downloadiui.png"],
      technologies: ["HTML5", "CSS3", "CSS Grid", "Flexbox"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "https://jasin445.github.io/dashboard/",
      githubUrl: "https://github.com/Jasin445/dashboard",
      architecture:
        "Built using React with TypeScript for type safety and Firebase for backend services. The application uses Context API for state management and implements a modular component architecture.",
      keyFeatures: [
        "Drag-and-drop task organization with Kanban boards",
        "Real-time collaboration with live updates",
        "Team member assignments and notifications",
        "Advanced filtering and search capabilities",
        "File attachments and comment system",
        "Progress tracking with visual indicators",
        "Mobile-responsive design with offline support",
      ],
      codeSnippet: `// Drag and drop task management
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTasks(items);
    updateTaskOrder(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Task columns */}
    </DragDropContext>
  );
};`,
      challenges: [
        {
          problem:
            "Implementing smooth drag-and-drop functionality while maintaining real-time synchronization across multiple users.",
          solution:
            "Used react-beautiful-dnd with optimistic updates and conflict resolution algorithms to ensure consistent state across all connected clients.",
        },
        {
          problem:
            "Managing complex permission systems for different team roles and project access levels.",
          solution:
            "Implemented a role-based access control system with Firebase Security Rules and created a custom hook for permission checking throughout the application.",
        },
      ],
    },
    {
      id: 3,
      title: "All Countries App",
      description:
        "My first dive into JavaScript! I built a fully functional Countries app where you could search for any country in the world and check foe specific informations, learning about DOM manipulation, event listeners, basic arithmetic operations, and handling user input.",
      fullDescription: `My first dive into JavaScript! I built a fully functional Countries app where you could search for any country in the world and check for specific informations, learning about DOM manipulation, event listeners, basic arithmetic operations, and handling user input. This project marked my transition from static HTML/CSS to dynamic, interactive web applications.`,
      image: "assets/images/countries.png",
      images: ["assets/images/countries.png"],
      technologies: ["HTML5", "CSS3", "JavaScript (Vanilla)"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "https://jasin445.github.io/countries/",
      githubUrl: "https://github.com/Jasin445/countries",
      architecture:
        "Single-page application built with React using functional components and hooks. Integrates with OpenWeather API and uses Chart.js for data visualization with responsive design patterns.",
      keyFeatures: [
        "Location-based weather detection with GPS integration",
        "7-day detailed weather forecasts",
        "Hourly weather predictions with charts",
        "Interactive weather maps with overlays",
        "Weather alerts and notifications",
        "Historical weather data analysis",
        "Beautiful animations and transitions",
      ],
      codeSnippet: `// Weather data fetching hook
const useWeatherData = (location) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await weatherAPI.getForecast(location);
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (location) fetchWeather();
  }, [location]);

  return { weather, loading, error };
};`,
      challenges: [
        {
          problem:
            "Handling multiple weather API calls efficiently while managing rate limits and ensuring data accuracy.",
          solution:
            "Implemented intelligent caching with localStorage, request debouncing, and fallback API sources to ensure reliable weather data delivery.",
        },
        {
          problem:
            "Creating smooth animations for weather transitions and data updates without impacting performance.",
          solution:
            "Used Framer Motion with optimized animation configurations and implemented lazy loading for weather charts to maintain 60fps performance.",
        },
      ],
    },
    {
      id: 4,
      title: "Dynamic To-Do List",
      description:
        "Implemented a to-do list with JavaScript, focusing on adding, deleting tasks. This taught me about array methods, local storage, and dynamic UI updates.",
      fullDescription: `Implemented a to-do list with JavaScript, focusing on adding, deleting tasks. This taught me about array methods, local storage, and dynamic UI updates. This project helped me understand state management in vanilla JavaScript and persistent data storage in the browser.`,
      image: "assets/images/todo-img.png",
      images: ["assets/images/todo-img.png"],
      technologies: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Local Storage"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "https://jasin445.github.io/to-do-app/",
      githubUrl: "https://github.com/Jasin445/to-do-app",
      architecture:
        "Full-stack application with React frontend and Node.js backend. Uses PostgreSQL for data persistence, Redis for caching and job queues, and integrates with multiple social media APIs.",
      keyFeatures: [
        "Multi-platform social media account management",
        "Advanced post scheduling with optimal timing suggestions",
        "Comprehensive analytics and reporting",
        "Content calendar with drag-and-drop interface",
        "Team collaboration and approval workflows",
        "Automated hashtag suggestions and content optimization",
        "Real-time engagement monitoring and alerts",
      ],
      codeSnippet: `// Social media post scheduler
const usePostScheduler = () => {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  
  const schedulePost = async (postData, scheduledTime) => {
    try {
      const response = await api.post('/schedule', {
        ...postData,
        scheduledTime,
        platforms: postData.selectedPlatforms
      });
      
      setScheduledPosts(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      throw new Error('Failed to schedule post');
    }
  };

  return { scheduledPosts, schedulePost };
};`,
      challenges: [
        {
          problem:
            "Managing rate limits and API restrictions across multiple social media platforms while ensuring reliable post delivery.",
          solution:
            "Implemented a queue-based system with Redis for job management and intelligent retry mechanisms with exponential backoff for failed posts.",
        },
        {
          problem:
            "Creating a unified interface for different social media platforms with varying content requirements and limitations.",
          solution:
            "Developed a flexible content adapter system that automatically formats posts according to each platform's requirements while providing real-time validation feedback.",
        },
      ],
    },
    {
      id: 5,
      title: "Giveaway Countdown Page",
      description:
        "Implemented a countdown timer for a phone giveaway event with JavaScript, focusing on countingdown in intervals and logging a message when the giveaway finally ends.",
      fullDescription: `Implemented a countdown timer for a phone giveaway event with JavaScript, focusing on counting down in intervals and logging a message when the giveaway finally ends. This project taught me about JavaScript timing functions, date manipulation, and creating dynamic user interfaces with real-time updates.`,
      image: "assets/images/give-away.png",
      images: ["assets/images/give-away.png"],
      technologies: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Local Storage"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "https://jasin445.github.io/countdown/",
      githubUrl: "https://github.com/Jasin445/countdown",
      architecture:
        "Static site built with React and optimized for performance. Uses Framer Motion for animations and implements modern web standards for accessibility and SEO.",
      keyFeatures: [
        "Responsive design optimized for all devices",
        "Smooth scroll animations and micro-interactions",
        "Interactive project showcases with live demos",
        "Contact form with validation and email integration",
        "Blog section with markdown support",
        "SEO optimized with meta tags and structured data",
        "Performance optimized with lazy loading and code splitting",
      ],
      codeSnippet: `// Smooth scroll animation hook
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};`,
      challenges: [
        {
          problem:
            "Achieving smooth animations while maintaining excellent performance scores across all devices and browsers.",
          solution:
            "Implemented optimized animation techniques using Framer Motion with proper will-change properties and GPU acceleration for smooth 60fps animations.",
        },
        {
          problem:
            "Creating an engaging user experience that effectively showcases technical skills without overwhelming visitors.",
          solution:
            "Designed a progressive disclosure interface with interactive elements that reveal information gradually, keeping users engaged while maintaining clean aesthetics.",
        },
      ],
    },
    {
      id: 6,
      title: "Tic-Tac-Toe Game",
      description:
        "My first project using React! I built an awesome game called Tic-Tac-Toe, where i got to understand component-based architecture, state management with `useState`, and passing props between components.",
      fullDescription: `My first project using React! I built an awesome game called Tic-Tac-Toe, where i got to understand component-based architecture, state management with useState, and passing props between components. This project marked my introduction to React and modern frontend development practices.`,
      image: "assets/images/tic-tac-toe.png",
      images: ["assets/images/tic-tac-toe.png"],
      technologies: ["React", "JavaScript", "CSS3"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "",
      githubUrl: "https://github.com/Jasin445/Tic-Tac-Toe",
      architecture:
        "Vue.js application with Vuex for state management. Integrates with Spoonacular API for recipe data and implements local storage for user preferences and saved recipes.",
      keyFeatures: [
        "Ingredient-based recipe search with smart suggestions",
        "Advanced filtering by dietary restrictions and preferences",
        "Detailed nutritional information and calorie tracking",
        "Meal planning with weekly calendar view",
        "Automatic shopping list generation",
        "Recipe rating and review system",
        "Cooking timers and step-by-step instructions",
      ],
      codeSnippet: `// Recipe search with ingredients
const searchRecipesByIngredients = async (ingredients) => {
  try {
    const response = await recipeAPI.findByIngredients({
      ingredients: ingredients.join(','),
      number: 12,
      ranking: 1
    });
    
    return response.data.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredients: recipe.usedIngredients,
      missedIngredients: recipe.missedIngredients
    }));
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};`,
      challenges: [
        {
          problem:
            "Implementing intelligent recipe suggestions based on available ingredients while handling API rate limits effectively.",
          solution:
            "Created a smart caching system with ingredient-based indexing and implemented request batching to minimize API calls while providing relevant suggestions.",
        },
        {
          problem:
            "Managing complex dietary restrictions and allergen filtering across thousands of recipes with varying data quality.",
          solution:
            "Developed a robust filtering system with fallback mechanisms and data validation to ensure accurate dietary restriction compliance.",
        },
      ],
    },
    {
      id: 7,
      title: "React Quiz Application",
      description:
        "Developed a multi-question quiz app, focusing on conditional rendering, handling complex state logic, and basic routing within a single-page application.",
      fullDescription: `Developed a multi-question quiz app, focusing on conditional rendering, handling complex state logic, and basic routing within a single-page application. This project enhanced my understanding of React state management and component lifecycle methods.`,
      image: "assets/images/quiz-challenge.png",
      images: ["assets/images/quiz-challenge.png"],
      technologies: ["React", "JavaScript", "React Router (basic)"],
      status: "completed",
      completedDate: "Dec 2024",
      duration: "3 months",
      featured: true,
      liveUrl: "",
      githubUrl: "https://github.com/yourusername/react-quiz-app",
      architecture:
        "Full-stack MERN application with RESTful API design. Uses MongoDB for data persistence and implements JWT authentication for secure user sessions.",
      keyFeatures: [
        "Comprehensive expense categorization and tagging",
        "Budget creation and tracking with alerts",
        "Visual analytics with interactive charts and graphs",
        "Receipt scanning and automatic data extraction",
        "Recurring expense management and predictions",
        "Multi-currency support with real-time conversion",
        "Detailed financial reports and export functionality",
      ],
      codeSnippet: `// Expense analytics calculation
const calculateExpenseAnalytics = (expenses, timeframe) => {
  const filteredExpenses = filterByTimeframe(expenses, timeframe);
  
  const analytics = {
    totalSpent: filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0),
    categoryBreakdown: groupByCategory(filteredExpenses),
    dailyAverage: calculateDailyAverage(filteredExpenses, timeframe),
    trends: calculateTrends(filteredExpenses)
  };
  
  return analytics;
};`,
      challenges: [
        {
          problem:
            "Implementing accurate receipt scanning and data extraction while handling various receipt formats and image qualities.",
          solution:
            "Integrated OCR technology with machine learning models and implemented data validation algorithms to ensure accurate expense data extraction from receipts.",
        },
        {
          problem:
            "Creating meaningful financial insights and trends from complex expense data while maintaining user privacy.",
          solution:
            "Developed client-side analytics algorithms that process data locally and implemented aggregation techniques to provide valuable insights without compromising user privacy.",
        },
      ],
    },
//     {
//       id: 8,
//       title: "Chat Application",
//       description:
//         "A real-time chat application with group messaging, file sharing, and video call integration for seamless communication.",
//       fullDescription: `A modern real-time chat application built for both personal and professional communication. Features include instant messaging, group chats, file sharing, emoji reactions, and integrated video calling capabilities.\n\nThe application supports end-to-end encryption, message search, user presence indicators, and notification systems. It's designed to handle high-volume messaging with excellent performance and reliability.`,
//       image:
//         "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
//       images: [
//         "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
//         "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
//         "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
//       ],
//       technologies: [
//         "React",
//         "Node.js",
//         "Socket.io",
//         "MongoDB",
//         "WebRTC",
//         "Tailwind CSS",
//       ],
//       status: "archived",
//       completedDate: "Jun 2024",
//       duration: "3 months",
//       featured: false,
//       liveUrl: null,
//       githubUrl: "https://github.com/username/chat-app",
//       architecture:
//         "Real-time application using Socket.io for WebSocket connections and WebRTC for video calls. Built with React frontend and Node.js backend with MongoDB for message persistence.",
//       keyFeatures: [
//         "Real-time messaging with instant delivery",
//         "Group chat creation and management",
//         "File and media sharing with preview",
//         "Integrated video and voice calling",
//         "End-to-end message encryption",
//         "Message search and history",
//         "User presence and typing indicators",
//       ],
//       codeSnippet: `// Real-time message handling
// const useSocket = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
  
//   useEffect(() => {
//     const newSocket = io('/chat');
//     setSocket(newSocket);
    
//     newSocket.on('message', (message) => {
//       setMessages(prev => [...prev, message]);
//     });
    
//     return () => newSocket.close();
//   }, []);
  
//   const sendMessage = (content, roomId) => {
//     socket.emit('send-message', { content, roomId });
//   };
  
//   return { messages, sendMessage };
// };`,
//       challenges: [
//         {
//           problem:
//             "Implementing reliable real-time messaging that handles network interruptions and ensures message delivery.",
//           solution:
//             "Built a robust message queue system with acknowledgment mechanisms and automatic retry logic to guarantee message delivery even during network issues.",
//         },
//         {
//           problem:
//             "Integrating video calling functionality while maintaining good performance and handling various network conditions.",
//           solution:
//             "Implemented WebRTC with adaptive bitrate streaming and fallback mechanisms to ensure stable video calls across different network conditions and devices.",
//         },
//       ],
//     },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(
        (project) =>
          project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          project?.description
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase()) ||
          project?.technologies?.some((tech) =>
            tech?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          )
      );
    }

    // Apply category filters
    if (activeFilters?.length > 0) {
      filtered = filtered?.filter((project) => {
        return activeFilters?.every((filter) => {
          // Safer filter parsing to avoid initialization issues
          const filterParts = filter?.split(":") || [];
          const category = filterParts?.[0] || "";
          const value = filterParts?.[1] || "";

          switch (category) {
            case "technology":
              return project?.technologies?.some((tech) =>
                tech?.toLowerCase()?.includes(value?.toLowerCase())
              );
            case "type":
              // Map project types based on technologies and characteristics
              const projectType = getProjectType(project);
              return projectType === value;
            case "status":
              return project?.status === value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    filtered?.sort((sortA, sortB) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = sortA?.title?.toLowerCase() || "";
          bValue = sortB?.title?.toLowerCase() || "";
          break;
        case "date":
          aValue = new Date(sortA?.completedDate || "2024-01-01");
          bValue = new Date(sortB?.completedDate || "2024-01-01");
          break;
        case "technology":
          aValue = sortA?.technologies?.[0] || "";
          bValue = sortB?.technologies?.[0] || "";
          break;
        case "status":
          aValue = sortA?.status || "";
          bValue = sortB?.status || "";
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [mockProjects, searchQuery, activeFilters, sortBy, sortOrder]);

  const getProjectType = (project) => {
    const techs = project?.technologies?.map((t) => t?.toLowerCase());

    if (
      techs?.includes("react") ||
      techs?.includes("vue.js") ||
      techs?.includes("angular")
    ) {
      return "web-app";
    }
    if (techs?.includes("node.js") || techs?.includes("express")) {
      return "api";
    }
    return "website";
  };

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProjects?.length / projectsPerPage
  );
  const startIndex = (currentPage - 1) * projectsPerPage;
  const paginatedProjects = filteredAndSortedProjects?.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNavigateProject = (direction) => {
    if (!selectedProject) return;

    const currentIndex = filteredAndSortedProjects?.findIndex(
      (p) => p?.id === selectedProject?.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex - 1;
    }

    if (newIndex >= 0 && newIndex < filteredAndSortedProjects?.length) {
      setSelectedProject(filteredAndSortedProjects?.[newIndex]);
    }
  };

  const hasNextProject = selectedProject
    ? filteredAndSortedProjects?.findIndex(
        (p) => p?.id === selectedProject?.id
      ) <
      filteredAndSortedProjects?.length - 1
    : false;

  const hasPrevProject = selectedProject
    ? filteredAndSortedProjects?.findIndex(
        (p) => p?.id === selectedProject?.id
      ) > 0
    : false;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted/20">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted/20">
      <Helmet>
        <title>Portfolio Projects - Jason Dagana Portfolio</title>
        <meta
          name="description"
          content="Explore my portfolio of web development projects including React applications, full-stack solutions, and innovative digital experiences."
        />
        <meta
          name="keywords"
          content="portfolio, projects, web development, React, JavaScript, frontend, fullstack"
        />
      </Helmet>
      <Header />
      <ScrollProgress />
      <main className="">
        {/* Hero Section */}
        <section className="h-[55vh]  py-16">
          <div className="flex justify-center items-center h-full pt-28 px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                My Portfolio
                <span className="block text-2xl lg:text-3xl text-primary mt-2">
                  Crafted with Passion & Precision
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore a collection of carefully crafted projects that showcase
                my expertise in modern web development. Each project represents
                a unique challenge solved with innovative solutions and
                cutting-edge technologies.
              </p>
            </div>

            {/* Project Stats */}
            {/* <ProjectStats projects={mockProjects} className="mb-8" /> */}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="4xl:max-w-7xl 3xl:max-w-7xl max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Filters */}
              {/* <aside className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24">
                  <ProjectFilter
                    onFilterChange={setActiveFilters}
                    onSearchChange={setSearchQuery}
                    activeFilters={activeFilters}
                    searchQuery={searchQuery}
                  />
                </div>
              </aside> */}

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      Projects ({filteredAndSortedProjects?.length})
                    </h2>
                    {/* {(activeFilters?.length > 0 || searchQuery) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="X"
                        iconPosition="left"
                        onClick={() => {
                          setActiveFilters([]);
                          setSearchQuery("");
                          setCurrentPage(1);
                        }}
                      >
                        Clear filters
                      </Button>
                    )} */}
                  </div>

                  {/* <SortControls
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={(newSortBy, newSortOrder) => {
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                      setCurrentPage(1);
                    }}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  /> */}
                </div>

                {/* Projects Grid/List */}
                {paginatedProjects?.length > 0 ? (
                  <>
                    {viewMode === "grid" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                        {paginatedProjects?.map((project) => (
                          <ProjectCard
                            key={project?.id}
                            project={project}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6 mb-12">
                        {paginatedProjects?.map((project) => (
                          <ProjectListItem
                            key={project?.id}
                            project={project}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ChevronLeft"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>

                        <div className="flex space-x-1">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          )?.map((page) => (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "ghost"
                              }
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-10"
                            >
                              {page}
                            </Button>
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ChevronRight"
                          iconPosition="right"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <Icon
                      name="Search"
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or clearing the
                      filters.
                    </p>
                    <Button
                      variant="outline"
                      iconName="RotateCcw"
                      iconPosition="left"
                      onClick={() => {
                        setActiveFilters([]);
                        setSearchQuery("");
                        setCurrentPage(1);
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <SkillsOverview />
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm always excited to take on new challenges and create amazing
              digital experiences. Let's discuss how we can bring your ideas to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="Mail"
                iconPosition="left"
                onClick={() => (window.location.href = "/contact-connect")}
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                Download Resume
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigateProject}
        hasNext={hasNextProject}
        hasPrev={hasPrevProject}
      />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PortfolioProjects;
