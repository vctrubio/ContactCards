'use client'
import { useUser } from '@/types/hooks';
import './test.css'
import { User } from '@/types/backend'

interface TestProps {
    dataSet: any;
    title: string;
    desc: string;
    icon: string;
}


const SearchBar: React.FC<TestProps> = ({ dataSet, title, desc, icon }) => {

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



const UserNavView = ({ user }: { user: User }) => {
    console.log("🚀 ~ UserNavView ~ user:", user)

    return (
        <div className='one-way'>
            <div>
                Welcome <span> {user.username} </span>
                [route to profile]
            </div>
            <div>
                You have 0 notifications [route to inbox]
            </div>
            {
                user.is_staff && user.organisations.length > 0 && (
                    <div>
                        Stats nice you last logged in ... [route to dashboard]
                    </div>
                )
            }
        </div>
    )
}


const UserWalletView = ({ user }: { user: User }) => {

    const YesWallet = () => {
        return (
            <div>
                <p>...</p>
            </div>
        )
    }
    
    const NoWallet = () => {
        return (
            <div>
                <li>
                    You dont have any cards in your wallet.
                </li>
            </div>
        )
    }
    
    return (
        <div>
            <h2>My Wallet</h2>
            {user.wallet ?
                <YesWallet />
                :
                <NoWallet />
            }
        </div>
    );
}

const UserEmployeeView = ({ user }: { user: User }) => {

    const YesEmployee = () => {
        return (
            <div>
                <p>...</p>
            </div>
        )
    }
    
    const NoEmployee = () => {
        return (
            <div>
                <li>You have no employee cards at the moment.</li>
            </div>
        )
    }
    
    
    return (
        <div>
            <h2>My Employee Cards</h2>
            {user.employee_organisations.length > 0 ?
                <YesEmployee />
                :
                <NoEmployee />
            }
        </div>
    )
}

const UserOrganisationView = ({ user }: { user: User }) => {
    const YesOrganisation = () => {
        return (
            <div>
                <p>...</p>
            </div>
        )
    }
    
    const NotStaff = () => {
        return (
            <div>
                <p>Please subscribe to add organisations </p>
            </div>
        )
    }
    const NoOrganisation = () => {
        return (
            <div>
                <p>You have no organisation at the moment. Click Here to create one.</p>
            </div>
        )
    }
    
    return (
        <div>
            <h2>My Organisations</h2>
            {user.organisations.length > 0 ?
                <YesOrganisation />
                :
                !user.is_staff ? <NotStaff />
                    : <NoOrganisation />
            }
        </div>
    )
}

const TestView = () => {
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    window.user = user

    return (
        <div className='top-notch'>
            <UserNavView user={user} />
            <div className='three-ways'>
                <UserWalletView user={user} />
                <UserEmployeeView user={user} />
                <UserOrganisationView user={user} />
            </div>
        </div>
    )

}



const Test = () => {
    return <TestView />
}

export default Test;