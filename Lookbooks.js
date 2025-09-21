import React, { useState } from 'react';
import './Lookbooks.css'; 
import LookbookCard from './LookbookCard'; 
const img1 = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop';
const img2 = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop';
const img3 = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop';
const img4 = 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=400&fit=crop';
const img5 = 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop';
const img6 = 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=300&h=400&fit=crop';
const img7 = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop';
const img8 = 'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=300&h=400&fit=crop';
const img9 = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop';
const img10 = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop';


const Lookbooks = () => {

  const initialLookbooks = [
    { id: 1, tags: ['FormalAttire', 'ClassyOutfit'], boosts: 1500, image: image1 },
    { id: 2, tags: ['CasualWear', 'StreetStyle'], boosts: 1200, image: image2 },
    { id: 3, tags: ['FormalAttire', 'BusinessCasual'], boosts: 1800, image: image3  },
    { id: 4, tags: ['SportyLook', 'Athleisure'], boosts: 1000, image: image4  },
    { id: 5, tags: ['FormalAttire', 'ElegantStyle'], boosts: 1600 , image: image5 },
    { id: 6, tags: ['FormalAttire', 'ChicFashion'], boosts: 1400 , image: image6 },
    { id: 7, tags: ['BohoStyle', 'FestivalFashion'], boosts: 900, image: image7 },
    { id: 8, tags: ['WinterWear', 'CozyOutfit'], boosts: 1100 , image: image8},
    { id: 9, tags: ['SummerStyle', 'BeachWear'], boosts: 1300, image: image9},
    { id: 10, tags: ['VintageLook', 'RetroFashion'], boosts: 1700 , image: image10 },
  ];

  const [lookbooks, setLookbooks] = useState(initialLookbooks);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLookbooks = lookbooks.filter((lookbook) =>
    lookbook.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  filteredLookbooks.sort((a, b) => b.boosts - a.boosts);

  return (
    <div className="lookbooks-container">
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button>Search</button>
        </div>
        <div className="search-tags font1">
          <span style={{ color: 'black' }}>Search with specific tags:</span>
          <span className="tag">#FormalAttire</span>
          <span className="tag">#CasualWear</span>
          <span className="tag">#SportyLook</span>
        </div>
      </div>
      <div className="lookbooks-list">
        {filteredLookbooks.map((lookbook) => (
          <LookbookCard
            key={lookbook.id}
            tags={lookbook.tags}
            boosts={lookbook.boosts}
            image={lookbook.image} // Pass the image here
          />
        ))}
      </div>
    </div>
  );
};

export default Lookbooks;











