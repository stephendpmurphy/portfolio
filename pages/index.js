import Head from 'next/head'
import ProjectCard from '../components/project_card'
import SkillBadge from '../components/skill_badge'
import Footer from '../components/footer'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Home = () => {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const retrieveProjects = async () => {
            const projectsAPI = axios.create({
                    baseURL: 'https://stephenmurphy-backend.herokuapp.com/projects',
                    timeout: 1500,
                    method: 'get',
                });
            try {
                const {data} = await projectsAPI.get('/');
                setProjects(data);
            } catch(error) {
                console.log(error);
            }
        };

        const retrieveSkills = async () => {
                const skillsAPI = axios.create({
                baseURL: 'https://api.github.com/repos/stephendpmurphy',
                timeout: 1500,
                method: 'get',
                });

            try {
                const {data} = await skillsAPI.get('/stephendpmurphy');
                setSkills(data.topics);
            } catch(error) {
                console.log(error);
            }
        };

        retrieveSkills();
        retrieveProjects();
    },[]);

    const renderProjects = () => {
        var jsx = "";

        if( projects.length ) {
            jsx = projects.map((project) => {
                return(
                    <ProjectCard key={project.name} projectTitle={project.name} projectDesc={project.description} projectUrl={project.url}/>
                );
            });
        }

        return jsx;
    }

    const renderSkills = () => {
        var jsx = "";

        if( skills.length ) {
            jsx = skills.map((skill) => {
                return(
                    <SkillBadge skill={skill}/>
                );
            });
        }

        return jsx;
    }

    return (
    <div>
        <Head>
            <title>Stephen Murphy | Embedded Software Engineer</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            {/* {renderSkills()} */}
            {renderProjects()}
            <Footer/>
        </main>
    </div>
    )
}

export default Home
