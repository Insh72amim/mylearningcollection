import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronsUp,
  PanelLeftClose,
  PanelLeftOpen,
  Code,
} from "lucide-react";
import SearchModal from "./common/SearchModal";
import { categories, superCategories } from "../config/technologies";

const Layout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedSuperCategories, setExpandedSuperCategories] = useState(() =>
    superCategories.map((group) => group.id)
  );
  const [expandedCategories, setExpandedCategories] = useState([]);

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => {
      map.set(category.id, category);
    });
    return map;
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSuperCategory = (superCategoryId) => {
    setExpandedSuperCategories((prev) =>
      prev.includes(superCategoryId)
        ? prev.filter((id) => id !== superCategoryId)
        : [...prev, superCategoryId]
    );
  };

  const isActive = (path) => location.pathname === path;

  const getColorClasses = (color, isExpanded) => {
    const colors = {
      blue: {
        bg: "bg-blue-900/30",
        border: "border-blue-700/50",
        text: "text-blue-400",
        hover: "hover:bg-blue-900/50",
      },
      purple: {
        bg: "bg-purple-900/30",
        border: "border-purple-700/50",
        text: "text-purple-400",
        hover: "hover:bg-purple-900/50",
      },
      green: {
        bg: "bg-green-900/30",
        border: "border-green-700/50",
        text: "text-green-400",
        hover: "hover:bg-green-900/50",
      },
      orange: {
        bg: "bg-orange-900/30",
        border: "border-orange-700/50",
        text: "text-orange-400",
        hover: "hover:bg-orange-900/50",
      },
      red: {
        bg: "bg-red-900/30",
        border: "border-red-700/50",
        text: "text-red-400",
        hover: "hover:bg-red-900/50",
      },
      amber: {
        bg: "bg-amber-900/30",
        border: "border-amber-700/50",
        text: "text-amber-400",
        hover: "hover:bg-amber-900/50",
      },
      sky: {
        bg: "bg-sky-900/30",
        border: "border-sky-700/50",
        text: "text-sky-400",
        hover: "hover:bg-sky-900/50",
      },
      indigo: {
        bg: "bg-indigo-900/30",
        border: "border-indigo-700/50",
        text: "text-indigo-400",
        hover: "hover:bg-indigo-900/50",
      },
      fuchsia: {
        bg: "bg-fuchsia-900/30",
        border: "border-fuchsia-700/50",
        text: "text-fuchsia-400",
        hover: "hover:bg-fuchsia-900/50",
      },
    };
    return colors[color] || colors.blue;
  };

  const renderCategoryBlock = (category) => {
    if (!category) {
      return null;
    }

    const Icon = category.icon;
    const isExpanded = expandedCategories.includes(category.id);
    const colorClasses = getColorClasses(category.color, isExpanded);

    return (
      <div key={category.id} className="mb-2">
        <button
          onClick={() => toggleCategory(category.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
            colorClasses.hover
          } ${
            isExpanded
              ? `${colorClasses.bg} border ${colorClasses.border}`
              : "text-gray-300"
          }`}>
          <div className="flex items-center gap-3">
            <Icon size={18} className={isExpanded ? colorClasses.text : ""} />
            <span className="font-semibold text-sm">{category.name}</span>
          </div>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {isExpanded && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-4">
            {category.technologies.map((tech) => {
              const techPath = `/${category.id}/${tech.id}`;
              const active = isActive(techPath);

              return (
                <div
                  key={tech.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors group/item ${
                    active
                      ? `${colorClasses.bg} ${colorClasses.text} font-medium`
                      : tech.comingSoon
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  onClick={(e) => {
                    if (tech.comingSoon) e.preventDefault();
                  }}>
                  <Link to={tech.comingSoon ? "#" : techPath} className="flex-1">
                    {tech.name}
                  </Link>

                  <div className="flex items-center gap-2">
                    {tech.comingSoon ? (
                      <span className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded">
                        Soon
                      </span>
                    ) : (
                      <>
                        {tech.hasVisualizer && (
                          <Link
                            to={`${techPath}?tab=playground`}
                            className="p-1.5 rounded-md hover:bg-gray-600/50 text-gray-400 hover:text-green-400 transition-colors"
                            title="Open Visualizer">
                            <Code size={14} />
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderDirectCategoryLinks = (categoryList, colorClasses) => {
    return (
      <div className="space-y-1">
        {categoryList.map((category) => {
          const firstTech = category?.technologies?.[0];
          if (!category || !firstTech) {
            return null;
          }

          const techPath = `/${category.id}/${firstTech.id}`;
          const active = isActive(techPath);
          const disabled = firstTech.comingSoon;
          const Icon = category.icon;

          return (
            <Link
              key={category.id}
              to={disabled ? "#" : techPath}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? `${colorClasses.bg} ${colorClasses.text} font-medium`
                  : disabled
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              onClick={(e) => disabled && e.preventDefault()}>
              <span className="flex items-center gap-2">
                {Icon && <Icon size={14} />}
                {category.name}
              </span>
              {disabled && (
                <span className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded">
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </div>
    );
  };

  const hasAnyExpanded =
    expandedCategories.length > 0 || expandedSuperCategories.length > 0;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700 overflow-hidden">
      {/* Sidebar Header */}
      <div className="flex-shrink-0 bg-gray-800 z-10">
        <div className="px-4 border-b border-gray-700 relative flex items-center h-[52px]">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <h1 className="text-xl font-bold">KnowledgeShelf</h1>
          </Link>

          {isMobile && (
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              aria-label="Close sidebar">
              <PanelLeftClose size={16} />
            </button>
          )}
        </div>

        <div className="px-4 pt-2 pb-2 space-y-2 border-b border-gray-700/50">
          {/* Home Link */}
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}>
            <BookOpen size={20} />
            <span>Home</span>
          </Link>

          {/* Collapse All Option */}
          {hasAnyExpanded && (
            <button
              onClick={() => {
                setExpandedCategories([]);
                setExpandedSuperCategories([]);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors group">
              <ChevronsUp
                size={16}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              <span>Collapse All</span>
            </button>
          )}

          {!isMobile && (
            <button
              onClick={() => setSidebarHidden(true)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <PanelLeftClose size={16} />
              <span>Hide Sidebar</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto custom-scrollbar">
        {superCategories.map((group) => {
          const GroupIcon = group.icon;
          const isGroupExpanded = expandedSuperCategories.includes(group.id);
          const colorClasses = getColorClasses(group.color, isGroupExpanded);
          const layoutMode = group.layout || "nested";
          const resolvedCategories = group.categoryIds
            .map((categoryId) => categoryMap.get(categoryId))
            .filter(Boolean);
          const contentWrapperClasses =
            layoutMode === "direct"
              ? "ml-3 mt-2 space-y-2"
              : "ml-3 mt-2 space-y-3 border-l-2 border-gray-700/60 pl-3";

          return (
            <div key={group.id} className="mb-4">
              <button
                onClick={() => toggleSuperCategory(group.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  colorClasses.hover
                } ${
                  isGroupExpanded
                    ? `${colorClasses.bg} border ${colorClasses.border}`
                    : "text-gray-300"
                }`}>
                <div className="flex items-center gap-3">
                  <GroupIcon
                    size={20}
                    className={isGroupExpanded ? colorClasses.text : ""}
                  />
                  <span className="font-semibold text-sm">{group.name}</span>
                </div>
                {isGroupExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {isGroupExpanded && (
                <div className={contentWrapperClasses}>
                  {layoutMode === "direct"
                    ? renderDirectCategoryLinks(
                        resolvedCategories,
                        colorClasses
                      )
                    : resolvedCategories.map((category) =>
                        renderCategoryBlock(category)
                      )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      {isMobile ? (
        <>
          <div
            className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              mobileSidebarOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85%] transform transition-transform duration-300 ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
            {sidebarContent}
          </div>
        </>
      ) : (
        !sidebarHidden && (
          <div className="hidden lg:flex w-80">{sidebarContent}</div>
        )
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900 relative">
        <div className="lg:hidden sticky top-0 z-20 border-b border-gray-800/60 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side - Menu button with enhanced styling */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="group flex items-center gap-3 px-4 py-2.5 bg-gray-800/60 hover:bg-gray-700/70 border border-gray-700/40 hover:border-gray-600/50 rounded-xl text-gray-100 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm">
              <PanelLeftOpen
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-medium text-sm">Menu</span>
            </button>
            {/* Center - Logo with enhanced styling */}
            <Link
              to="/"
              className="group flex items-center gap-3 px-4 py-2 hover:bg-gray-800/40 rounded-xl transition-all duration-200 backdrop-blur-sm">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm -z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  KnowledgeShelf
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Learn • Build • Master
                </span>
              </div>
            </Link>
            {/* Right side - Optional actions placeholder */}
            <div className="w-[88px]"></div> {/* Spacer to center the logo */}
          </div>
        </div>

        {!isMobile && sidebarHidden && (
          <div className="absolute top-6 left-6 z-20">
            {/* Enhanced floating sidebar toggle */}
            <button
              onClick={() => setSidebarHidden(false)}
              className="group relative p-4 bg-gradient-to-r from-gray-800/90 to-gray-700/90 border border-gray-600/50 hover:border-gray-500/60 rounded-2xl text-gray-200 hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-lg"
              aria-label="Show sidebar">
              <PanelLeftOpen
                size={20}
                className="group-hover:scale-110 transition-transform duration-200"
              />

              {/* Glowing effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

              {/* Tooltip */}
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg border border-gray-700">
                Show Navigation
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 border-l border-b border-gray-700 rotate-45"></div>
              </div>
            </button>
          </div>
        )}
        <Outlet />
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Layout;
