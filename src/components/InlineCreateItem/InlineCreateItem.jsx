import {createRef, useCallback, useState} from "react";
import classNames from "classnames";

import styles from './InlineCreateItem.module.scss'

const InlineCreateItem = ({ onCreate, containerClassName }) => {
    const [name, setName] = useState('');
    const inputRef = createRef();

    const onChange = useCallback((e) => setName(e.target.value), []);
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (name.length) {
            onCreate(name);
            setName('');
        }

        inputRef.current.focus();
    }, [name, onCreate, inputRef])

    return <form onSubmit={onSubmit} className={classNames(containerClassName, styles.wrapper)}>
        <input value={name} onChange={onChange} className={styles['name-input']} ref={inputRef} placeholder="What should be done?" />
        <button type="submit" className={styles['create-button']}>➕</button>
    </form>;
};

export default InlineCreateItem;