import { getAllCards } from '@/lib/apiCard';
import { ItermWallet } from '@/components/cards';
import { Card } from '@/types/backend';
import Link from 'next/link';

const CardsPage = async () => {
    const cards: Card[] = await getAllCards();

    return (<>
        <h1>Cards</h1>
        <div className="flex flex-wrap justify-start">
                {cards.map(card => (
                    <Link href={`cards/${card.id}`}>
                        <div key={card.id}>
                            <ItermWallet organisation={card.organisation.name} name={card.employee} />
                            <ItermWallet organisation={card.organisation.name} name={card.employee} />
                        </div>
                    </Link>
                ))}
        </div>
    </>);
}

export default CardsPage;