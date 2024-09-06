import React from 'react';

const ModelLayout = ({ children }) => {
    // Expect the `children` component to pass a `header` prop
    const { header } = children.props;

    return (
        <div className='model-container'>
            <h1>{header}</h1> {/* Display the header defined in the child */}
            {children} {/* Render the child component */}
        </div>
    );
}

export default ModelLayout;
