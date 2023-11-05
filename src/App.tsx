import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProjectList from './components/ProjectList';
import { IProject } from './types/projectData';
import { MOCK_DATA } from './common/mock';
import './App.css';
import Operation from './components/Operation';
import { Constant } from './common/constant';


function App() {
	// 当前展示的projects
	const [projectList, setProjectList] = useState<IProject[]>([]);
	// 原始的ProjectList数据
	const [originProjectList, setOriginProjectList] = useState<IProject[]>([]);
	// 当前在的目录
	const [curCategory, setCurCategory] = useState<string>(Constant.All);


	useEffect(() => {
		// get the project list data from MOCK_DATA
		try {
			const fetchedData = MOCK_DATA || [];
			setProjectList(MOCK_DATA);
			setOriginProjectList(MOCK_DATA);
		} catch (error) {
			console.error('Fetch Data Failed!!', error);
		}
	}, [])

	const handleDelete = (id: string) => {
		// 删除时，需要将筛选后的数据也删除
		const newProjectList = originProjectList.filter(project => project.id !== id);
		setOriginProjectList(newProjectList);
		// 删除后，更新当前展示的projects
		const currentProjects = curCategoryProjects().filter(project => project.id !== id);
		setProjectList(currentProjects);
	}

	const handleFilter = (category: string) => {
		const currentProjects = curCategoryProjects(category);
		setProjectList(currentProjects);
		setCurCategory(category);
	}

	// 返回当前目录下的所有projects
	const curCategoryProjects = (category?: string) => {
		// 如果手动筛选category，则使用手动筛选的category
		// 否则使用当前默认的category
		let realCategory = category || curCategory;
		return originProjectList.filter(project => {
			if (realCategory === Constant.All) {
				return true
			} else {
				return project.category === realCategory
			}
		});
	}

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 支持大小写
		const searchString = e.target.value.toLocaleUpperCase();
		if (!searchString) {
			// 如果搜索为空，应该展示当前目录下的所有projects
			setProjectList(curCategoryProjects());
		} else {
			// 如果有搜索内容，展示当前目录下的搜索到的内容
			let matchedProjects: IProject[] = [];
			const currentProjects = curCategoryProjects();
			currentProjects.forEach((project) => {
				if ((project.name).toLocaleUpperCase().includes(searchString)) {
					matchedProjects.push(project);
				}
			});
			setProjectList(matchedProjects);
		}
	}

	return (
		<div className='page-container'>
			<Header />
			<Operation
				allProjectList={originProjectList}
				filterProjectList={handleFilter}
				handleSearch={handleSearch}
				curCategory={curCategory}
			/>
			<ProjectList
				projectData={projectList}
				handleDelete={handleDelete}
			/>
		</div>
	);
}

export default App;
