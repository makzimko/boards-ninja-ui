const {useCallback, useState} = require("react");

const InlineCreateItem = ({ onCreate }) => {
    const [name, setName] = useState('');

    const onChange = useCallback((e) => setName(e.target.value), []);
    const onSubmit = useCallback(() => {
        onCreate(name);
        setName('');
    }, [name, onCreate])

    return <>
        <input value={name} onChange={onChange} />
        <button onClick={onSubmit}>Create</button>
    </>
};

export default InlineCreateItem;