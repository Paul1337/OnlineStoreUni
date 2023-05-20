import React, { FunctionComponent, PropsWithChildren } from 'react';
import styles from './AboutPage.module.css';

const AboutItem: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <li className='shadow-sm bg-slate-300 p-2 m-2 font-bold'>{children}</li>
);

const AboutPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.cont}>
                <div>
                    <div className='text-center text-2xl my-2'>Frontend</div>
                    <ul>
                        <AboutItem>ReactJS application</AboutItem>
                        <AboutItem>Reduxjs toolkit state management</AboutItem>
                        <AboutItem>Typescript</AboutItem>
                        <AboutItem>SPA routing</AboutItem>
                        <AboutItem>Async thunk middleware</AboutItem>
                        <AboutItem>Tailwind styling</AboutItem>
                    </ul>
                </div>

                <div>
                    <div className='text-center text-2xl my-2'>Backend</div>
                    <ul>
                        <AboutItem>Node.js using typescript</AboutItem>
                        <AboutItem>Express server</AboutItem>
                        <AboutItem>Mysql database</AboutItem>
                        <AboutItem>JWT token authorization</AboutItem>
                        <AboutItem>Server-side email & password validation</AboutItem>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
