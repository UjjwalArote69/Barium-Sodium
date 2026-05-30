import { CardProvider } from './CardContext'
import BackgroundField from './components/BackgroundField'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Card from './components/Card'
import ProjectsDetail from './components/ProjectsDetail'
import TableField from './components/TableField'

export default function Home() {
  return (
    <CardProvider>
      <BackgroundField />
      <Hero />
      <Intro />
      <Card />
      <ProjectsDetail />
      <TableField />
    </CardProvider>
  )
}
