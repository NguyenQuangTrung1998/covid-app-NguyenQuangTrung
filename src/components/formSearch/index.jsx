import React, { useRef, useState } from 'react';
import './formSearch.css';
import PropTypes from 'prop-types';
FormSearch.propTypes = {
    filterItem: PropTypes.func,
};
FormSearch.defaultProps = {
    filterItem: null
}

function FormSearch(props) {
    const [search, setSearch] = useState('');
    const timeoutRef = useRef();
    const { filterItem } = props;
    function onHandleChange(event) {
        const value = event.target.value;
        setSearch(value)
        if (!filterItem) return;

        clearTimeout(timeoutRef);

        timeoutRef.current = setTimeout(() => {
            var searchValue = {
                search: value
            }
            filterItem(searchValue);
        }, 500);

    }
    return (
        <div className='formSearch'>
            <input
                type='text'
                value={search}
                onChange={onHandleChange}
                placeholder='Search country'
            />
        </div>
    );
}

export default FormSearch;