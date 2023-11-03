import React, { useEffect } from 'react'
import { IProject } from '../../types/projectData';
import './index.css'
import { CategoryColorMap } from '../../common/mock';
import { hexToRGBA } from '../../common/utils';
import { Button, message, Popconfirm } from 'antd';

interface IProjectListProps {
    projectData: IProject[];
    handleDelete: (id: string) => void;
}

export default function ProjectList(props: IProjectListProps) {
    const { projectData } = props;
    return (
        <div className='project-list-wrapper'>
            {projectData?.map((project) => {
                const categoryColor = hexToRGBA(CategoryColorMap[`${project.category}`], 1);
                const semiTransparentColor = hexToRGBA(CategoryColorMap[`${project.category}`], 0.5);

                return (
                    <div
                        className='single-project-wrapper'
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
                        <span className='users'>{project.users} users</span>
                        <span className='dashboards'>{project.dashboards} Dashboards</span>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => props.handleDelete(project.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <span className='delete'>Delete</span>
                        </Popconfirm>
                    </div>
                )
            })}
        </div>
    )
}
