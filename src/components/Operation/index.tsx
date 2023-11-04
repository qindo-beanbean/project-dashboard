import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input, Dropdown, MenuProps, message } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import './index.css';
import { IProject } from '../../types/projectData';
import { MOCK_DATA } from '../../common/mock';
import { Constant } from '../../common/constant';
interface IOperationProps {
    allProjectList: IProject[];
    filterProjectList: (category: string) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Operation(props: IOperationProps) {
    const { allProjectList } = props;

    const [allCategory, setAllCategory] = useState<string[]>();
    useEffect(() => {
        // 根据projectList来更新category
        const tempAllCategory = allProjectList?.map(data => data.category)
        setAllCategory(tempAllCategory);
    }, [allProjectList])

    const onClick: MenuProps['onClick'] = ({ key }) => {
        props.filterProjectList(key);
    };

    const generateMenu = useCallback(() => {

        // 对于category进行去重
        let uniqueCategory = Array.from(new Set(allCategory));

        // 按照字母顺序进行排序
        const sortedCategory = uniqueCategory.map((category) => {
            return {
                label: category,
                key: category,
            }
        }).sort((a, b) => a.key.localeCompare(b.key));
        // 加上展示所有的category
        const all = {
            label: Constant.All,
            key: Constant.All,
        };
        sortedCategory.unshift(all)
        return sortedCategory;
    }, [allCategory])

    const items: MenuProps['items'] = useMemo(() => generateMenu(), [allCategory]);
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
                onChange={(e)=> props.handleSearch(e)}
            />
        </div>
    )
}
