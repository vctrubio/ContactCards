import { validateAuth } from "@/lib/apiUser";
import { fetchAllOrganisation } from "@/lib/apiOrganisation";
import { getAllUsers } from "@/lib/apiUser";
import { getAllCards } from "@/lib/apiCard";
import { fetchAllTransactions } from "@/lib/apiTransaction";

import Link from "next/link";

export const ListOrganisations = ({ orgys }) => {
    return (
        <ul>
            {orgys.map((org) => (
                <Link href={`/organisations/${org.id}`} key={org.id} className='hover:text-blue-200'>
                    <li>
                        <div>{org.id} | {org.name}</div>
                    </li>
                </Link>
            ))}
        </ul>
    )
}


const HomePage = async () => {
    const users = await getAllUsers();
    const cards = await getAllCards();
    const orgys = await fetchAllOrganisation();
    const trans = await fetchAllTransactions();

    return (
        <div className="p-8">
            <div className="flex gap-10 mt-10">
                <div>
                    <h1 className="underline mb-2">Users</h1>
                    <ul>
                        {users.map((user) => (
                            <Link href={`/user/${user.username}`} key={user.id} className='hover:text-blue-200'>
                                <li>
                                    {user.id} | {user.username}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1 className="underline mb-2">Organisations</h1>
                    <ListOrganisations orgys={orgys} />
                </div>

                <div>
                    <h1 className="underline mb-2">Cards</h1>
                    <ul>
                        {cards.map((card) => (
                            <Link href={`/cards/${card.id}`} key={card.id} className='hover:text-blue-200'>
                                <li>
                                    <div>{card.id} | {card.employee} | {card.organisation.name}</div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1 className="underline mb-2">Cards Shared ...</h1>
                    <ul>
                        {
                            trans.map((tran) => (
                                <li className='hover:text-blue-200 cursor-pointer'>
                                    {tran.id} | Card ID: {tran.card_id} | Shared By: {tran.shared_by} | Shared With: {tran.shared_with} | Transaction: {tran.transaction}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HomePage;