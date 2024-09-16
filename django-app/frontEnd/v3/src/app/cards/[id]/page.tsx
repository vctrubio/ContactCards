import { getCardById } from "@/lib/apiCard";
import { ItermWallet } from "@/components/cards";


const CardPage = async ({ params }: { params: { id: number } }) => {
    const card = await getCardById(params.id);

    if (!card) return <>No Card found.</>
    return (
        <div className="my-10 mx-auto">
            <ItermWallet organisation={card.organisation.name} name={card.employee} />
        </div>
    );
}

export default CardPage;