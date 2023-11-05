import React, { useEffect } from 'react'
import { IProject } from '../../types/projectData';
import { CategoryColorMap } from '../../common/mock';
import { hexToRGBA } from '../../common/utils';
import { Popconfirm } from 'antd';
import useDevice from '../../hooks/useDevice';
import classnames from 'classnames';
import './index.css';

interface IProjectListProps {
    projectData: IProject[];
    handleDelete: (id: string) => void;
}

export default function ProjectList(props: IProjectListProps) {
    const isMobile = useDevice();
    const { projectData } = props;

    return (
        <div>
            <span className='my-projects' style={{ display: isMobile ? 'block' : 'none' }}>
                My Projects:
            </span>

            <div className={classnames('project-list-wrapper', { 'isMobile': isMobile })}
            >

                {projectData?.map((project) => {
                    const categoryColor = hexToRGBA(CategoryColorMap[`${project.category}`], 1);
                    const semiTransparentColor = hexToRGBA(CategoryColorMap[`${project.category}`], 0.5);
                    return (

                        <div
                            className='single-project-wrapper'
                            key={project.id}
                            style={{
                                borderLeft: `10px solid ${categoryColor}`
                            }}
                        >
                            <div
                                className='category'
                                style={{
                                    backgroundColor: `${semiTransparentColor}`,
                                }}
                            >
                                <span style={{ color: `${categoryColor}` }}>{project.category}</span>
                            </div>
                            <span className='name'>{project.name}</span>
                            <span className='users' style={{ display: isMobile ? 'none' : 'block' }}>
                                {project.users} users
                            </span>
                            <span className='dashboards' style={{ display: isMobile ? 'none' : 'block' }}>
                                {project.dashboards} Dashboards
                            </span>
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => props.handleDelete(project.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <span className='delete'>
                                    Delete
                                </span>
                            </Popconfirm>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
