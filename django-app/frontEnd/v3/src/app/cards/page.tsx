import { getAllCards } from '@/lib/apiCard';
import { CardWallet } from '@/components/cards';
import { Card } from '@/types/backend';

const CardsPage = async () => {
    const cards: Card[] = await getAllCards();

    return (<>
        <h1>Cards</h1>
        <ul>
            {cards.map(card => (
                <div key={card.id}>
                    <CardWallet card={card} />
                </div>
            ))}
        </ul>
    </>);
}

export default CardsPage;