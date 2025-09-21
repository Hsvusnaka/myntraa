import React, { Fragment, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [state, setState] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function searchEnter(e) {
        e.preventDefault();
        if (state.trim()) {
            navigate(`/ai_wardrobe?keyword=${state}`);
        } else {
            navigate('/products');
        }
    }

    return (
        <Fragment>
            <form className="self-center mt-[5%]" onSubmit={searchEnter}>
                <span className='search_div h-full justify-center items-center lg:w-72'>
                    <button className='searchbtn' onClick={searchEnter}><FiSearch /></button>
                    <input 
                        type="text" 
                        placeholder='Search for clothes' 
                        className='search caret-[#ff2459]' 
                        onChange={(e) => setState(e.target.value)} 
                    />
                </span>
            </form>
        </Fragment>
    );
};

export default Search;
