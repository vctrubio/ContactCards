import Image from "next/image";
import { OrganisationForm } from "../../components/forms";
import { fetchAllOrganisation } from "../../lib/apiOrganisation";
import { DeleteAllOrganisations } from "../../components/buttons";
import { UserCredForm } from "../../components/auth";
import { HomeComponent } from "./home/page";

interface Organisation {
  id: string;
  name: string;
  about: string;
  owner: string;
  www: string;
  location: string;
}

interface OptionOneProps {
  organisations: Organisation[];
}

const OptionOne: React.FC<OptionOneProps> = ({ organisations }) => {
  return (
    <div className="flex justify-center gap-3 space-x-6 mt-4 p-4 text-xl">
      <div>
        <div className="flex justify-between">
          <h2 className="border-b">Organisation All</h2>
          <DeleteAllOrganisations />
        </div>
        {organisations && organisations.map((org) => (
          <div key={org.id} className="border p-2">
            <p>{org.name}</p>
            <p>{org.about}</p>
            <p>{org.owner}</p>
            <p>{org.www}</p>
            <p>{org.location}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="border-b">Organisation Form</h2>
        <OrganisationForm />
      </div>
    </div>
  );
};


export default async function Home() {
  const dummy = {
    "name": "Tech Innovators",
    "owner": "John Doe",
    "about": "A company focused on innovative tech solutions.",
    "www": "www.techinnovators.com",
    "location": "San Francisco, CA",
    "date_created": "2023-10-01T12:00:00Z"
  }

  let organisations = await fetchAllOrganisation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen border">
      <h1 className="text-4xl">Home : Token </h1>
      <UserCredForm />
    </div>
  );
}


/**
 * crud operation
 * bottons and boards
 * layout
 * 
 * 
 * User auth
 * User admin create
 * Feed List, Fav List
 * 
 */