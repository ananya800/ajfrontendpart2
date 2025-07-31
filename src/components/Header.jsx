import React from 'react'
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

const Header = ({selectedCategory , setSelectedCategory}) => {
  return (
    <div>
      <Navbar/>

      <CategoryFilter
        selected={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat === selectedCategory ? null : cat)}
      />

    </div>
  )
}

export default Header