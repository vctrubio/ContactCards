export default function DeleteOrganisation() {
    return (
        <>
            <h1>Delete Organisation</h1>
            <form>
                <input type="text" placeholder="Organisation Name" />
                <input type="text" placeholder="Organisation Address" />
                <input type="text" placeholder="Organisation Phone" />
                <input type="text" placeholder="Organisation Email" />
                <button>Delete</button>
            </form>
        </>
    );
}