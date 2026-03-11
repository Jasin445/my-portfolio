import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../.././components/AppIcon";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import GenericHeroSection from "../portfolio-projects/components/GenericHero";
import Footer from "../../components/Footer";
import emailJs from "@emailjs/browser";
import useToast from "../../hooks/useToast";
import { ToastContainer } from "../../components/toast";
import { RevealSection } from "../../utils/animation.utils";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const ContactConnect = () => {
  const { toasts, toast, removeToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://www.linkedin.com/in/jason-dagana-73a470317/",
      color: "text-blue-600",
      followers: "Let's connect",
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/Jasin445",
      color: "text-gray-300",
      followers: "Follow me",
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "#",
      color: "text-blue-400",
      followers: "950",
    },
    {
      name: "WhatsApp",
      icon: "MessageCircle",
      url: "https://wa.me/2349013642811",
      color: "text-green-500",
      followers: "Chat me",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    const loadingId = toast.loading("Sending your message...");

    try {
      await emailJs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          fullname: formData.name,
          email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY,
      );

      removeToast(loadingId);
      toast.success("Message sent! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      removeToast(loadingId);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Helmet>
          <title>Contact Connect - DevPortfolio Pro</title>
          <meta
            name="description"
            content="Get in touch with Alex Developer for your next project. Available for full-time positions, freelance work, consulting, and collaboration opportunities."
          />
          <meta
            name="keywords"
            content="contact developer, hire react developer, freelance frontend, web development services, technical consulting"
          />
          <meta
            property="og:title"
            content="Contact Connect - Jason Dagana Portfolio"
          />
          <meta
            property="og:description"
            content="Ready to work together? Contact Alex Developer for professional frontend development services and opportunities."
          />
          <meta property="og:type" content="website" />
          <link
            rel="canonical"
            href="https://jason-dagana.vercel.app/contact-connect"
          />
        </Helmet>
        <Header />
        <main className="relative min-h-screen bg-gradient-to-br from-background via-card to-muted/20">
          <div className="bg-background">
            {/* Hero Section */}
            <section className="">
              <GenericHeroSection
                message="Hi there! Lets do something amazing together!"
                image="bg-[url('/assets/images/contact-hero.jpg')]"
                overlay="from-[#131426]/80 via-[#0f1115]/80 to-[#2a363c]/80"
                title={"Contact Me"}
              />
            </section>
          </div>
          <section className="relative max-w-7xl mx-auto py-8 sm:py-14 lg:py-28 px-4 sm:px-6 z-20">
            <div className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2a363c]/90 via-[#131426] to-[#2a363c]/90 blur-[10px]" />
              <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/70 to-[#2a363c] h-20 blur-xl bottom-0 translate-y-4"></div>
              <div className="absolute inset-x-0 bg-gradient-to-b from-[#131426]/90 via-[#2a363c] to-[#131426]/60 blur-[340px] h-20 -bottom-10 translate-y-14"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Info */}
              <div className="space-y-8">
                <RevealSection direction="left">
                  <div>
                    <div className="inline-flex items-center pl-0 md:pl-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Get In Touch
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-4">
                      Let's Work Together
                    </h2>

                    <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-8">
                      I'm always interested in new opportunities and exciting
                      projects. Whether you're a startup looking for a technical
                      co-founder or an established company needing frontend
                      expertise, let's discuss how we can create something
                      amazing together.
                    </p>
                  </div>
                  {/* Contact Methods */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-[#2a363c]/80  overflow-hidden rounded-lg border border-border">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Mail" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-medium text-foreground">
                          Email
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          daganajason72@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-[#2a363c]/80  overflow-hidden rounded-lg border border-border">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Phone" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm sm:text-base">
                          Phone
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          +234 9013642811
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-[#2a363c]/80  overflow-hidden rounded-lg border border-border">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon
                          name="MapPin"
                          size={20}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm sm:text-base">
                          Location
                        </div>
                        <div className="text-sm text-muted-foregroundtext-xs sm:text-sm ">
                          Abuja, Nigeria
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealSection>

                {/* Quick Action */}
                <RevealSection direction="down">
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">
                      Connect With Me
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks?.map((social) => (
                        <a
                          key={social?.name}
                          href={social?.url}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-3 bg-[#2a363c]/80 overflow-hidden rounded-lg border border-border hover:shadow-md transition-shadow duration-fast group"
                        >
                          <Icon
                            name={social?.icon}
                            size={20}
                            className={`${social?.color} group-hover:scale-110 transition-transform duration-fast`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-xs sm:text-sm">
                              {social?.name}
                            </div>
                            <div className="text-[11px] sm:text-sm leading-loose text-muted-foreground/40">
                              {social?.followers}
                            </div>
                          </div>
                          <Icon
                            name="ExternalLink"
                            size={14}
                            className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </RevealSection>
              </div>

              {/* Contact Form */}
              <RevealSection direction="right">
                <div className="bg-[#2a363c]/80 overflow-hidden relative z-[9999] rounded-xl border border-border px-4 py-8 sm:p-8 shadow-sm">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-6">
                    Send a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Full Name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="placeholder:text-xs sm:placeholder:text-sm bg-transparent"
                      value={formData?.name}
                      onChange={handleInputChange}
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      className="placeholder:text-xs sm:placeholder:text-sm bg-transparent"
                      placeholder="Enter your email address"
                      value={formData?.email}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell me about your project or how I can help..."
                        value={formData?.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-transparent text-foreground placeholder:text-xs sm:placeholder:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      fullWidth
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-border text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Or explore more about my work
                    </p>
                    <div className="flex flex-row gap-0 sm:gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="User"
                        iconPosition="left"
                        fullWidth
                        asChild
                      >
                        <Link
                          className="text-xs sm:text-sm"
                          to="/about-professional"
                        >
                          About Me
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="FileText"
                        iconPosition="left"
                        fullWidth
                        asChild
                      >
                        <Link
                          className="text-xs sm:text-sm"
                          to="/technical-blog"
                        >
                          Read Blog
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>
          </section>
        </main>
        <Footer />
    </>
  );
};

export default ContactConnect;
