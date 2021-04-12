import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import moment from 'moment';

TodoList.propTypes = {
    data: PropTypes.array,
    country: PropTypes.array,
};
TodoList.defaultProps = {
    data: [],
    country: [],
}

function TodoList(props) {
    const { data, country } = props;
    const regx = /(.)(?=(\d{3})+$)/g;
    var list = data.sort((a, b) => {
        return b.cases - a.cases;
    });
    return (
        <div className='wrap'>
            {
                country.length ? country.map((item, index) => {
                    return <div
                        className='todolistFilter'
                        key={index}>
                        <div className='element'>
                            <img src={item.countryInfo.flag} alt={item.countryInfo.flag} />
                            <div className='countryName'>
                                <h2>{item.country}</h2>
                                <p>{

                                    moment(new Date(item.updated)).fromNow()
                                }</p>
                            </div>
                            <h3>{String(item.cases).replace(regx, '$1,')}</h3>
                        </div>
                        <div className='statistic'>
                            <div className='deaths'>
                                <h2>{String(item.deaths).replace(regx, '$1,')}</h2>
                                <span>deaths</span>
                            </div>
                            <div className='recoveries'>
                                <h2>{String(item.recovered).replace(regx, '$1,')}</h2>
                                <span>recoveries</span>
                            </div>
                        </div>
                    </div>
                }) : list.map((item, index) => {
                    return <div className='todolist'
                        key={index}>
                        <span>{index + 1}</span>
                        <img src={item.countryInfo.flag} alt={item.countryInfo.flag} />
                        <div className='countryName'>
                            <h2>{item.country}</h2>
                            <p>{moment(new Date(item.updated)).fromNow()}</p>
                        </div>
                        <h3>{String(item.cases).replace(regx, '$1,')}</h3>
                    </div>
                })
            }

        </div>
    );
}

export default React.memo(TodoList);