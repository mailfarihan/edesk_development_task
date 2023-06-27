import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';

const TreeNode = ({ node, level, onToggle, open, handleFilter }) => {
  // Handle click on a tree node
  const handleNodeClick = (key, level) => {
    onToggle(key, level);
    if (level === 2 && handleFilter) {
      handleFilter(key);
    }
  };

  return (
    <ul className="list-group">
      {Object.entries(node).map(([key, value]) => (
        <li key={key} className="list-group-item">
          <div
            role="button"
            className={`tree-node level-${level} ${open[level]?.includes(key) ? 'expanded' : 'collapsed'}`}
            onClick={() => handleNodeClick(key, level)}
            aria-expanded={open[level]?.includes(key)}
            aria-controls={`collapse-${key}`}
          >
            {level < 2 ? (open[level]?.includes(key) ? '-' : '+') : ''} {key}
          </div>
          <Collapse in={open[level]?.includes(key)}>
            <div id={`collapse-${key}`}>
              {typeof value === 'object' && value !== null && (
                <TreeNode
                  node={value}
                  level={level + 1}
                  onToggle={onToggle}
                  open={open}
                  handleFilter={handleFilter}
                />
              )}
            </div>
          </Collapse>
        </li>
      ))}
    </ul>
  );
};

const ListExperiment = ({ data, handleFilter }) => {
  const [tree, setTree] = useState({}); // Tree structure
  const [expandedNodes, setExpandedNodes] = useState([]); // Expanded nodes state

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    // Build the tree structure
    const treeData = {};

    data.forEach((user) => {
      const { country, state, city } = user;

      if (!treeData[country]) {
        treeData[country] = {};
      }
      if (!treeData[country][state]) {
        treeData[country][state] = {};
      }
      treeData[country][state][city] = null;
    });

    setTree(treeData);
  }, [data]);

  // Toggle expansion state of a node
  const handleToggle = (key, level) => {
    setExpandedNodes((prevState) => {
      const updatedNodes = [...prevState];
      while (updatedNodes.length <= level) {
        updatedNodes.push([]);
      }
      const nodes = [...updatedNodes[level]];
      const index = nodes.indexOf(key);
      if (index !== -1) {
        nodes.splice(index, 1);
      } else {
        nodes.push(key);
      }
      updatedNodes[level] = nodes;
      return updatedNodes;
    });
  };

  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="tree-container">
      <TreeNode
        node={tree}
        level={0}
        onToggle={handleToggle}
        open={expandedNodes}
        handleFilter={handleFilter}
      />
    </div>
  );
};

export default ListExperiment;
