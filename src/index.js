import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import folder from './assets/folder.png'
import plus from './assets/plus.png'
import minus from './assets/minus.png'
import file from './assets/file.png'
import { data } from './data.ts'

function Tree({ treeData }) {
  console.log(treeData)
  return (
    <ul className='treeContainer'>
      {treeData.map((node) => (
        <TreeNode node={node} key={node.key} />
      ))}
    </ul>
  );
}

function TreeNode({ node }) {
  const hasFolder = node.children.length != 0
  const [openFolder, setOpenFolder] = useState(false)
  console.log(node.children);
  console.log("///////////////////")
  console.log(hasFolder);
  return (
    <li className='nodeBlock'>
      {node.type === "folder" ?
        <>{hasFolder && !openFolder ?
          <div className="item">
            <img src={plus} className='icon' alt="+" onClick={() => setOpenFolder(!openFolder)} />
            <img src={folder} className='icon' alt="open" />
            <span> {node.name} </span>
          </div>
          : <div className="item">
            <img src={minus} className='icon' alt="-"
              onClick={() => setOpenFolder(!openFolder)} />
            <img src={folder} className='icon' alt="close" />
            <span> {node.name} </span>
          </div>}</>
        :
        <div className='item'>
          <img src={file} className='icon' alt="file" />
          <span>{node.name}</span>
        </div>
      }
      {hasFolder && openFolder && (
        <ul>
          <Tree treeData={node.children} />
        </ul>
      )}
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <h1 className='header'>Simple Tree</h1>
    <Tree treeData={data} />
  </div>
);
