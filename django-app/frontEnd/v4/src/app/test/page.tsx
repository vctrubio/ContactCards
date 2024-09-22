'use client'

interface TestProps {
    dataSet: any;
    title: string;
    desc: string;
    icon: string;
}

const Test: React.FC<TestProps> = ({ dataSet, title, desc, icon }) => {

    return (
        <div className="flex justify-center">
            <div className="chrome-navbar">
                <input placeholder="hellowolrd">
                </input>
                <div className="icons-left">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Test;