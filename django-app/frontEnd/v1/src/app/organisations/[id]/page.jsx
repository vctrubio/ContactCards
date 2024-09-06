import { fetchOrganisationById } from "@/lib/apiOrganisation";

const OrganisationId = async ({ params }) => {
    const organisation = await fetchOrganisationById(params.id);

    if (!organisation)
        return <div>Organisation not found</div>;
    
    return (
        <div className="organisation-id">

            <div className="organisation-id-credentials">
                <h1>Name: {organisation.name}</h1>
                <p>About: {organisation.about}</p>
                <p>Location: {organisation.location}</p>
                <a href={organisation.www}>{organisation.www}</a>
            </div>

            <div className="organisation-id-details">
                <h2>Employees []</h2>
                {/* <ul>
                    {organisation.members.map((member) => (
                        <li key={member.id}>
                            <p>{member.name}</p>
                            <p>{member.email}</p>
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}

export default OrganisationId;