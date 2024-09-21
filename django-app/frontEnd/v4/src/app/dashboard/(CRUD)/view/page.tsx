'use client'
import { useUser } from "@/types/hooks";
import { CardOrganisation } from "@/components/cards";

export default function ViewAllOrganisations() {
    const { user } = useUser();
    const organisations = user?.organisations

    window.u = organisations
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-8">View All Organisations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {organisations?.map((org) => (
                    <CardOrganisation key={org.id} organisation={org} />
                ))}
            </div>
        </div>
    );
}