'use client'
import { useUser } from "@/types/hooks";
import { CardOrganisation } from "@/components/cards";

export default function ViewAllOrganisations() {
    const { user } = useUser();
    const organisations = user?.organisations

    window.u = organisations
    return (
        <div className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organisations?.map((org) => (
                    <CardOrganisation key={org.id} organisation={org} showEdit={true} />
                ))}
            </div>
        </div>
    );
}