import { fetchOrganisationById } from "@/lib/apiOrganisation";

const OrganisationPage = async ({ params }: { params: { id: string } }) => {
    const organisation = await fetchOrganisationById(params.id);

    if (!organisation) return <>No Organisation found.</>
    return (
        <>
            <div>id is {organisation.id}</div>
        </>
    );
}

export default OrganisationPage;