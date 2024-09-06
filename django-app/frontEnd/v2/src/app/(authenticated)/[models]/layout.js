import React from 'react';

const ModelLayout = ({ children, params }) => {
    const { models } = params; // params will include 'model'
    console.log("🚀 ~ ModelLayout ~ model:", models);

    return (
        <div className='model-container'>
            {children} {/* Render children (the page) inside the layout */}
        </div>
    );
}

export default ModelLayout;
