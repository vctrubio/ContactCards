export default function CreateOrganisation() {
    return (
        <>
            <h1>Create Organisation</h1>
            <form>
                <input type="text" placeholder="Organisation Name" />
                <input type="text" placeholder="Organisation Address" />
                <input type="text" placeholder="Organisation Phone" />
                <input type="text" placeholder="Organisation Email" />
                <button>Create</button>
            </form>
        </>
    );
}