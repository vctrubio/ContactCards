import { fetchAllOrganisation } from "../../../lib/apiOrganisation";
import { Organisation } from "@/types/backend";
import { CardOrganisation } from "@/components/cards";
import { ListOrganisations } from "../home/page";

const OrganisationsPage = async () => {
    const organisations: Organisation[] = await fetchAllOrganisation();

    return (<>
        <h1>Organisation</h1>
        <ListOrganisations orgys={organisations} />
    </>);
}

export default OrganisationsPage;