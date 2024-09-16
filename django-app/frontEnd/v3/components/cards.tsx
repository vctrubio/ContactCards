import React from 'react';
import { Card, Organisation } from '@/types/backend';
import { FaShareAlt, FaTrash, FaSave } from 'react-icons/fa';
import Image from "next/image";
import Link from 'next/link';

function camelCaseToSpaces(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export const ItermWallet = ({ organisation = 'Organisation', name = 'NoName', descOne = 'email@gmail.com', descTwo = '652 432 112' }) => {
    return (
        <div className="iterm ">
            <div className="container-twoes">
                <div className="tv-on">
                    <Image
                        src="/icon.webp"  // Correctly reference the image in the public directory
                        alt="Icon"        // Provide a meaningful alt text
                        width={190}
                        height={190}
                    />
                    <div className='orgy'>
                        {organisation}
                    </div>
                </div>
                <div className="tv-controller">
                    <Link href={`/user/${name}`}>
                        <div className="title">
                            {camelCaseToSpaces(name)}
                        </div>
                    </Link>
                    <div className="content">
                        <div className="content-one">
                            {descOne}
                        </div>
                        <div className="content-two">
                            {descTwo}
                        </div>
                    </div>
                </div>
                <div className="last">
                    <div>
                        <FaShareAlt size={24} color="white" />
                    </div>
                    {/* <div>
                        <FaTrash size={24} color="white" />
                    </div>
                    <div>
                        <FaSave size={24} color="white" />
                    </div> */}
                </div>
            </div>

        </div>
    );
}
export const CardOrganisation = ({ organisation }: { organisation: Organisation }) => {
    return (
        <div className="card organisation">
            {organisation.id} | {organisation.name}
        </div>
    );
}


export const CardOrganisationEmployee = ({ organisation }: { organisation: Organisation }) => {
    return (
        <div className="card employee">
            {organisation.id} | {organisation.name}
        </div>
    );
}