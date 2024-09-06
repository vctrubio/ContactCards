import React from 'react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [
        { model: 'organisationx' },
        { model: 'listsx' },
    ];
}

const ModelPage = ({ params }) => {
    const { models } = params;
    console.log("🚀 ~ ModelsPage ~ models:", models);

    // Validate if the models is either 'organisationx' or 'listx'
    if (models !== 'organisationx' && models !== 'listx') {
        notFound(); // This triggers Next.js's built-in 404 page
    }

    return (
        <div>
            <h1>{models.charAt(0).toUpperCase() + models.slice(1)} Page</h1>
            {models === 'organisationx' && <p>This is the Organisations content.</p>}
            {models === 'listx' && <p>This is the Lists content.</p>}
        </div>
    );
};

export default ModelPage;