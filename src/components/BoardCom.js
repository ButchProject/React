import React, { useState, useEffect } from 'react';

function PostList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/post/list`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {data.map((item, index) =>
        <div key={index}>
          <h2>{item.postDTO.title}</h2>
          <p>{item.postDTO.province}</p>
          <p>{item.postDTO.city}</p>
          <p>{item.postDTO.comment}</p>

          {item.nodeDTOList.map((node, nodeIndex) =>
            <div key={nodeIndex}>
              <h3>Node #{node.nodeNum}: {node.nodeName}</h3>
              <p>Latitude: {node.latitude}, Longitude: {node.longitude}</p>
              <p>Time: {node.hour}:{node.minute}</p>
              <p>Detailed Location: {node.detailedLocation}</p>
            </div>)}
        </div>)
      }
    </div>);
}

export default PostList;
