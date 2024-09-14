import { getCardById } from "@/lib/apiCard";


const CardPage = async ({ params }: { params: { id: number } }) => {
    console.log("🚀 ~ CardPage ~ params:", params)
    
    const card = await getCardById(params.id);

    if (!card) return <>No Card found.</>
    return (
        <>
            <div>id is {card.id}</div>
        </>
    );
}

export default CardPage;