import { ImgAddress, ImgEmail, ImgPhone } from '../../images'
import * as React from 'react'
import Container from '../utils/container'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { hoverScale, scale } from '../../animations'
import { motion } from 'framer-motion'
import { useServiceCategoriesQuery } from '../../hooks/serviceCategoriesQuery'

function formatDataIntoServices(data, categories) {
  let services = []

  for (const key in data) {
    const category = categories.filter((e) => e.slug === key)[0]

    services = [
      ...services,
      {
        title: category.name,
        link: category.serviceCategoryLink,
      },
    ]

    for (const k in data[key]) {
      const elem = data[key][k]
      services = [
        ...services,
        {
          title: elem.title,
          link: elem._servicePost.servicePageLink.url,
        },
      ]
    }
  }

  return services
}

const Footer = ({ generalInfoData, servicesData, menuData }) => {
  const serviceCategories = useServiceCategoriesQuery()
  const services = formatDataIntoServices(servicesData, serviceCategories)

  return (
    <footer className='pt-16 mt-4'>
      <Container>
        <div className='relative justify-between pb-6 border-b grid lg:grid-cols-4 grid-cols-2 sm:gap-x-0 md:gap-x-4 gap-y-10 lg:gap-6 xl:gap-24 border-gray-light'>
          <section className='text-center lg:col-span-1 col-span-2'>
            <GatsbyImage
              image={getImage(generalInfoData._generalData.logo?.localFile)}
              alt={generalInfoData._generalData.logo?.altText}
              className='mx-auto'
            />

            <ul className='absolute bottom-0 right-0 flex flex-col items-center justify-center mt-16 mb-6 lg:justify-between md:flex-row space-y-4 md:space-y-0 md:space-x-4 space-x-0 md:static sm:bottom-2 sm:right-2'>
              {generalInfoData._generalData.socialLinks.length > 0 &&
                generalInfoData._generalData.socialLinks.map((link, i) => (
                  <motion.li
                    className='rounded-full hover:shadow-md default-transition'
                    key={i}
                    variants={scale}
                    whileHover={hoverScale}
                  >
                    {i === 1 ? (
                      <a
                        className='flex items-center justify-center leading-none rounded-full w-14 h-14 bg-yellow'
                        href={link.url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <GatsbyImage
                          image={getImage(link.image?.localFile)}
                          alt={link.image?.altText}
                          className='max-w-full'
                        />
                      </a>
                    ) : (
                      <a
                        className='flex items-center justify-center leading-none border border-gray-300 rounded-full w-14 h-14'
                        href={link.url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <GatsbyImage
                          image={getImage(link.image?.localFile)}
                          alt={link.image?.altText}
                          className='max-w-full'
                        />
                      </a>
                    )}
                  </motion.li>
                ))}
            </ul>
          </section>

          {/* Navigation */}
          <section className='col-span-2 xs:col-span-1 lg:ml-6 xl:ml-0'>
            <h6 className='uppercase'>Navigation</h6>
            <div className='flex flex-col text-sm mt-7 text-gray-dark space-y-3 font-graphikMedium'>
              {menuData.length > 0 &&
                menuData.map((menu) => (
                  <div key={menu.id}>
                    <Link
                      className='hover:text-yellow default-transition'
                      to={menu.path}
                    >
                      {menu.label}
                    </Link>
                  </div>
                ))}
            </div>
          </section>

          {/* Contact */}
          <section className='ml-0 xs:-ml-6 md:ml-0 col-span-2 xs:col-span-1'>
            <h6 className='uppercase'>Contact</h6>
            <div className='flex flex-col text-sm mt-7 text-gray-dark space-y-3 font-graphikMedium'>
              <a
                className='flex items-start space-x-4 sm:space-x-2 md:space-x-6'
                href='https://www.google.com'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  width='auto'
                  height='auto'
                  src={ImgAddress}
                  alt='address'
                  className='mt-1'
                />
                <span>{generalInfoData._generalData.address}</span>
              </a>
              <a
                className='flex items-start space-x-4 sm:space-x-2 md:space-x-6'
                href='tel:610-379-3993'
              >
                <img
                  width='auto'
                  height='auto'
                  src={ImgPhone}
                  alt='phone number'
                  className='mt-1'
                />
                <div className='flex flex-col uppercase'>
                  <span className='text-gray'>Phone</span>
                  <span className='text-base font-graphikBold text-gray-dark'>
                    {
                      generalInfoData._generalData.contactNumbers.slice(-1)[0]
                        .number
                    }
                  </span>
                </div>
              </a>
              <a
                className='flex items-start space-x-4 sm:space-x-2 md:space-x-6'
                href={`mailto:${generalInfoData._generalData.email}`}
              >
                <img
                  width='auto'
                  height='auto'
                  src={ImgEmail}
                  alt='email address'
                  className='mt-1'
                />
                <div className='flex flex-col uppercase'>
                  <span className='text-gray'>Email</span>
                  <span className='lowercase'>
                    {generalInfoData._generalData.email}
                  </span>
                </div>
              </a>
            </div>
          </section>

          {/* Services */}
          <section className='text-sm col-span-2 xs:col-span-1'>
            <h6 className='uppercase mb-7'>Services</h6>
            {services.length > 0 &&
              services.map((service, i) => (
                <div
                  className='flex flex-col mb-3 text-gray space-y-3 font-graphikMedium'
                  key={i}
                >
                  <Link
                    className='hover:text-yellow default-transition'
                    to={service.link}
                  >
                    {service.title}
                  </Link>
                </div>
              ))}
          </section>
        </div>

        <div className='flex flex-col justify-between pt-5 pb-10 lg:flex-row'>
          <div className='flex flex-col items-center justify-center text-xs uppercase space-y-2 md:space-y-0 md:space-x-2 text-gray lg:justify-start md:flex-row'>
            <span
              role='img'
              aria-label='copyright'
              className='font-graphikBold text-gray-dark'
            >
              &copy; {new Date().getFullYear()}{' '}
              {generalInfoData._generalData.websiteName}
            </span>
            <div className='flex items-center space-x-2 font-graphikMedium'>
              <span>All rights reserved.</span>
              <div className='h-2.5 bg-gray' style={{ width: '1px' }}></div>
              <Link to='/privacy-policy' className='hover:text-black-light'>
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className='mt-6 lg:mt-0'>
            {generalInfoData._generalData.footerImages.length > 0 &&
              generalInfoData._generalData.footerImages.map(
                ({ image, link }, i) => (
                  <a
                    key={i}
                    className='mx-auto text-center lg:ml-auto'
                    href={link}
                  >
                    <GatsbyImage
                      image={getImage(image?.localFile)}
                      alt={image?.altText}
                    />
                  </a>
                )
              )}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
