'use server';
import { Select } from "@robperezl/cm-ui"
import { fetchCollectionList } from "@/src/actions/data";

type SelectComponentProps = {
    token: string,
    id: string,
    placeholder?: string,
}
const SelectComponent = async (props: SelectComponentProps) => {
    
    const collectionsList = (await fetchCollectionList(props.token, false)).objArray;

    return (
        <Select id={props.id}
        name={props.id}
        required
        placeholder={props.placeholder}
        >
            {collectionsList?.map( (collection) => (
                <option>{collection.name}</option>
            )
            )}
        </Select>
    )
};

export default SelectComponent;