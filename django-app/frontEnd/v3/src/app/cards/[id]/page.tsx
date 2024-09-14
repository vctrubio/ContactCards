import { getCardById } from "@/lib/apiCard";
import { CardWallet } from "@/components/cards";

const CardPage = async ({ params }: { params: { id: number } }) => {
    console.log("🚀 ~ CardPage ~ params:", params)
    
    const card = await getCardById(params.id);

    if (!card) return <>No Card found.</>
    return (
       <CardWallet card={card} />
    );
}

export default CardPage;