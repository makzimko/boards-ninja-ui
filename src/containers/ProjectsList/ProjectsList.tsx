import useProjectsListActions, {projectsListLoadingState, projectsListState} from "../../atoms/projectsList";
import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import {LOADING} from "../../atoms/loading/loading";
import styles from "../../components/SummaryWidget/SummaryWidget.module.scss";
import {Link} from "react-router-dom";

const ProjectsList = () => {
    const projectsListActions = useProjectsListActions();
    const projectsList = useRecoilValue(projectsListState);
    const projectsListLoading = useRecoilValue(projectsListLoadingState);

    useEffect(() => {
        projectsListActions.fetchAll()
    }, []);

    if ([LOADING.PENDING, LOADING.INITIAL].includes(projectsListLoading)) {
        return 'Waiting for projects list...';
    }

    if (projectsListLoading === LOADING.ERROR) {
        return 'Error occurred while loading projects list!'
    }

    return <ul>
        {projectsList.map(({ name, key }) =>
            <li key={key}><Link to={`/projects/${key}`} className={styles.link}>{name}</Link></li>
        )}
    </ul>
};

export default ProjectsList;