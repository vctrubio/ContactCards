import { fetchAllOrganisation } from "../../../lib/apiOrganisation";
import { Organisation } from "@/types/backend";
import { CardOrganisation } from "@/components/cards";

const OrganisationsPage = async () => {
    const organisations: Organisation[] = await fetchAllOrganisation();

    return (<>
        <h1>Organisation</h1>
        <ul>
            {organisations.map(organisation => (
                <div key={organisation.id}>
                    <CardOrganisation organisation={organisation} />
                </div>
            ))}
        </ul>
    </>);
}

export default OrganisationsPage;