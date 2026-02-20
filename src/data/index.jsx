export const mockProjects = [
  {
    id: 1,
    title: "Everything Gadget Accessories Store",
    description:
      "Responsive e-commerce product page built from scratch with HTML and CSS, demonstrating clean layout structure, Flexbox-based grid systems, and mobile-first responsive design.",
    fullDescription: `Built a complete product listing page for a gadget accessories store using only HTML and CSS. The focus was on semantic markup, consistent visual design, and a fully responsive layout that adapts across mobile, tablet, and desktop viewports. Used Flexbox for product grid alignment and media queries for breakpoint-driven layout shifts. This was my first end-to-end project and established my foundation in web structure and responsive design principles.`,
    image: "/assets/images/everything-gadgets.webp",
    images: ["/assets/images/everything-gadgets.webp"],
    technologies: ["HTML5", "CSS3", "Flexbox", "Responsive Design"],
    status: "completed",
    completedDate: "Dec 2024",
    duration: "3 months",
    featured: false,
    liveUrl: "https://jasin445.github.io/Everything_Gadget/",
    githubUrl: "https://github.com/Jasin445/Everything_Gadget",
    architecture:
      "Static multi-page website built with semantic HTML5 and vanilla CSS. Page structure uses Flexbox for component-level layouts and media queries for responsive breakpoints. No JavaScript dependencies — pure HTML and CSS implementation.",
    keyFeatures: [
      "Responsive product grid using Flexbox with auto-wrap behavior",
      "Mobile-first design with media query breakpoints",
      "Semantic HTML5 structure for accessibility and readability",
      "Reusable CSS class patterns for consistent spacing and typography",
      "Cross-browser compatible styling",
    ],
    codeSnippet: `/* Responsive product grid */
.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.product-card {
  flex: 1 1 280px;
  max-width: 320px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .product-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}`,
    challenges: [
      {
        problem:
          "Achieving consistent product card alignment when cards had varying content heights across different screen sizes.",
        solution:
          "Used Flexbox's align-items: stretch on the parent to normalize card heights, and structured card content with flex-direction: column so action buttons always sit at the bottom regardless of description length.",
      },
      {
        problem:
          "Making the navigation and product layout readable on both small mobile screens and wide desktop viewports.",
        solution:
          "Applied a mobile-first approach — designed the single-column mobile layout first, then added media queries to introduce multi-column grids and horizontal navigation at wider breakpoints.",
      },
    ],
  },

  {
    id: 2,
    title: "Vidchill Creator Dashboard",
    description:
      "A dashboard UI layout built with HTML and CSS, combining CSS Grid for page structure and Flexbox for component-level alignment",
    fullDescription: `Designed and built a creator analytics dashboard layout using CSS Grid and Flexbox. The page features a sticky header, and a main content area with stats cards, a data table, and chart placeholders. This project deepened my understanding of when to use Grid vs Flexbox and how to structure complex, multi-region layouts that remain readable and usable on smaller screens.`,
    image: "assets/images/downloadiui.webp",
    images: ["assets/images/downloadiui.webp"],
    technologies: ["HTML5", "CSS3", "CSS Grid", "Flexbox"],
    status: "completed",
    completedDate: "October 2024",
    duration: "3 days",
    featured: false,
    liveUrl: "https://jasin445.github.io/dashboard/",
    githubUrl: "https://github.com/Jasin445/dashboard",
    architecture:
      "Single-page dashboard layout built entirely with HTML and CSS. CSS Grid handles the top-level page regions (header, main content), while Flexbox manages internal alignment within cards and nav items.",
    keyFeatures: [
      "CSS Grid-based page layout with header, and main content regions",
      "Flexbox-aligned stat cards and navigation items",
      "Consistent spacing and color system using CSS custom properties",
      "Tabular data section with horizontal scroll on small screens",
    ],
    codeSnippet: `/* Dashboard grid layout */
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;
}
.header  { grid-column: 2; background: #fff; border-bottom: 1px solid #e2e8f0; }
.main    { grid-column: 2; padding: 24px; }

.stat-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .dashboard { grid-template-columns: 1fr; }
}`,
    challenges: [
      {
        problem:
          "Deciding how to structure a layout with both fixed-width and flexible regions without breaking the page on different viewport widths.",
        solution:
          "Used CSS Grid with a 1fr column for main content. allowing the main area to expand naturally with available space.",
      },
      {
        problem:
          "Preventing the data table from overflowing its container on mobile screens.",
        solution:
          "Wrapped the table in a div with overflow-x: auto, allowing users to horizontally scroll the table on small screens without the layout breaking.",
      },
    ],
  },

  {
    id: 3,
    title: "All Countries App",
    description:
      "A dynamic country search application built with vanilla JavaScript, consuming the REST Countries API to display live country data with search and filter functionality.",
    fullDescription: `Built a fully interactive country explorer using vanilla JavaScript and the REST Countries public API. Users can search by country name and view key details including population, capital city, region, and flag. This was my first project working with asynchronous JavaScript — handling fetch requests, rendering API data to the DOM, and managing UI state based on user input. It marked a significant step from static pages to dynamic, data-driven interfaces.`,
    image: "assets/images/countries.webp",
    images: ["assets/images/countries.webp"],
    technologies: ["HTML5", "CSS3", "JavaScript", "REST API", "Fetch API"],
    status: "completed",
    completedDate: "Dec 2024",
    duration: "3 months",
    featured: false,
    liveUrl: "https://jasin445.github.io/countries/",
    githubUrl: "https://github.com/Jasin445/countries",
    architecture:
      "Single-page vanilla JavaScript application. Data is fetched from the REST Countries API on load and stored in memory. Search filtering is applied client-side against the stored data, with DOM re-rendered on each input event. No frameworks or build tools used.",
    keyFeatures: [
      "Live country search filtering against REST Countries API data",
      "Dynamic card rendering displaying flag, population, capital, and region",
      "Graceful error handling for failed API requests",
      "Responsive card grid layout for all screen sizes",
      "Debounced search input to reduce unnecessary DOM updates",
    ],
    codeSnippet: `// Fetch countries and enable live search
let countriesData = [];

async function loadCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  countriesData = await res.json();
  renderCountries(countriesData);
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(query)
  );
  renderCountries(filtered);
});

loadCountries();`,
    challenges: [
      {
        problem:
          "Understanding how to work with asynchronous fetch requests and ensure data is available before attempting to render it.",
        solution:
          "Used async/await with try/catch to handle the API request, and only called the render function after the data resolved. Added a loading state during the fetch to give users visual feedback.",
      },
      {
        problem:
          "Re-rendering search results without duplicating country cards in the DOM.",
        solution:
          "Cleared the card container's innerHTML before every render call, ensuring a clean slate on each search input event.",
      },
    ],
  },

  {
    id: 4,
    title: "Dynamic To-Do List",
    description:
      "A fully functional task management app built with vanilla JavaScript, featuring task creation, completion toggling, deletion, and persistent localStorage storage.",
    fullDescription: `Built a to-do list application using HTML, CSS, and vanilla JavaScript without any libraries or frameworks. Users can add tasks, mark them as complete, and delete them — with all data persisted in the browser's localStorage so tasks survive page reloads. This project introduced me to browser storage APIs, array manipulation for state management, and writing clean, event-driven JavaScript that updates the UI without full page refreshes.`,
    image: "assets/images/todo-img.png",
    images: ["assets/images/todo-img.png"],
    technologies: ["HTML5", "CSS3", "JavaScript", "localStorage"],
    status: "completed",
    completedDate: "Dec 2024",
    duration: "4 days",
    featured: false,
    liveUrl: "https://jasin445.github.io/to-do-app/",
    githubUrl: "https://github.com/Jasin445/to-do-app",
    architecture:
      "Single-page application with no dependencies. Task state is managed as a JavaScript array serialized to localStorage. All UI updates are driven by re-rendering from the stored state array — a simple but intentional pattern that mirrors how modern state management works.",
    keyFeatures: [
      "Add, complete, and delete tasks with instant UI feedback",
      "Tasks persisted across sessions using localStorage",
      "State-driven rendering — UI always reflects stored task array",
      "Responsive layout usable on mobile and desktop",
      "Clear visual distinction between active and completed tasks",
    ],
    codeSnippet: `// State-driven task rendering
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text) {
  const tasks = getTasks();
  tasks.push({ id: Date.now(), text, completed: false });
  saveTasks(tasks);
  renderTasks();
}

function toggleTask(id) {
  const tasks = getTasks().map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks(tasks);
  renderTasks();
}`,
    challenges: [
      {
        problem:
          "Keeping localStorage data and the rendered UI in sync as users add, complete, and delete tasks.",
        solution:
          "Adopted a single pattern: every action updates the localStorage array first, then calls renderTasks() to rebuild the UI from stored state. This ensured the DOM always reflects what's in storage with no risk of drift.",
      },
      {
        problem:
          "Attaching event listeners to dynamically created task elements without duplicating listeners on re-render.",
        solution:
          "Used event delegation on the task container instead of attaching listeners to individual task elements, so a single listener handles all task interactions regardless of how many times the list re-renders.",
      },
    ],
  },

  {
    id: 5,
    title: "Giveaway Countdown Timer",
    description:
      "A real-time countdown timer for a phone giveaway event, built with vanilla JavaScript. Displays days, hours, minutes, and seconds, updating every second and showing a final message when the event ends.",
    fullDescription: `Created a countdown timer page for a phone giveaway event using HTML, CSS, and vanilla JavaScript. The timer calculates the difference between the current time and the target event date, updating the display every second using setInterval. When the countdown reaches zero, it clears the interval and replaces the timer with an end message. This project introduced me to JavaScript timing functions, Date manipulation, and building UIs that update in real time.`,
    image: "assets/images/give-away.webp",
    images: ["assets/images/give-away.webp"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    status: "completed",
    completedDate: "Dec 2024",
    duration: "3 days",
    featured: false,
    liveUrl: "https://jasin445.github.io/countdown/",
    githubUrl: "https://github.com/Jasin445/countdown",
    architecture:
      "Single-page static application. JavaScript calculates remaining time on each interval tick and updates four DOM elements (days, hours, minutes, seconds). The interval is cleared and replaced with a completion message when the distance reaches zero.",
    keyFeatures: [
      "Live countdown updating every second with setInterval",
      "Displays days, hours, minutes, and seconds remaining",
      "Automatically displays end message when timer reaches zero",
      "Responsive layout for mobile and desktop",
    ],
    codeSnippet: `// Countdown timer with automatic end state
const eventDate = new Date("2025-03-01T00:00:00").getTime();

const interval = setInterval(() => {
  const distance = eventDate - Date.now();

  if (distance <= 0) {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "Giveaway has ended!";
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(distance / 86400000);
  document.getElementById("hours").textContent =
    Math.floor((distance % 86400000) / 3600000);
  document.getElementById("minutes").textContent =
    Math.floor((distance % 3600000) / 60000);
  document.getElementById("seconds").textContent =
    Math.floor((distance % 60000) / 1000);
}, 1000);`,
    challenges: [
      {
        problem:
          "Calculating and displaying the correct time units (days, hours, minutes, seconds) from a raw millisecond difference.",
        solution:
          "Used sequential modulo operations to extract each unit from the total distance: days from the full value, hours from the remainder after removing days, and so on down to seconds.",
      },
      {
        problem:
          "Cleanly stopping the timer and updating the UI when the countdown ends.",
        solution:
          "Checked for a negative or zero distance at the start of each interval tick, called clearInterval to stop further execution, and replaced the timer HTML with the completion message.",
      },
    ],
  },

  {
    id: 6,
    title: "HouseConnect – Property Listing & Roommate Matching Platform",
    description:
      "A full-stack platform connecting homeseekers with property agents and compatible roommates. Features a three-role user system, Paystack payment integration, and a contact-reveal system unlocked after payment verification.",
    fullDescription: `HouseConnect is a full-stack real estate platform built to solve two problems simultaneously: finding rental properties and finding compatible roommates. I architected the system end-to-end — from database schema design to deployment — implementing three distinct user roles (Homeseekers, Agents, Admins), real monetary transactions via Paystack, and a secure contact-reveal mechanism gated behind payment confirmation. The backend uses Node.js and Express with PostgreSQL, while the frontend is built in React with role-specific dashboards for each user type. This project was the most technically demanding project I had built at the time and pushed me to think seriously about security, data integrity, and scalable system design.`,
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
      "Tailwind CSS",
    ],
    status: "In Progress",
    completedDate: "Project in progress...",
    duration: "8 months",
    featured: false,
    liveUrl: "https://housesconnect.vercel.app",
    githubUrl: "https://github.com/Jasin445/houseconnect",
    githubBackendUrl: "https://github.com/Jasin445/house_connect_backend",
    architecture:
      "Client-server architecture with a React frontend and Node.js/Express REST API. PostgreSQL handles data persistence with normalized tables for users, properties, roommate profiles, payments, and contact access records. JWT-based authentication with role middleware controls access per user type. Paystack webhooks handle async payment verification, atomically updating transaction status and unlocking contact reveal permissions.",
    keyFeatures: [
      "Three-tier role-based access control (Homeseekers, Agents, Admin)",
      "Paystack payment gateway with HMAC webhook signature verification",
      "Contact reveal system unlocked only after confirmed payment",
      "Roommate compatibility matching based on weighted preference scoring",
      "Agent property listing management with photo uploads",
      "Admin dashboard for user management and content moderation",
      "Advanced property search with location, price, and amenity filters",
      "Real-time payment status tracking and transaction history",
      "Responsive design across mobile and desktop",
    ],
    codeSnippet: `// Paystack webhook handler with HMAC verification
const handlePaystackWebhook = async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.sendStatus(400);
  }

  const { event, data } = req.body;

  if (event === 'charge.success') {
    await db.transaction(async (trx) => {
      await trx('transactions')
        .where({ reference: data.reference })
        .update({ status: 'completed', verified: true });

      await unlockContactAccess(data.metadata, trx);
    });
  }

  res.sendStatus(200);
};`,
    challenges: [
      {
        problem:
          "Building a payment flow that prevents contact access before payment is confirmed, while handling edge cases like failed transactions, webhook delays, and duplicate events.",
        solution:
          "Implemented a two-phase system: the client creates a payment intent with a pending status, and the webhook confirmation atomically updates both the transaction record and access permission in a single database transaction. Added idempotency checks to prevent duplicate processing if Paystack retries the webhook.",
      },
      {
        problem:
          "Designing a PostgreSQL schema that enforces access boundaries between three user roles without leaking sensitive contact data.",
        solution:
          "Used junction tables to track contact reveal permissions per user-property pair, with database-level constraints preventing unauthorized inserts. Combined row-level checks with application middleware so even direct database access cannot bypass role restrictions.",
      },
      {
        problem:
          "Building a roommate matching algorithm that factors in multiple compatibility dimensions while staying performant as users grow.",
        solution:
          "Implemented a weighted scoring function that normalizes preference differences across budget, lifestyle, and location fields. Used PostgreSQL JSONB columns for flexible preference storage and added indexes on frequently queried fields. Paginated match results to avoid full-table scans on large datasets.",
      },
    ],
  },
  {
    id: 7,
    title: "NRC – Nigerian Railway Corporation Website & Admin Dashboard",
    description:
      "Contributed to the NRC public-facing website and internal admin dashboard through an internship placement, delivering independently under supervisorship. Architected the seat-holding countdown system, updated UI screens, and solely built the complete Booking Control module — from UI to full API integration.",

    fullDescription: `Through an internship placement, I contributed across two NRC (Nigerian Railway Corporation) products while operating with a level of ownership that went well beyond a typical intern scope.

On the public website, I made a key architecture decision around how the seat-holding countdown should be initialized — determining where the timer should start and ensuring the implementation was consistent across the booking flow. I also updated several UI screens as part of ongoing frontend work.

On the admin side, I was assigned sole ownership of the Booking Control module within NRC's internal web application. Under supervisorship, I independently designed the UI screens, wired up all API integrations, and implemented configuration controls for seat hold duration, booking windows, and general booking parameters — delivering the module end-to-end with minimal hand-holding. Throughout the project, I collaborated closely with backend engineers to resolve integration issues, align on request/response contracts, and get data flowing correctly between the frontend and the APIs.`,
    image: "/assets/images/nrc-preview.webp",
    images: ["/assets/images/nrc-preview.webp"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
      "TanStack Query",
    ],
    status: "completed",
    completedDate: "",
    duration: "",
    featured: true,
    liveUrl: "https://nrc-fane.ng",
    githubUrl: "",
    architecture:
      "Next.js application with TypeScript across both the public website and the internal admin dashboard. The seat-holding countdown is initialized server-side at reservation creation and passed to the client as a remaining-time value, ensuring the timer reflects true server state rather than a client-side guess. The admin Booking Control module follows a feature-based folder structure — UI components, API hooks, and config state are co-located per concern. TanStack Query manages all API interactions with cache invalidation on config updates.",
    keyFeatures: [
      "Seat-holding countdown architecture — timer initialized from server reservation timestamp for accuracy",
      "Booking Control module built end-to-end on the NRC internal admin dashboard",
      "Seat hold duration configuration — admins can set how long a seat is reserved during checkout",
      "Booking window controls — configure when bookings open and close relative to departure",
      "General booking parameter management with live API persistence",
      "Full REST API integration across all Booking Control settings",
      "UI screen updates on the NRC public-facing website",
      "Cross-team collaboration with backend engineers to resolve integration issues",
    ],
    codeSnippet: `// Seat hold countdown initialized from server reservation time
const useHoldCountdown = (reservationExpiresAt: string) => {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const remaining = new Date(reservationExpiresAt).getTime() - Date.now();
    return Math.max(0, Math.floor(remaining / 1000));
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

// Admin: Update booking control config
const useUpdateBookingConfig = () => {
  return useMutation({
    mutationFn: (config: BookingConfig) =>
      api.patch('/admin/booking-control', config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['booking-config'] });
    },
  });
};`,
    challenges: [
      {
        problem:
          "Deciding where and how the seat-holding countdown should be initialized. Initializing it purely on the client risked timer drift and inconsistency across tabs or devices — if a user refreshed, the countdown would reset rather than reflect the true remaining hold time.",
        solution:
          "Architected the countdown to derive its starting value from the server-provided reservation expiry timestamp rather than a client-side duration. The component calculates remaining seconds from the server timestamp on mount, so the timer is always accurate regardless of when or where the page loads.",
      },
      {
        problem:
          "Building the Booking Control module required close coordination with backend engineers to agree on API contracts, especially for config parameters that had downstream effects on the booking flow.",
        solution:
          "Worked directly with the backend team to define and iterate on request/response shapes before building the UI. When integration issues surfaced — mismatched parameter names, missing fields, unexpected response formats — collaborated in real time to resolve them, which kept the module moving without blocking either side.",
      },
      {
        problem:
          "The Booking Control module covered multiple distinct config concerns (seat hold time, booking windows, general parameters) that all needed to persist independently without one update clobbering another.",
        solution:
          "Structured the module into separate form sections per config group, each with its own API mutation and isolated state. TanStack Query cache invalidation on successful updates ensured the UI always reflected the latest persisted config without stale data bleeding between sections.",
      },
    ],
  },

  {
    id: 8,
    title: "NewsBridge – AI-Powered Citizen Journalism Platform",
    description:
      "Frontend lead on a Next.js platform connecting professional journalists with African communities. Implemented HTTP-only cookie authentication, integrated 95% of backend APIs with TanStack Query, and built the full client-side application architecture.",
    fullDescription: `NewsBridge is a citizen journalism platform designed to bridge professional journalists with local communities across Africa. As the frontend lead, I architected the entire client-side application using Next.js App Router and TypeScript. I owned the authentication system end-to-end — implementing HTTP-only cookie-based auth to eliminate XSS risk — and integrated the vast majority of backend APIs using TanStack Query, managing caching, optimistic updates, and error states across the application. The platform integrates a WhatsApp chatbot for anonymous citizen reporting, with the frontend surfacing verified submissions to journalists in real time. This was my most significant frontend leadership role to date.`,
    image: "/assets/images/newsbridge-preview.webp",
    images: ["/assets/images/newsbridge-preview.webp"],
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "TanStack Query",
      "HTTP-only Cookies",
      "Tailwind CSS",
      "WhatsApp Business API",
    ],
    status: "MVP completed",
    completedDate: "",
    duration: "7 months",
    featured: true,
    liveUrl: "https://newsbridgeai.com",
    githubUrl: "https://github.com/Favisoki/Newsbridge-AI",
    architecture:
      "Next.js App Router application with server and client components. Authentication uses HTTP-only cookies set server-side to prevent XSS, with Next.js middleware validating sessions before protected page renders. TanStack Query manages all API data with query-key-based caching, automatic retries, and optimistic updates. TypeScript interfaces enforce consistent data shapes across components.",
    keyFeatures: [
      "HTTP-only cookie authentication preventing XSS token theft",
      "Next.js middleware for server-side session validation on protected routes",
      "TanStack Query integration across 95% of API endpoints",
      "Optimistic updates for journalist story verification actions",
      "WhatsApp chatbot integration for anonymous citizen report submission",
      "Role-based UI rendering (Citizens, Journalists, Editors, Admins)",
      "AI-powered story categorization and relevance matching",
      "Advanced search and filtering for journalist story discovery",
      "Media upload support for images, video, and audio",
    ],
    codeSnippet: `// TanStack Query hook with optimistic story verification
const useStories = (filters?: StoryFilters) => {
  return useQuery({
    queryKey: ['stories', filters],
    queryFn: () => fetchStories(filters),
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
};

const { mutate: verifyStory } = useMutation({
  mutationFn: (storyId: string) => api.verifyStory(storyId),
  onMutate: async (storyId) => {
    await queryClient.cancelQueries({ queryKey: ['stories'] });
    const previous = queryClient.getQueryData(['stories']);

    queryClient.setQueryData(['stories'], (old: Story[]) =>
      old.map(s => s.id === storyId ? { ...s, verified: true } : s)
    );

    return { previous };
  },
  onError: (_err, _vars, context) => {
    queryClient.setQueryData(['stories'], context?.previous);
  },
});`,
    challenges: [
      {
        problem:
          "Implementing authentication in Next.js App Router in a way that works consistently across server components, client components, and middleware without exposing tokens to JavaScript.",
        solution:
          "Stored tokens exclusively in HTTP-only cookies set by the server. Next.js middleware reads the cookie server-side to protect routes before rendering. Client components never access the token directly — auth state is derived from a server-fetched session object passed down as props or via context.",
      },
      {
        problem:
          "Managing API data from 95% of backend endpoints with consistent loading states, error handling, and cache invalidation without repeating boilerplate across every component.",
        solution:
          "Built a typed API layer of custom TanStack Query hooks — one per resource domain — each encapsulating the query key, fetch function, and cache configuration. Components consume hooks without knowing fetch details, keeping UI code clean and making cache invalidation predictable.",
      },
      {
        problem:
          "The 'How It Works' section had a complex desktop UI with no mobile design provided. Deciding how to adapt a detailed multi-step layout with connectors and sequenced visuals for smaller screens was a design decision I had to make independently.",
        solution:
          "Analyzed the desktop layout's visual intent and made the call to collapse the horizontal step flow into a vertical timeline on mobile, using a left-aligned connector line to preserve the sense of progression. Determined independently which decorative elements to hide at small breakpoints — spacing, icon sizing, and typography scaling — all without a reference mockup.",
      },
    ],
  },

  {
    id: 9,
    title: "Spaces – Real-Time Academic Collaboration Platform",
    description:
      "Contributed frontend development to an academic platform connecting students with supervisors. Built a reusable TypeScript component library, implemented role-based registration with university email validation and OTP verification, and delivered accessible, responsive UI.",
    fullDescription: `Spaces is an academic collaboration platform designed to streamline communication between students and their supervisors. I contributed to the frontend, focusing on component architecture, form systems, and responsive UI implementation. I built a reusable component library with strict TypeScript interfaces, ensuring consistency and type safety across the codebase for the whole team. I also implemented the multi-step registration flow with university email domain validation and OTP verification. Working in a team environment, I helped establish coding conventions and contributed to code reviews focused on accessibility and maintainability.`,
    image: "/assets/images/spaces-preview.webp",
    images: [
      "assets/images/spaces-preview.webp",
      "assets/images/spaces-dashboard.png",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "Radix UI",
      "Framer Motion",
      "WebSocket",
    ],
    status: "completed",
    completedDate: "August 2025",
    duration: "2 months",
    featured: false,
    liveUrl: "https://spaces-frontend-lovat.vercel.app/",
    githubUrl: "https://github.com/prosper20/spaces-frontend/tree/main",
    architecture:
      "Component-driven React application with a centralized TypeScript component library. Tailwind CSS with custom theme tokens provides consistent design across the team. React Hook Form paired with Zod schemas handles form validation. WebSocket connections power real-time messaging. ESLint and Prettier enforce code style conventions across contributors.",
    keyFeatures: [
      "Reusable TypeScript component library with consistent prop interfaces",
      "Multi-step registration flow with university email domain validation",
      "OTP verification UI with countdown and resend handling",
      "Real-time messaging between students and supervisors via WebSocket",
      "Role-based registration (Students, Supervisors, Admins)",
      "Progress tracking dashboard for academic milestones",
      "Accessible UI following WCAG 2.1 guidelines",
      "Responsive design for mobile and desktop",
    ],
    codeSnippet: `// Typed reusable Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading,
     leftIcon, rightIcon, children, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(buttonVariants[variant], buttonSizes[size],
        isLoading && 'opacity-70 cursor-not-allowed', className)}
      {...props}
    >
      {isLoading ? <Spinner size={size} /> : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  )
);`,
    challenges: [
      {
        problem:
          "Building a component library that multiple developers could use consistently without each person implementing variants differently.",
        solution:
          "Defined strict TypeScript interfaces for all component props using discriminated unions for variants. Each component exposed a minimal, predictable API. Added usage documentation in the team wiki so contributors knew exactly which props were available and when to use each variant.",
      },
      {
        problem:
          "Implementing the registration flow to validate university email domains client-side while keeping the UX smooth across a multi-step form.",
        solution:
          "Used Zod schemas with a custom refinement to validate email domain format before submission. Split the flow into clearly labeled steps with React Hook Form's useFormContext shared across step components, preserving entered data when navigating between steps.",
      },
      {
        problem:
          "Collaborating across a team with varying experience levels while maintaining consistent code quality and meeting deadlines.",
        solution:
          "Proposed and established ESLint and Prettier rules early in the project so formatting was automated. Conducted code reviews focused on component patterns and accessibility. Divided work by component domain to minimize merge conflicts and let each contributor build familiarity with their area.",
      },
    ],
  },

  {
    id: 10,
    title: "OLCLARE Homes – Real Estate Company Website",
    description:
      "Contributed frontend development to a production real estate website built with Next.js, TypeScript, Tailwind CSS, and GSAP. Delivered responsive property showcase pages, smooth animations, and optimized image loading for a client-ready product.",
    fullDescription: `OLCLARE Homes is a professional website built for a real estate company to showcase their property portfolio and services. I contributed to the frontend, implementing responsive layouts, GSAP-powered scroll animations, and image optimization across the site. I focused on delivering pixel-accurate implementations of property listing sections, animated hero areas, and performant image loading using Next.js Image and lazy loading. This was a client-facing production project with real deadlines and review cycles.`,
    image: "/assets/images/olclare-preview.webp",
    images: [
      "/assets/images/olclare-preview.webp",
      "/assets/images/oclare2.webp",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Lazy Loading",
    ],
    status: "completed",
    completedDate: "June 2025",
    duration: "1 month",
    featured: true,
    liveUrl: "https://www.olclarehomes.com",
    githubUrl: "https://gitlab.com/prosper20/ol-clare",
    architecture:
      "Next.js application with TypeScript, using the Pages Router for structured navigation. Tailwind CSS with a custom theme matches the client's brand colors and typography. GSAP handles scroll-triggered animations and transitions. Next.js Image component optimizes property photos with responsive srcsets and lazy loading. GitLab used for version control and team coordination.",
    keyFeatures: [
      "Responsive property showcase sections across mobile, tablet, and desktop",
      "GSAP scroll-triggered animations on hero and listing sections",
      "Next.js Image optimization with lazy loading and WebP format",
      "Property detail pages with image gallery",
      "Contact form with validation",
      "Pixel-accurate implementation from Figma design handoffs",
      "Team collaboration via GitLab with pull request reviews",
    ],
    codeSnippet: `// GSAP scroll-triggered section reveal
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.property-card', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.properties-section',
      start: 'top 80%',
    },
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);`,
    challenges: [
      {
        problem:
          "High-resolution property images were slowing page load times, particularly on mobile connections.",
        solution:
          "Used Next.js Image component with priority loading for above-the-fold images and lazy loading for everything below. Added WebP with JPEG fallback using next/image's automatic format selection. This brought Largest Contentful Paint within acceptable range without visible quality loss.",
      },
      {
        problem:
          "Coordinating feature development across multiple contributors without frequent merge conflicts or style inconsistencies.",
        solution:
          "Agreed on a Tailwind configuration file as the single source of truth for colors, spacing, and typography. Divided the site into page-level sections assigned to individual contributors. Used GitLab merge requests with required reviews before merging to main, which caught most inconsistencies before they reached production.",
      },
      {
        problem:
          "GSAP animations causing layout shifts or running before elements mounted, especially on slower devices.",
        solution:
          "Initialised all GSAP timelines inside useEffect to guarantee DOM availability. Used ScrollTrigger's start offset to delay animations until elements were well within the viewport. Cleaned up ScrollTrigger instances on component unmount to prevent memory leaks on navigation.",
      },
    ],
  },

  {
    id: 11,
    title: "Noble Wellness Store – Lumbar Gel Landing Page",
    description:
      "High-converting product landing page for a lumbar cold compress gel built with React and deployed on Hostinger. Features a dynamic multi-tier package selection system, client-side order form with validation, and Facebook Pixel purchase tracking.",
    fullDescription: `A conversion-focused product landing page built for Noble Wellness Store to sell their Lumbar Cold Compress Gel — a topical cooling product for lower back pain and muscle relief. Built entirely with React and deployed as a production build on Hostinger, the page is structured around driving orders: a dynamic package selection system across four pricing tiers, a validated order form, a custom image slider, and a WhatsApp fallback for direct customer support. Facebook Pixel purchase events fire with the correct order value on successful submission, enabling accurate revenue tracking for marketing campaigns. This is a real client project with a live production URL.`,
    image: "/assets/images/noblewellnes-preview.png",
    images: ["/assets/images/noblewellnes-preview.png"],
    technologies: [
      "React",
      "CSS3",
      "JavaScript",
      "Facebook Pixel",
      "REST API",
      "PHP",
    ],
    status: "completed",
    completedDate: "Feb 2025",
    duration: "1 week",
    featured: true,
    liveUrl: "https://noblewellnessstore.com/lumbar-gel",
    githubUrl: "",
    architecture:
      "Single-page React application with component-driven interactivity. All package data lives in a centralized JavaScript object; radio inputs are generated dynamically at render time. Order form state, validation, and submission are managed in React. On successful submission, the resolved package price is read from state to fire the Facebook Pixel purchase event. The production build is hosted as static files on Hostinger.",
    keyFeatures: [
      "Dynamic package radio inputs generated from a tiered pricing data object",
      "Four pricing categories — Starter, Relief, Combo, Family Pack and more",
      "Custom image slider with dot navigation and mobile scroll-snap",
      "Client-side form validation with error display on invalid fields",
      "Facebook Pixel purchase event with accurate price on order success",
      "WhatsApp fallback button for direct customer messaging",
      "Fully responsive layout optimized for mobile-first traffic",
    ],
    codeSnippet: `// Dynamic package selection with Pixel tracking
const PACKAGES = [
  { id: 'starter',      label: 'Starter Pack – 1 pack',          subtitle: 'Perfect for trying out',              price: 25500, originalPrice: 27500 },
  { id: 'relief',       label: 'Relief Pack – 2 Packs',          subtitle: 'Save ₦4,000 • Best Value',            price: 48000, originalPrice: 52000 },
  { id: 'maximum',      label: 'Maximum Savings Pack – 3 Packs', subtitle: 'Best for long term • 3 months supply', price: 71000, originalPrice: 77000 },
  { id: 'combo',        label: 'Combo Pack – 4 Packs + 1 free',  subtitle: 'Stock up • Save more',                price: 102000, originalPrice: 110000 },
  { id: 'super_combo',  label: 'Super Combo Pack – 5 Packs + 2 free', subtitle: 'Lower cost per pack • Bigger savings', price: 153000, originalPrice: 194000 },
  { id: 'family',       label: 'Family Pack – 6 Packs + 4 free', subtitle: 'Max value for families',              price: 255000, originalPrice: 356000 },
];

// Fire Pixel with resolved price after confirmed order
const handleOrderSuccess = (packageId) => {
  const pkg = PACKAGES.find(p => p.id === packageId);
  if (pkg && typeof fbq === 'function') {
    fbq('track', 'Purchase', {
      value: pkg.price,
      currency: 'NGN',
    });
  }
};`,
    challenges: [
      {
        problem:
          "The client needed to support four package categories with multiple quantity tiers each. Hardcoding each option in JSX would make any price update a risky, error-prone HTML edit.",
        solution:
          "Centralized all package data in a single JavaScript object keyed by category. React renders radio inputs by iterating over this object, so adding a new tier or changing a price requires a one-line change to the data object — no JSX edits needed.",
      },
      {
        problem:
          "The Facebook Pixel purchase event needed to fire with the exact price of the selected package, but the package selection had to be resolved from a nested data structure at submission time.",
        solution:
          "Stored the selected category key and package ID in React state as the user selects a package. On successful order confirmation from the backend, looked up the matching price from the PACKAGES object using the stored keys and passed it directly to fbq — ensuring the tracked revenue matched the actual order value.",
      },
    ],
  },

  {
    id: 12,
    title: "W3Stores – WordPress E-commerce with Custom PHP & API Integration",
    description:
      "Extended a WordPress/WooCommerce e-commerce store with custom PHP backend logic, JavaScript order form handling, and email API integration — going beyond CMS configuration to implement real backend and frontend engineering.",
    fullDescription: `W3Stores is an e-commerce platform built on WordPress and WooCommerce, extended with custom engineering work on both the frontend and backend. Rather than relying purely on plugins, I implemented custom HTML/CSS order form sections, JavaScript client-side validation, Facebook Pixel conversion tracking, and PHP snippets that hook into WordPress's form submission flow to forward structured order data to an external email API. The project required understanding WordPress hooks, sanitizing user input in PHP, and connecting client-side success states to conversion tracking events — combining CMS-level configuration with real code.`,
    image: "/assets/images/perfect-x.png",
    images: ["/assets/images/perfect-x.png"],
    technologies: [
      "WordPress",
      "WooCommerce",
      "PHP",
      "HTML5",
      "CSS3",
      "JavaScript",
      "REST API",
      "Facebook Pixel",
    ],
    status: "completed",
    completedDate: "February 2026",
    duration: "2 weeks",
    featured: false,
    liveUrl: "https://w3stores.net",
    githubUrl: "",
    architecture:
      "WordPress/WooCommerce CMS extended with custom PHP via WordPress action and filter hooks. JavaScript handles client-side form validation and Pixel event firing. PHP processes form submissions, sanitizes inputs, and forwards structured order data to an external email API endpoint.",
    keyFeatures: [
      "WooCommerce product catalog and checkout",
      "Custom order form with JavaScript validation",
      "PHP form handler using WordPress hooks for submission processing",
      "Email API integration forwarding structured order payloads",
      "Facebook Pixel purchase tracking tied to backend confirmation",
      "Responsive CSS overrides on top of WooCommerce default styles",
    ],
    codeSnippet: `<?php
// Hook into form submission and forward to email API
add_action('perfectx_order_submitted', 'handle_order_submission');

function handle_order_submission($form_data) {
  $payload = [
    'full_name'       => sanitize_text_field($form_data['full_name']),
    'phone_number'    => sanitize_text_field($form_data['phone_number']),
    'address'         => sanitize_textarea_field($form_data['address']),
    'product_package' => sanitize_text_field($form_data['product_package']),
  ];

  $response = wp_remote_post(EMAIL_API_ENDPOINT, [
    'body'    => json_encode($payload),
    'headers' => ['Content-Type' => 'application/json'],
  ]);

  if (is_wp_error($response)) {
    error_log('Order submission failed: ' . $response->get_error_message());
  }
}`,
    challenges: [
      {
        problem:
          "WooCommerce's default checkout did not support the structured order data format required by the client's external email API.",
        solution:
          "Used WordPress action hooks to intercept form submission at the right point in the lifecycle, sanitize all inputs using WordPress's built-in functions, and POST a structured JSON payload to the email API endpoint — keeping the integration clean and independent of WooCommerce's standard order flow.",
      },
      {
        problem:
          "Ensuring the Facebook Pixel purchase event only fires after the backend confirms a successful order — not on form submit alone.",
        solution:
          "Structured the JavaScript fetch call to wait for a success response from the PHP handler before firing the fbq purchase event. This prevented false conversion tracking from form submissions that failed server-side validation or API delivery.",
      },
    ],
  },
];
