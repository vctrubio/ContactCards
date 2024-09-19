import { fetchOrganisationById } from "@/lib/apiOrganisation";
import { CardOrganisation } from "@/components/cards";

const OrganisationPage = async ({ params }: { params: { id: string } }) => {
    const organisation = await fetchOrganisationById(params.id);

    if (!organisation) return <>No Organisation found.</>
    return (
        <div>
           <CardOrganisation organisation={organisation} />
           <pre>{JSON.stringify(organisation, null, 2)}</pre>
        </div>
    );
}

export default OrganisationPage;