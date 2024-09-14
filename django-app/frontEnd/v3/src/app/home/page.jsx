import { validateAuth } from "@/lib/apiUser";
import { fetchAllOrganisation } from "@/lib/apiOrganisation";
import { getAllUsers } from "@/lib/apiUser";
import { getAllCards } from "@/lib/apiCard";
import Link from "next/link";

const HomePage = async () => {
    const users = await getAllUsers();
    const cards = await getAllCards();
    const orgys = await fetchAllOrganisation();

    return (
        <div className="p-8">
            Home Page - users - organisations - cards - wallets
            if not logged in, redirect to /
            <div className="flex gap-10 mt-10">
                <div>
                    <h1 className="underline mb-2">Users</h1>
                    <ul>
                        {users.map((user) => (
                            <Link href={`/user/${user.username}`} className='hover:text-blue-200'>
                                <li key={user.id}>
                                    {user.id} | {user.username}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1 className="underline mb-2">Organisations</h1>
                    <ul>
                        {orgys.map((org) => (
                            <li key={org.id}>
                                <Link href={`/organisations/${org.id}`} className='hover:text-blue-200'>
                                    <div>{org.id} | {org.name}</div>
                                </Link>
                            </li>))}
                    </ul>
                </div>

                <div>
                    <h1 className="underline mb-2">Cards</h1>
                    <ul>
                        {cards.map((card) => (
                            <li key={card.id}>
                                <Link href={`/cards/${card.id}`} className='hover:text-blue-200'>
                                    <div>{card.id} | {card.employee} | {card.organisation.name}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1>Cards Shared ...</h1>

                </div>
            </div>
        </div>
    )
}

export default HomePage;