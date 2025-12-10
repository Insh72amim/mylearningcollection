import React, { useEffect, useState, Suspense } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { BookOpen, Code, AlertTriangle } from "lucide-react";
import { getTechnologyById } from "../config/technologies";
import { componentRegistry } from "../config/componentRegistry";

const TechnologyPage = () => {
  const { technologyId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("docs");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab === "playground") {
      setActiveTab("playground");
    } else {
      setActiveTab("docs");
    }
  }, [location.search]);

  const tech = getTechnologyById(technologyId);

  if (!tech) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!tech.hasVisualizer && activeTab !== "docs") {
      setActiveTab("docs");
    }
  }, [tech.hasVisualizer, tech.id, activeTab]);

  const DocComponent = componentRegistry[tech.docComponent];

  const getVisualizerComponent = () => {
    if (tech.id === "kafka") {
      return componentRegistry.KafkaArchitecture;
    }
    return null;
  };

  const VisualizerComponent = getVisualizerComponent();

  // Helper for dynamic colors
  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/20 bg-blue-500/10",
      green: "from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      purple: "from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/20 bg-purple-500/10",
      orange: "from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/20 bg-orange-500/10",
      red: "from-red-500/20 to-rose-500/20 text-red-400 border-red-500/20 bg-red-500/10",
      pink: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/20 bg-pink-500/10",
      teal: "from-teal-500/20 to-emerald-500/20 text-teal-400 border-teal-500/20 bg-teal-500/10",
      indigo: "from-indigo-500/20 to-blue-500/20 text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
      fuchsia: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/10",
      cyan: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
      amber: "from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/20 bg-amber-500/10",
    };
    return colors[color] || colors.blue;
  };

  const colorClass = getColorClasses(tech.color);

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header Section */}


      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-16 h-16 bg-gray-800 rounded-full opacity-50"></div>
                <div className="h-4 w-48 bg-gray-800 rounded opacity-50"></div>
              </div>
            </div>
          }
        >
          {activeTab === "docs" ? (
            DocComponent ? (
              <div className="h-full overflow-y-auto custom-scrollbar bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-full">
                  <DocComponent />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
                  <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    Coming Soon
                  </h3>
                  <p className="max-w-md mx-auto">
                    The documentation for {tech.name} is currently being authored.
                    Check back shortly.
                  </p>
                </div>
              </div>
            )
          ) : VisualizerComponent ? (
            <div className="h-full w-full bg-gray-900">
              <VisualizerComponent />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
                <Code size={64} className="mx-auto mb-4 text-gray-600" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Visualizer
                </h2>
                <p className="text-gray-400">
                  Interactive visualization module is under construction.
                </p>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default TechnologyPage;
