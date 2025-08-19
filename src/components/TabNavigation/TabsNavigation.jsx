import React, { useState, useEffect } from "react";

const TabsNavigation = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = Number(localStorage.getItem("activeTab"));
        return savedTab >= 0 && savedTab < tabs.length ? savedTab : 0;
      });

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    return (
        <div>
            {/* Navigation Bar */}
            <div className="w-full bg-teal-50 p-1 flex flex-row gap-2">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`${activeTab === index
                            ? "bg-gray-150 text-blue-500 shadow-md p-1"
                            : "p-1"
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: "5px", padding: "5px", border: "1px solid #ddd" }}>
                {React.createElement(tabs[activeTab].component)}
            </div>
        </div>
    );
};

export default TabsNavigation;