import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input, Dropdown, MenuProps, message, ConfigProvider } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { IProject } from '../../types/projectData';
import { Constant } from '../../common/constant';
import useDevice from '../../hooks/useDevice';
import classnames from 'classnames';
import './index.css';

interface IOperationProps {
    allProjectList: IProject[];
    filterProjectList: (category: string) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    curCategory: string;
}

export default function Operation(props: IOperationProps) {
    const isMobile = useDevice();
    const { allProjectList } = props;

    const [allCategory, setAllCategory] = useState<string[]>();
    useEffect(() => {
        // Update catogory according to project list 根据projectList来更新category
        const tempAllCategory = allProjectList?.map(data => data.category)
        setAllCategory(tempAllCategory);
    }, [allProjectList])

    const onClick: MenuProps['onClick'] = ({ key }) => {
        props.filterProjectList(key);
    };

    const generateMenu = useCallback(() => {
        // Remove duplicated category 对于category进行去重
        let uniqueCategory = Array.from(new Set(allCategory));

        // Sort by alphapet 按照字母顺序进行排序
        const sortedCategory = uniqueCategory.map((category) => {
            return {
                label: category,
                key: category,
            }
        }).sort((a, b) => a.key.localeCompare(b.key));
        // Add 'All' catogory 加上展示所有的category
        const all = {
            label: Constant.All,
            key: Constant.All,
        };
        sortedCategory.unshift(all)
        return sortedCategory;
    }, [allCategory])

    const items: MenuProps['items'] = useMemo(() => generateMenu(), [allCategory]);
    return (
        <div className={classnames('search-container', { 'isMobile': isMobile })}>
            <div
                className='content'
                style={{ display: isMobile ? 'block' : 'none' }}
            >
                <h1>Hello Sarah! </h1>
                <span>Here you can find your projects and dashboards.</span>
            </div>
            <Dropdown
                className={classnames('dropdown-wrapper', { 'isMobile': isMobile })}
                menu={{ items, onClick }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    Select By Category: {props.curCategory} &nbsp;
                    <DownOutlined />
                </a>
            </Dropdown>
            {isMobile ? (
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                hoverBorderColor: 'transparent',
                                activeBorderColor: 'transparent',
                                activeShadow: 'transparent'
                            }
                        },
                    }}
                >
                    <div className='input-wrapper-isMobile'>
                        <Input
                            className='input-isMobile'
                            placeholder="Search"
                            suffix={<SearchOutlined />}
                            bordered={false}
                            onChange={(e) => props.handleSearch(e)}
                        />
                    </div>
                </ConfigProvider>

            ) : (
                <Input
                    className='input-wrapper'
                    placeholder="Search for a keyword"
                    prefix={<SearchOutlined />}
                    onChange={(e) => props.handleSearch(e)}
                />
            )}

        </div>
    )
}
