import React from 'react';
import './header.css';
Header.propTypes = {

};

function Header(props) {
    const regx = /(.)(?=(\d{3})+$)/g;
    const { cases, deaths, recoveries } = props;

    return (
        <div className='header'>
            <h1>{String(cases).replace(regx, '$1,')}</h1>
            <div className='amount'>
                <div className='deaths'>
                    <h2>{String(deaths).replace(regx, '$1,')}</h2>
                    <span>deaths</span>
                </div>
                <div className='recoveries'>
                    <h2>{String(recoveries).replace(regx, '$1,')}</h2>
                    <span>recoveries</span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Header);