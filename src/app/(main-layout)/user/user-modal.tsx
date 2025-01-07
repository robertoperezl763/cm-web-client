
const UserModalOutline = (props: {children: React.ReactNode}) => (
    <div className="max-w-sm mx-auto mt-32 bg-white rounded-lg shadow-md overflow-hidden border-pink1 border-2">
        <div className="p-4">
            {props.children}
        </div>
    </div>
);

export default UserModalOutline;