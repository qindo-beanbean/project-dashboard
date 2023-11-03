import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input, Dropdown, MenuProps, message } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import './index.css';
import { IProject } from '../../types/projectData';
interface IOperationProps {
    projectList: IProject[];
}
export default function Operation(props: IOperationProps) {
    const { projectList } = props;

    const onClick: MenuProps['onClick'] = ({ key }) => {
        message.info(`Click on item ${key}`);
    };

    const generateMenu = useCallback(() => {
        // 对于category进行去重
        let uniqueProjectList: IProject[] = [];
        projectList.forEach((project) => {
            if (uniqueProjectList.findIndex(item => item.category === project.category) === -1) {
                uniqueProjectList.push(project);
            }
        })
        return uniqueProjectList.map((project) => {
            return {
                label: project.category,
                key: project.category,
            }
        }).sort((a, b) => a.key.localeCompare(b.key)); // 按照字母顺序进行排序
    }, [projectList])

    const items: MenuProps['items'] = useMemo(() => generateMenu(), [projectList]);
    return (
        <div className='search-container'>
            <Dropdown
                className='dropdown-wrapper'
                menu={{ items, onClick }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    Select By Category &nbsp;
                    <DownOutlined />
                </a>
            </Dropdown>
            <Input
                className='input-wrapper'
                placeholder="Search for a keyword"
                prefix={<SearchOutlined />}
            />
        </div>
    )
}
