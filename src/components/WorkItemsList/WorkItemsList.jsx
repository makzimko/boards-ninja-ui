import classNames from "classnames";

import WorkItem from "./WorkItem";

import styles from './WorkItemsList.module.scss'

const WorkItemsList = ({ items, containerClassName }) => {
    return <div className={classNames(containerClassName, styles.wrapper)}>
        {items.map(({ id, name, resolved }) =>
            <WorkItem key={id} id={id} name={name} resolved={resolved} />
        )}
    </div>
};

export default WorkItemsList;