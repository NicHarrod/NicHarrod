import './portfolio.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { WorkListing } from './work_listing'
import WorkDetail from './work_detail'
import WorkEditor from './work_editor'
import { getWorks } from './work_data'

function Portfolio() {
	return (
		<BrowserRouter basename="/portfolio">
			<Routes>
				<Route
					path="/"
					element={(
						<main className="portfolio-page">
							<header className="portfolio-header">
								<h1>Portfolio</h1>
								<p>Projects are loaded from each folder in /works using its JSON attributes file.</p>
							</header>
							<WorkListing works={getWorks()} />
						</main>
					)}
				/>
				<Route path="/works/:slug" element={<WorkDetail />} />
				<Route path="/works" element={<WorkDetail />} />
				<Route path="/edit" element={<WorkEditor />} />
			</Routes>
			<Analytics />
		</BrowserRouter>
	)
}

export default Portfolio
