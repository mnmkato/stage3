import '../App.css';
import pics from '../pics';
import React, { useState, useEffect } from 'react';
import auth from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import GalleryHeader from '../components/GalleryHeader';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Gallery() {
  const [data, setData] = useState({
    pics: pics,
    filteredData: pics,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedItemId, setDraggedItemId] = useState(null); 

  useEffect(() => {
    const filteredData = data.pics.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setData((prevData) => ({ ...prevData, filteredData }));
  }, [searchQuery, data.pics]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const onDragStart = (initial) => {
    setDraggedItemId(initial.draggableId);
  };

  const onDragEnd = (result) => {
    setDraggedItemId(null);

    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    console.log(
      "sourceIndex "+result.source.index+
      " destinationIndex "+result.destination.index)

    const newData = [...data.filteredData];
    const [draggedItem] = newData.splice(sourceIndex, 1);
    newData.splice(destinationIndex, 0, draggedItem);

    setData((prevData) => ({
      ...prevData,
      filteredData: newData,
    }));
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
  
  return (
    <>
      <GalleryHeader searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
      <div className="content">
        {data.filteredData.length === 0 ? (
          <div className="results-not-found">Results Not Found</div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="gallery" direction='horizontal'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="gallery"
                >
                  {data.filteredData.map((item, index) => (
                    <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                    isDragDisabled={false}
                    onStart={() => onDragStart({ draggableId: item.id })}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`gallery-item ${snapshot.isDragging ? 'isDragging' : ''}`}
                      >
                        <img src={item.photo} alt="" />
                        <div className="gallery-item-tags">
                          {item.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </Draggable>
                  
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </>
  );
}

export default Gallery;
