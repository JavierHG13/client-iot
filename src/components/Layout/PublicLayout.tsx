import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Common/Header'
import AppFooter from '../Common/Footer'

const PublicLayout: React.FC = () => {
    return (
        <div className="public-layout">

            <Header />

            <main className="content">
                <Outlet />
            </main>

            <AppFooter />

        </div>
    )
}

export default PublicLayout