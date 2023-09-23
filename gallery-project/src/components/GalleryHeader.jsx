import Logout from "./LogOut";

function GalleryHeader({ searchQuery, handleSearchQueryChange }) {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
  };
    return (
      <div className="header">
        <h2>Gallery-Project</h2>
        <form className="search" onSubmit={handleSubmit}>
          <input type="search" name="query" id="search-query" placeholder='Enter tag to search'
            value={searchQuery}
            onChange={handleSearchQueryChange} />
        
        </form>  
        <Logout/>      
      </div>
    );
  }
  export default GalleryHeader