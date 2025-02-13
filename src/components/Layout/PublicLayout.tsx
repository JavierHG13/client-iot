import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Common/Header'
import AppFooter from '../Common/Footer'
import AnimatedPage from '../Common/AnimatedPage'

const PublicLayout: React.FC = () => {
    return (
        <div className="public-layout">

            <Header />

            <main className="content">
                <AnimatedPage>
                    <Outlet />
                </AnimatedPage>
            </main>

            <AppFooter />

        </div>
    )
}

export default PublicLayout