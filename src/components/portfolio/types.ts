export type PortfolioImage = {
  url: string
  alt: string
  width: number
  height: number
}

export type CaseStudyItem = {
  id: string
  title: string
  description: string
  tags: string[]
  cover: PortfolioImage
  projectURL?: string
}

export type ClientItem = {
  id: string
  name: string
  logo: PortfolioImage
  websiteURL?: string
}

export type TestimonialItem = {
  id: string
  quote: string
  name: string
  role: string
}

export type ExperimentItem = {
  id: string
  title: string
  image: PortfolioImage
  column: '1' | '2' | '3'
  aspectRatio: string
  projectURL?: string
}
