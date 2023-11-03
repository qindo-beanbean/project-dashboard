import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProjectList from './components/ProjectList';
import { IProject } from './types/projectData';
import { MOCK_DATA } from './common/mock';
import './App.css';
import Operation from './components/Operation';


function App() {
	const [projectList, setProjectList] = useState<IProject[]>([]);

	useEffect(() => {
		// get the project list data from MOCK_DATA
		setProjectList(MOCK_DATA);
	}, [])

	const handleDelete = (id: string) => {
		const newProjectList = projectList.filter(project => project.id !== id);
		setProjectList(newProjectList);
	}

	return (
		<div className='page-container'>
			<Header />
			<Operation
				projectList={projectList}
			/>
			<ProjectList
				projectData={projectList}
				handleDelete={handleDelete}
			/>
		</div>
	);
}

export default App;
