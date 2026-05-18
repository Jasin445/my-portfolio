import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";
import Header from "../../components/ui/Header";
import ScrollProgress from "../../components/ui/ScrollProgress";

import BlogFilter from "./components/BlogFilter";
import FeaturedArticles from "./components/FeaturedArticles";
import BlogGrid from "./components/BlogGrid";
import CategoryTags from "./components/CategoryTags";
import NewsletterSignup from "./components/NewsletterSignup";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import GenericHeroSection from "../portfolio-projects/components/GenericHero";
import { useGetArticlesFromHashnode } from "../../apis/queries";

const ArticleCard = ({ article }) => (
  <a
    href={`https://yourname.hashnode.dev/${article.slug}`}
    target="_blank" rel="noreferrer"
    className="block bg-[rgba(32,40,41,0.95)] rounded-[14px] overflow-hidden 
      border border-white/5 hover:border-primary/30 transition-colors duration-200"
  >
    {article.coverImage?.url && (
      <img src={article.coverImage.url} alt=""
        className="w-full h-[140px] object-cover" />
    )}
    <div className="p-4">
      {article.tags?.[0] && (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 
          text-primary font-medium inline-block mb-2">
          {article.tags[0].name}
        </span>
      )}
      <h3 className="text-white text-sm font-semibold leading-snug mb-1.5 
        line-clamp-2">{article.title}</h3>
      <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">
        {article.brief}
      </p>
      <div className="flex items-center gap-2 text-white/25 text-[11px] 
        border-t border-white/5 pt-2.5">
        <Clock size={12} />
        {article.readTimeInMinutes} min
        <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
        {new Date(article.publishedAt).toLocaleDateString('en-US', 
          { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>
    </div>
  </a>
);

const TechnicalBlog = () => {
  const { loading, data } = useGetArticlesFromHashnode();
  const posts = data?.data?.publication?.posts?.edges?.map(e => e.node) ?? [];
  const [featured, ...rest] = posts;

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <span className="text-white/30 text-sm">Loading articles...</span>
    </div>
  );

  if (!posts.length) return <BlogComingSoon />;

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
        border border-primary/25 bg-primary/8 text-primary text-xs font-medium mb-4">
        <Pencil size={12} /> Build log
      </div>
      <h2 className="text-white text-3xl font-bold mb-1">Articles & Write-ups</h2>
      <p className="text-white/45 text-sm mb-10">
        Things I've built, lessons from real projects, and the decisions behind the code.
      </p>

      {/* Featured */}
      {featured && (
        <a href={`https://yourname.hashnode.dev/${featured.slug}`}
          target="_blank" rel="noreferrer"
          className="grid md:grid-cols-2 mb-12 rounded-2xl overflow-hidden 
            border border-white/6 hover:border-primary/20 transition-colors duration-200">
          {featured.coverImage?.url && (
            <img src={featured.coverImage.url} alt=""
              className="w-full h-[220px] object-cover" />
          )}
          <div className="bg-[rgba(32,40,41,0.95)] p-6">
            <div className="flex gap-2 flex-wrap mb-3">
              {featured.tags?.map(t => (
                <span key={t.name} className="text-[11px] px-2.5 py-1 rounded-full 
                  bg-primary/12 text-primary font-medium">{t.name}</span>
              ))}
            </div>
            <h2 className="text-white text-lg font-bold leading-snug mb-2">
              {featured.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
              {featured.brief}
            </p>
            <div className="flex items-center gap-3 text-white/30 text-xs">
              <Calendar size={12} />
              {new Date(featured.publishedAt).toLocaleDateString('en-US',
                { month: 'short', day: 'numeric', year: 'numeric' })}
              <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
              <Clock size={12} /> {featured.readTimeInMinutes} min read
              <span className="ml-auto flex items-center gap-1 text-primary font-medium">
                Read article <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </a>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <>
          <p className="text-white text-sm font-semibold mb-5">More articles</p>
          <div className="grid md:grid-cols-3 gap-4">
            {rest.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default TechnicalBlog;


const BlogComingSoon = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = () => {
    if (!email.trim()) return;
    setSubmitted(true);
  };

  const topics = [
    { icon: "Code2", label: "Frontend Engineering" },
    { icon: "Layers", label: "System Design" },
    { icon: "Zap", label: "Performance" },
    { icon: "BookOpen", label: "Dev Learnings" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2a363c] via-[#131426]/95 to-[#2a363c]/90 flex flex-col">
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#172034] to-white blur-[340px] opacity-20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/20 to-transparent" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Header />

      <main className="relative flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center mt-8 sm:mt-0 gap-2 px-2 sm:px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium mb-4 sm:mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Something is brewing
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            My Articles
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              Coming Soon
            </span>
          </h1>

          <p className="text-foreground/50 text-base leading-relaxed max-w-md mx-auto mb-10">
            Writing about frontend engineering, things I've built, lessons from real projects,
            and the decisions behind the code. No fluff — just honest technical content.
          </p>

          {/* Topic pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {topics.map((topic) => (
              <div
                key={topic.label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 rounded-full text-xs text-foreground/50 hover:border-primary/30 hover:text-foreground/80 transition-colors duration-200"
              >
                <Icon name={topic.icon} size={11} />
                {topic.label}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

          {/* Notify form */}
          {!submitted ? (
            <div>
              <p className="text-foreground/40 text-xs mb-4 uppercase tracking-widest">
                Get notified when it's live
              </p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/40 transition-colors"
                />
                <button
                  onClick={handleNotify}
                  className="px-4 py-2.5 bg-primary hover:bg-primary/80 text-white text-sm font-medium rounded-xl transition-colors duration-200 flex items-center gap-2 group"
                >
                  Notify me
                  <Icon
                    name="ArrowRight"
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
              <Icon name="CheckCircle2" size={16} />
              <span>You're on the list. I'll reach out when it's live.</span>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs text-foreground/30 hover:text-foreground/60 transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={12} />
              Back to portfolio
            </a>
          </div>
        </div>
      </main>

      <Footer lightweight />
    </div>
  );
};