import React, { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronsUp,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { categories, superCategories } from "../config/technologies";

const Layout = () => {
  const location = useLocation();
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedSuperCategories, setExpandedSuperCategories] = useState(() =>
    superCategories.map((group) => group.id)
  );
  const [expandedCategories, setExpandedCategories] = useState([
    "data-engineering",
    "databases",
  ]);

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
                <Link
                  key={tech.id}
                  to={tech.comingSoon ? "#" : techPath}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? `${colorClasses.bg} ${colorClasses.text} font-medium`
                      : tech.comingSoon
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                  onClick={(e) => tech.comingSoon && e.preventDefault()}>
                  <span>{tech.name}</span>
                  {tech.comingSoon ? (
                    <span className="text-[10px] bg-gray-700 text-gray-400 px-2 py-0.5 rounded">
                      Soon
                    </span>
                  ) : tech.hasVisualizer ? (
                    <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-700/50">
                      Visual
                    </span>
                  ) : null}
                </Link>
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
        <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-gray-100">
            <PanelLeftOpen size={18} />
            <span>Menu</span>
          </button>
          <Link to="/" className="text-base font-semibold">
            KnowledgeShelf
          </Link>
        </div>

        {!isMobile && sidebarHidden && (
          <button
            onClick={() => setSidebarHidden(false)}
            className="absolute top-4 left-6 z-20 p-3 bg-gray-800/90 border border-gray-700 rounded-full text-gray-200 shadow-lg hover:bg-gray-700 transition"
            aria-label="Show sidebar">
            <PanelLeftOpen size={18} />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
