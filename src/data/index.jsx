// Mock Projects Data
 export const mockProjects = [
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
