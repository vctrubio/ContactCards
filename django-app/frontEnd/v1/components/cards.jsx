
import { useRouter } from 'next/navigation';

export const OrganisationCard = ({ organisation, flag = false, isSelected, onSelect }) => {
    const router = useRouter();

    return (
        <div
            className={`orgy ${isSelected ? 'border-green-500' : 'border-transparent' } border-2 p-4 rounded`}
            onClick={() => {
                if (flag) {
                    onSelect(organisation);
                } else {
                    router.push(`/organisations/${organisation.id}`);
                }
            }}
        >
            <h1 className="text-xl font-bold text-white">{organisation.name}</h1>
            <p className="text-white">{organisation.about}</p>
            <a href={organisation.www} className="text-blue-400 hover:text-blue-600">{organisation.www}</a>
            <p className="text-white">{organisation.location}</p>
        </div>
    );
}