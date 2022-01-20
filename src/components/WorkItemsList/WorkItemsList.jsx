import classNames from "classnames";
import useInfiniteScroll from 'react-infinite-scroll-hook';

import WorkItem from "./WorkItem";

import styles from './WorkItemsList.module.scss'

const WorkItemsList = ({ items, containerClassName }) => {
    const [sentryRef] = useInfiniteScroll({

    })
    return <div className={classNames(containerClassName, styles.wrapper)}>
        {items.map(({ id, name, resolved }) =>
            <WorkItem key={id} id={id} name={name} resolved={resolved} />
        )}
    </div>
};

export default WorkItemsList;