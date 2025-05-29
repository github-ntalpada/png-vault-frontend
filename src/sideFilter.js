import React, { useState } from 'react';
import styles from './sideFilter.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter } from "react-icons/fa";
import { FaAngleDoubleLeft} from "react-icons/fa";

const filters = {
  Category: ['Books', 'Electronics', 'Fashion'],
  Price: ['< $25', '$25 - $100', '> $100'],
  Features: ['Free Shipping', 'In Stock', 'On Sale'],
};

export default function SideFilter({ onChange }) {
  const [expanded, setExpanded] = useState('Category');
  const [sidebarExpanded, setSidebarExpanded] = useState('');
  const [selected, setSelected] = useState({});

  const toggleFilter = (section, option) => {
    const current = selected[section] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];

    const newState = { ...selected, [section]: updated };
    setSelected(newState);
    onChange?.(newState);
  };

  return (
    <div className='d-flex flex-colume'>
      <div className={`sidebar ${sidebarExpanded ? 'open' : 'closed'}`}>
        {/* <h2 className="header">🧊 Smart Filters</h2> */}
        {Object.entries(filters).map(([section, options]) => (
          <div key={section} className="section">
            
            <button
              className="sectionTitle"
              onClick={() => setExpanded((e) => (e === section ? null : section))}
            >
              {section}
              <span>{expanded === section ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded === section && (
                <motion.div
                  className="options"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <ul className='options'>
                  {options.map((opt) => (
                    // <button
                    //   key={opt}
                    //   className={`$"chip} ${
                    //     selected[section]?.includes(opt) ? styles.active : ''
                    //   }`}
                    //   onClick={() => toggleFilter(section, opt)}
                    // >
                    //   {opt}
                    // </button>
                    <li key={opt}>
                      <label>
                        <input
                          type="checkbox"
                          checked={(selected[section] || []).includes(opt)}
                          onChange={() => toggleFilter(section, opt)}
                        />
                        {opt}
                      </label>
                    </li>

                  ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
   
      <button
        className={`sliderExpandButton ${sidebarExpanded ? 'open' : ''}`}
         onClick={() => setSidebarExpanded((e) => !e)}
      >
        {sidebarExpanded ? <FaAngleDoubleLeft /> : <FaFilter />}
      </button>
    </div>
  );
}
