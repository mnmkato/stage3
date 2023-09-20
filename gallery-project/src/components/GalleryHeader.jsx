import Logout from "./LogOut";

function GalleryHeader({ searchQuery, handleSearchQueryChange }) {
    return (
      <div className="header">
        <h2>Gallery-Project</h2>
        <form className="search">
          <input type="search" name="" id="" placeholder='Enter tag to search'
            value={searchQuery}
            onChange={handleSearchQueryChange} />
        <button className="search-btn">Search</button>
        </form>  
        <Logout/>      
      </div>
    );
  }
  export default GalleryHeader