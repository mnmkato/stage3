import '../App.css';
import pics from '../pics';
import React, { useState, useEffect } from 'react';
import auth from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GalleryHeader from '../components/GalleryHeader';

function Gallery() {
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState({
    pics: pics,
    filteredData: pics,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const filteredData = data.pics.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setData((prevData) => ({ ...prevData, filteredData }));
    setSelected(0);
  }, [searchQuery, data.pics]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [draggingIndex, setDraggingIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggingIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const sourceIndex = draggingIndex;
    const newData = [...data.filteredData];
    const [draggedItem] = newData.splice(sourceIndex, 1);
    newData.splice(index, 0, draggedItem);
    setData((prevData) => ({
      ...prevData,
      filteredData: newData,
    }));
    setDraggingIndex(null);
    setHoveredIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setHoveredIndex(null);
  };

  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleTouchStart = (index) => {
    setDraggingIndex(index);
  };

  const handleTouchMove = (index) => {
    setHoveredIndex(index);
  };

  const handleTouchEnd = () => {
    const sourceIndex = draggingIndex;
    const newData = [...data.filteredData];
    const [draggedItem] = newData.splice(sourceIndex, 1);
    newData.splice(hoveredIndex, 0, draggedItem);
    setData((prevData) => ({
      ...prevData,
      filteredData: newData,
    }));
    setDraggingIndex(null);
    setHoveredIndex(null);
  };

  return (
    <>
      <GalleryHeader searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
      <div className="content">
        {data.filteredData.length === 0 ? (
          <div className="results-not-found">Results Not Found</div>
        ) : (
          <>
            <div className="gallery">
              {data.filteredData.map((item, index) => (
                <div
                  key={item.id}
                  className={
                    index === selected
                      ? 'gallery-item selected-photo'
                      : index === draggingIndex
                      ? 'gallery-item dragged-photo'
                      : index === hoveredIndex
                      ? 'gallery-item hovered-photo'
                      : 'gallery-item'
                  }
                  onClick={() => setSelected(index)}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={() => handleTouchStart(index)}
                  onTouchMove={() => handleTouchMove(index)}
                  onTouchEnd={handleTouchEnd}
                >
                  <img src={item.photo} alt="" />
                  <div className="gallery-item-tags">
                    {data.filteredData[index].tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Gallery;
