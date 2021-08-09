import { graphql } from 'gatsby'
import React from 'react'
import Container from '../utils/container'
import Separator from '../utils/separator'
import ServiceCard from './serviceCard'

const Services = ({ data }) => {
  return (
    <section className='max-w-4xl mx-auto'>
      <Container>
        <div className='text-center uppercase'>
          <h5 className='mb-2 tracking-wider font-graphikMedium'>
            {data.serviceSubheading}
          </h5>
          <h2>{data.serviceHeading}</h2>
        </div>

        <div className='w-40 mx-auto my-6'>
          <Separator />
        </div>

        <div className='flex flex-col items-center justify-between mt-12 md:mt-16 md:flex-row gap-12'>
          <ServiceCard />
          <ServiceCard />
        </div>
      </Container>
    </section>
  )
}

export const query = graphql`
  fragment ServiceFragment on WpPage {
    _serviceSection {
      serviceSubheading
      serviceHeading
    }
  }
`

export default Services
