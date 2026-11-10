import ExperimentsPage from '@/components/portfolio/ExperimentsPage'
import { getExperiments } from '@/lib/portfolio-content'

export default async function Page() {
  const experiments = await getExperiments()
  return <ExperimentsPage experiments={experiments} />
}
