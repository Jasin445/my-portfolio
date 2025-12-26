// Mock Projects Data
export const mockProjects = [
  {
    id: 1,
    title: "Everything Gadget Accessories Store",
    description:
      "This project was one of the first projects that i completed all on my own using HTML and CSS, focusing on styling, layout (Flexbox), and making designs responsive for different screen sizes. I learned the process of responsive layout",
    fullDescription: `This project was one of the first projects that i completed all on my own using HTML and CSS, focusing on styling, layout (Flexbox), and making designs responsive for different screen sizes. I learned the process of responsive layout. This foundational project helped me understand the core principles of web development and responsive design patterns.`,
    image: "/assets/images/everything-gadgets.png",
    images: ["/assets/images/everything-gadgets.png"],
    technologies: ["HTML5", "CSS3", "Flexbox", "Responsive Design"],
    status: "completed",
    completedDate: "Dec 2024",
    duration: "3 months",
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
  {
    id: 8,
    title: "HouseConnect - Property Listing & Roommate Matching Platform",
    description:
      "A full-stack property listing and roommate matching platform with three distinct user roles, payment integration, and real-time contact management. Built to connect homeseekers with agents and compatible roommates through a secure, monetized platform.",
    fullDescription: `HouseConnect is a comprehensive real estate platform designed to solve two critical problems in the housing market: finding properties and finding compatible roommates. The platform implements a three-tier user system with distinct roles for homeseekers, agents, and administrators. I architected the entire system from database design to deployment, handling real monetary transactions through Paystack integration. The platform features a sophisticated contact reveal system where users can securely exchange contact information after payment verification, ensuring both security and monetization. This project challenged me to think about scalability, security, payment processing, and creating intuitive user experiences for different user types.`,
    image: "/assets/images/houseconnect.png",
    images: [
      "/assets/images/houseconnect.png",
      "/assets/images/houseconnect1.png",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Paystack API",
      "JWT Authentication",
      "RESTful API",
      "Responsive Design",
    ],
    status: "In Progress",
    completedDate: "Project in progress...",
    duration: "8 months",
    featured: true,
    liveUrl: "https://housesconnect.vercel.app",
    githubUrl: "https://github.com/Jasin445/houseconnect",
    githubBackendUrl: "https://github.com/Jasin445/house_connect_backend",
    architecture:
      "The application follows a client-server architecture with a React frontend and Node.js/Express backend. PostgreSQL database is normalized with separate tables for users, properties, roommate profiles, payments, and transactions. The system implements JWT-based authentication with role-based middleware for access control. Paystack webhooks handle payment verification asynchronously, updating database records and triggering contact reveal permissions.",
    keyFeatures: [
      "Three-tier role-based access control (Homeseekers, Agents, Admin)",
      "Integrated Paystack payment gateway with webhook verification",
      "Secure contact reveal system unlocked after payment confirmation",
      "Roommate matching algorithm based on preferences and compatibility",
      "Agent property listing management with photo uploads",
      "Admin dashboard for platform oversight and content moderation",
      "Real-time payment status tracking and transaction history",
      "Advanced property search with filters (location, price, amenities)",
      "User verification and profile management system",
      "Responsive design optimized for mobile and desktop",
    ],
    codeSnippet: `// Paystack webhook handler with verification
const handlePaystackWebhook = async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    const event = req.body;
    
    if (event.event === 'charge.success') {
      await Transaction.update(
        { status: 'completed', verified: true },
        { where: { reference: event.data.reference } }
      );
      
      // Unlock contact reveal permission
      await unlockContactAccess(event.data.metadata);
    }
  }
  
  res.sendStatus(200);
};`,
    challenges: [
      {
        problem:
          "Implementing a secure payment flow that prevents users from accessing contact information without completing payment, while handling edge cases like failed transactions, duplicate payments, and webhook delays.",
        solution:
          "Created a two-phase verification system: initial payment intent creation with pending status, followed by webhook confirmation that atomically updates both transaction and access permission tables. Implemented idempotency keys to prevent duplicate processing and added a reconciliation job to handle webhook delivery failures.",
      },
      {
        problem:
          "Designing a database schema that efficiently handles concurrent users across three different roles with different permissions, while maintaining data integrity and preventing unauthorized access to sensitive contact information.",
        solution:
          "Architected a normalized PostgreSQL schema with junction tables for many-to-many relationships (user-property views, contact reveals) and implemented database-level constraints. Used row-level security policies combined with application-level middleware to enforce role-based access control, ensuring no role can access another role's restricted data.",
      },
      {
        problem:
          "Building a roommate matching system that considers multiple compatibility factors (budget, lifestyle, location preferences) while maintaining good performance as the user base grows.",
        solution:
          "Implemented a weighted scoring algorithm that calculates compatibility scores based on normalized preference differences. Used PostgreSQL's JSONB column type for flexible preference storage and created optimized indexes on frequently queried fields. Added pagination and caching for match results to maintain performance at scale.",
      },
    ],
  },
  // NewsBridge - AI-Powered Citizen Journalism Platform
  {
    id: 9,
    title: "NewsBridge - AI-Powered Citizen Journalism Platform",
    description:
      "An innovative citizen journalism platform connecting professional journalists with African communities through AI-powered tools and WhatsApp integration. Led frontend development with TypeScript and Next.js, implementing secure authentication and real-time anonymous reporting.",
    fullDescription: `NewsBridge is a groundbreaking platform designed to bridge the gap between professional journalists and local communities across Africa. As the frontend lead, I architected the entire client-side application using Next.js and TypeScript, creating a seamless experience for both journalists seeking stories and citizens reporting events. The platform integrates a WhatsApp chatbot for anonymous reporting, allowing users to submit news tips securely without revealing their identity. I took ownership of the authentication system, implementing HTTP-only cookie-based authentication to prevent XSS attacks, and integrated 95% of the backend APIs using TanStack Query for efficient data fetching, caching, and optimistic updates. This project taught me the importance of security in journalism platforms, the complexity of real-time data synchronization, and how to build scalable frontend architectures that can handle sensitive information responsibly.`,
    image: "/assets/images/newsbridge-preview.png",
    images: ["/assets/images/newsbridge-preview.png"],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "TanStack Query",
      "HTTP-only Cookies",
      "WhatsApp Business API",
      "Tailwind CSS",
    ],
    status: "MVP completed",
    completedDate: "",
    duration: "7 Months",
    featured: true,
    liveUrl: "https://newsbridgeai.com",
    githubUrl: "https://github.com/Favisoki/Newsbridge-AI",
    architecture:
      "Built with Next.js App Router for server-side rendering and optimal SEO. Authentication uses HTTP-only cookies stored on the server to prevent XSS attacks, with refresh token rotation for enhanced security. TanStack Query manages all API interactions with intelligent caching strategies, automatic retries, and optimistic updates. The WhatsApp integration syncs anonymously submitted reports in real-time through webhook handlers, updating the UI instantly when new stories arrive.",
    keyFeatures: [
      "Secure HTTP-only cookie authentication preventing XSS attacks",
      "WhatsApp chatbot integration for anonymous citizen reporting",
      "Real-time story synchronization across journalist and citizen dashboards",
      "AI-powered story categorization and relevance matching",
      "Advanced search and filtering for journalists seeking specific stories",
      "Multi-language support for African communities",
      "Story verification workflow with source tracking",
      "Journalist-citizen messaging system with privacy controls",
      "Media upload handling (images, videos, audio) with compression",
      "Role-based access control (Citizens, Journalists, Editors, Admins)",
    ],
    codeSnippet: `// TanStack Query hook for real-time story updates
const useStories = (filters?: StoryFilters) => {
  return useQuery({
    queryKey: ['stories', filters],
    queryFn: () => fetchStories(filters),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
    refetchOnWindowFocus: true,
  });
};

// Optimistic update for story verification
const { mutate: verifyStory } = useMutation({
  mutationFn: (storyId: string) => api.verifyStory(storyId),
  onMutate: async (storyId) => {
    await queryClient.cancelQueries(['stories']);
    
    const previous = queryClient.getQueryData(['stories']);
    queryClient.setQueryData(['stories'], (old: Story[]) =>
      old.map(story =>
        story.id === storyId
          ? { ...story, verified: true }
          : story
      )
    );
    
    return { previous };
  },
  onError: (err, variables, context) => {
    queryClient.setQueryData(['stories'], context.previous);
  },
});`,
    challenges: [
      {
        problem:
          "Implementing secure authentication in a Next.js application while preventing XSS attacks and maintaining a smooth user experience across server and client components.",
        solution:
          "Adopted HTTP-only cookies for token storage, making them inaccessible to JavaScript and preventing XSS attacks. Created a middleware layer in Next.js that validates authentication on the server before rendering protected pages. Implemented automatic token refresh with rotation to maintain sessions securely, and used server actions for authentication mutations to keep sensitive operations server-side.",
      },
      {
        problem:
          "Integrating 95% of backend APIs efficiently while handling complex data relationships, caching strategies, and ensuring the UI stays responsive during network requests.",
        solution:
          "Leveraged TanStack Query's powerful caching and synchronization features to create a robust data layer. Implemented normalized cache strategies for related data, used optimistic updates for instant UI feedback, and configured intelligent refetch policies based on data sensitivity. Created custom hooks abstracting API complexity and providing consistent error handling and loading states across the application.",
      },
      {
        problem:
          "Synchronizing anonymous WhatsApp reports with the web platform in real-time while maintaining user privacy and preventing spam or malicious submissions.",
        solution:
          "Built a webhook integration that receives WhatsApp messages, validates them through AI content moderation, and pushes verified reports to the frontend via WebSocket connections. Implemented rate limiting on the backend and deduplication logic to prevent spam. Used TanStack Query's real-time features to automatically update the UI when new reports arrive, with visual indicators for journalists to review fresh submissions.",
      },
    ],
  },

  // Spaces - Real-Time Academic Collaboration Platform
  {
    id: 10,
    title: "Spaces - Real-Time Academic Collaboration Platform",
    description:
      "A collaborative academic platform connecting students with supervisors through real-time communication, role-based registration with university email validation, and a comprehensive component library built with TypeScript and Tailwind CSS.",
    fullDescription: `Spaces is an academic collaboration platform designed to streamline communication between students and their academic supervisors. I contributed to the frontend development, focusing on creating a clean, responsive, and accessible user interface. The platform implements role-based registration with strict university email validation and OTP verification to ensure only legitimate academic users can access the system. I developed a comprehensive reusable component library using TypeScript interfaces, ensuring type safety across the entire application and making it easy for team members to build new features consistently. The project taught me the importance of design systems, the value of TypeScript in catching errors early, and how to build scalable component architectures that support team collaboration.`,
    image: "/assets/images/spaces-preview.png",
    images: [
      "assets/images/spaces-preview.png",
      "assets/images/spaces-dashboard.png",
      "assets/images/spaces-collaboration.png",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Hook Form",
      "WebSocket",
      "Zod Validation",
      "Radix UI",
      "Framer Motion",
    ],
    status: "completed",
    completedDate: "August 2025",
    duration: "2 months",
    featured: true,
    liveUrl: "https://spaces-frontend-lovat.vercel.app/",
    githubUrl: "https://github.com/prosper20/spaces-frontend/tree/main",
    architecture:
      "The frontend follows a component-driven architecture with a centralized component library. TypeScript interfaces define strict types for all props, API responses, and state management. Tailwind CSS provides utility-first styling with custom theme configuration for consistent design tokens. Real-time features use WebSocket connections for instant messaging and notification updates. Form validation is handled by React Hook Form with Zod schemas for runtime type checking.",
    keyFeatures: [
      "Role-based registration (Students, Supervisors, Admins)",
      "University email validation with OTP verification",
      "Real-time messaging between students and supervisors",
      "Document sharing and collaborative editing",
      "Meeting scheduler with calendar integration",
      "Progress tracking dashboard for academic milestones",
      "Notification system for deadlines and updates",
      "Reusable TypeScript component library with 50+ components",
      "Accessible UI following WCAG 2.1 guidelines",
      "Responsive design optimized for mobile and desktop",
    ],
    codeSnippet: `// Reusable Button component with TypeScript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    leftIcon, 
    rightIcon,
    children,
    className,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants[variant],
          buttonSizes[size],
          isLoading && 'opacity-70 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size} />
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);`,
    challenges: [
      {
        problem:
          "Building a reusable component library that maintains consistency across the application while providing enough flexibility for different use cases and ensuring type safety.",
        solution:
          "Created a comprehensive TypeScript component library with strict interface definitions for all props. Used discriminated unions for variant props and generics for polymorphic components. Implemented a consistent API pattern across all components with shared props like 'size', 'variant', and 'disabled'. Documented each component with Storybook to showcase usage examples and maintain a single source of truth for the design system.",
      },
      {
        problem:
          "Implementing secure role-based registration with university email validation and OTP verification while maintaining a smooth user experience and preventing unauthorized access.",
        solution:
          "Built a multi-step registration flow with client-side validation using Zod schemas. Integrated email domain verification to ensure only valid university emails can register. Implemented OTP generation on the backend with time-limited tokens and rate limiting to prevent abuse. Created a seamless UI flow with progress indicators and clear error messages, ensuring users understand each step of the verification process.",
      },
      {
        problem:
          "Ensuring the UI remains clean, responsive, and accessible across all devices while collaborating with team members who have different coding styles and experience levels.",
        solution:
          "Established coding standards and component patterns documented in a team wiki. Used Tailwind CSS with custom configuration for consistent spacing, colors, and typography. Implemented ESLint and Prettier rules for code consistency. Conducted regular code reviews focusing on accessibility best practices, ensuring all interactive elements are keyboard navigable and screen reader friendly. Created responsive utility classes for common layout patterns to speed up development.",
      },
    ],
  },

  // OLC Homes - Real Estate Company Website
  {
    id: 11,
    title: "OLCLARE Homes - Real Estate Company Website",
    description:
      "A professional real estate company website built with React.js and Tailwind CSS, featuring responsive layouts, property showcases, and seamless user experience across all devices. Collaborated with a team to deliver a polished, client-ready web presence.",
    fullDescription: `OLC Homes is a professional website for a real estate company, designed to showcase their property portfolio and services to potential clients. I contributed to the frontend development, focusing on creating responsive layouts that provide a seamless experience across all devices—from mobile phones to large desktop screens. The project involved close collaboration with designers and other developers to ensure the final product met the client's high standards. I implemented modern UI patterns, optimized images for fast loading, and ensured the website was accessible to all users. This project strengthened my skills in team collaboration, client communication, and building production-ready websites that balance aesthetics with performance.`,
    image: "/assets/images/olclare-preview.png",
    images: [
      "/assets/images/olclare-preview.png",
      "/assets/images/oclare2.png",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "GSAP",
      "Lazy Loading",
    ],
    status: "completed",
    completedDate: "June 2025",
    duration: "2 months",
    featured: true,
    liveUrl: "https://www.olclarehomes.com",
    githubUrl: "hhttps://gitlab.com/prosper20/ol-clare",
    architecture:
      "Single-page application built with React and React Router for navigation. Tailwind CSS provides utility-first styling with custom theme configuration matching brand colors. Framer Motion adds smooth page transitions and scroll animations. Images are lazy-loaded and optimized using modern formats (WebP) with fallbacks. Form handling uses React Hook Form with validation. The site is fully responsive using Tailwind's mobile-first approach.",
    keyFeatures: [
      "Responsive design optimized for mobile, tablet, and desktop",
      "Property gallery with filtering and sorting capabilities",
      "Image carousel with touch/swipe support",
      "Smooth scroll animations and page transitions",
      "Contact form with validation and email integration",
      "About company section with team profiles",
      "Services showcase with detailed descriptions",
      "Property detail pages with image galleries",
      "Call-to-action sections strategically placed",
      "Fast loading with lazy-loaded images and code splitting",
    ],
    codeSnippet: `// Responsive property card component
const PropertyCard = ({ property }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg shadow-lg 
                 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 
                     transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary text-white 
                        px-3 py-1 rounded-full text-sm font-semibold">
          {property.status}
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {property.title}
        </h3>
        <p className="text-gray-600 mb-4">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            {property.price}
          </span>
          <Link
            to={\`/properties/\${property.id}\`}
            className="text-primary hover:text-primary-dark font-semibold"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};`,
    challenges: [
      {
        problem:
          "Ensuring the website looks professional and maintains visual consistency across all device sizes while handling high-resolution property images without sacrificing performance.",
        solution:
          "Adopted a mobile-first approach with Tailwind CSS, building layouts that scale gracefully from small screens to large desktops. Implemented responsive image techniques using modern formats (WebP) with JPEG fallbacks, and added lazy loading to defer off-screen images. Used CSS Grid and Flexbox for flexible layouts that adapt to different viewport sizes without breaking. Compressed images without visible quality loss and implemented responsive image srcsets for optimal loading.",
      },
      {
        problem:
          "Collaborating effectively with team members (designers and developers) while maintaining code quality and meeting tight client deadlines.",
        solution:
          "Established clear communication channels using GitLab for version control and issue tracking. Conducted daily standups to sync progress and blockers. Used component-driven development to divide work among team members effectively. Implemented code review processes before merging to maintain quality. Created a shared component library to ensure consistency and reduce duplication. Maintained detailed documentation for handoffs and future maintenance.",
      },
      {
        problem:
          "Creating smooth animations and transitions that enhance user experience without overwhelming the page or causing performance issues on lower-end devices.",
        solution:
          "Used Framer Motion strategically for page transitions and scroll-triggered animations, with reduced motion preferences respected for accessibility. Implemented intersection observers to trigger animations only when elements enter the viewport, preventing unnecessary calculations. Used CSS transforms and opacity for animations instead of layout-triggering properties. Tested performance on lower-end devices and adjusted animation complexity accordingly, ensuring smooth 60fps animations across all target devices.",
      },
    ],
  },

  // EdTech Learning Management System (In Progress)
  {
    id: 12,
    title: "Datatechhub Learning Management System",
    description:
      "A comprehensive full-stack Learning Management System with course catalog, student dashboards, and assessment interfaces. Built with React, TypeScript, Node.js, and PostgreSQL, featuring JWT authentication, role-based authorization, and secure RESTful APIs.",
    fullDescription: `EdTech LMS is an ambitious full-stack learning management system currently in development. I'm building both the frontend and backend from scratch, focusing on creating a scalable platform that can support concurrent users taking courses, submitting assessments, and tracking their progress. The system implements three user roles (Students, Instructors, Admins) with granular permissions controlled through JWT-based authentication. On the backend, I'm architecting a modular Express.js application with PostgreSQL for data persistence, using Zod for request validation and following security best practices including input sanitization and SQL injection prevention. The frontend uses React with TypeScript for type safety and TanStack Query for efficient data management. This project is teaching me end-to-end development, from database design to deployment, and the complexities of building secure, scalable educational platforms.`,
    image: "/assets/images/datatechub-preview.png",
    images: [
      "assets/images/edtech-lms-preview.png",
      "assets/images/edtech-lms-courses.png",
      "assets/images/edtech-lms-dashboard.png",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "Zod",
      "TanStack Query",
      "Tailwind CSS",
      "Bcrypt",
      "Prisma ORM",
    ],
    status: "in-progress",
    completedDate: null,
    duration: "Ongoing",
    featured: true,
    liveUrl: null,
    githubUrl: null,
    architecture:
      "Full-stack application with React TypeScript frontend and Node.js/Express backend. PostgreSQL database managed through Prisma ORM with normalized schema for users, courses, lessons, assessments, and enrollments. Backend follows MVC architecture with modular route handlers, middleware for authentication/authorization, and service layers for business logic. JWT tokens handle authentication with refresh token rotation. Zod schemas validate all API requests. Frontend uses TanStack Query for data fetching with optimistic updates and intelligent caching.",
    keyFeatures: [
      "Role-based access control (Students, Instructors, Admins)",
      "JWT authentication with refresh token rotation",
      "Course catalog with search and filtering",
      "Video lessons with progress tracking",
      "Interactive assessments (multiple choice, essays, coding challenges)",
      "Student dashboard with enrolled courses and progress metrics",
      "Instructor dashboard for course creation and student management",
      "Admin panel for user management and platform analytics",
      "RESTful API with comprehensive Zod validation",
      "Secure password hashing with bcrypt",
      "Input sanitization preventing SQL injection and XSS",
      "File upload handling for course materials and submissions",
    ],
    codeSnippet: `// Backend: Protected route with role-based authorization
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, email: true }
    });
    
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions' 
      });
    }
    next();
  };
};

// Usage: Only instructors and admins can create courses
router.post('/courses', 
  authMiddleware, 
  requireRole('instructor', 'admin'),
  validateRequest(createCourseSchema),
  createCourse
);`,
    challenges: [
      {
        problem:
          "Designing a database schema that efficiently handles complex relationships between users, courses, lessons, assessments, and enrollments while maintaining data integrity and supporting concurrent access.",
        solution:
          "Using Prisma ORM to define a normalized schema with proper foreign key constraints and indexes on frequently queried fields. Implementing junction tables for many-to-many relationships (users-courses, courses-categories). Using PostgreSQL transactions for operations that modify multiple related tables to ensure data consistency. Creating database indexes on columns used in WHERE clauses and JOIN conditions to optimize query performance as the database grows.",
      },
      {
        problem:
          "Building a secure authentication system that prevents common vulnerabilities (XSS, SQL injection, session hijacking) while providing a smooth user experience with automatic token refresh.",
        solution:
          "Implementing JWT-based authentication with short-lived access tokens (15 minutes) and long-lived refresh tokens stored as HTTP-only cookies. Using bcrypt with high salt rounds for password hashing. Validating all user inputs with Zod schemas before they reach the database, preventing SQL injection. Sanitizing all outputs to prevent XSS attacks. Implementing rate limiting on authentication endpoints to prevent brute force attacks. Using Prisma's parameterized queries which automatically escape SQL to prevent injection.",
      },
      {
        problem:
          "Creating a modular, maintainable backend architecture that can scale as new features are added while keeping the codebase organized and testable.",
        solution:
          "Following MVC architecture with clear separation of concerns: routes handle HTTP, controllers orchestrate logic, services contain business logic, and repositories handle data access. Creating reusable middleware for cross-cutting concerns like authentication, validation, and error handling. Using Zod schemas as a single source of truth for validation, shared between frontend and backend TypeScript types. Writing integration tests for critical API endpoints to catch regressions early. Documenting API endpoints with clear examples of request/response formats.",
      },
    ],
  },
];
