import WorkItemsList from "../../components/WorkItemsList/WorkItemsList";
import InlineCreateItem from "../../components/InlineCreateItem/InlineCreateItem";
import {useCallback, useState} from "react";

const initialList = [{
    id: 1,
    name: 'First work item',
    resolved: true
}, {
    id: 2,
    name: 'Second work item',
    resolved: false
}]

const BacklogContainer = () => {
    const [list, setList] = useState(initialList);

    const onCreate = useCallback((name) => {
        const newItem = {
            id: list.length + 1,
            name,
            resolved: false
        };
        setList([...list, newItem])
    }, [setList, list])

    return (
        <>
            <WorkItemsList items={list} />
            <InlineCreateItem onCreate={onCreate} />
        </>
    )
};

export default BacklogContainer;