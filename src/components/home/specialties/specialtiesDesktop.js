import React, { useState } from 'react'
import LayoutSecondary from '../../utils/layout-secondary'
import Separator from '../../utils/separator'
import Frame from '../../utils/frame'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import BackgroundImage from '../../../components/utils/backgroundImage'

const SpecialtiesDesktop = ({ data, logo, contactFormRef }) => {
  const [selected, setSelected] = useState(0)

  return (
    <section className='relative py-20'>
      <BackgroundImage
        image={getImage(data.specialtiesBgImage?.localFile)}
        alt={data.specialtiesBgImage?.altText}
      />
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(90deg, rgba(0,74,143,1) 0%, rgba(0,74,143,0.9) 0%)',
        }}
      ></div>
      <LayoutSecondary>
        <div className='relative flex flex-col lg:flex-row gap-8 xl:gap-20'>
          <div className='flex-1'>
            <h3 className='text-white uppercase'>{data.specialtiesHeading}</h3>
            <ul className='w-full mt-8'>
              {data.specialtiesItems.length > 0 &&
                data.specialtiesItems.map((specialty, i) => (
                  <li
                    key={i}
                    className={`flex items-center default-transition border border-transparent px-6 py-4 gap-6 cursor-pointer hover:border-yellow ${
                      selected === i ? 'bg-yellow' : 'text-white'
                    }`}
                    onClick={() => setSelected(i)}
                  >
                    <GatsbyImage
                      image={getImage(specialty.titleIcon?.localFile)}
                      alt={specialty.titleIcon?.altText}
                      className={`w-10 ${
                        selected === i && 'filter brightness-0'
                      }`}
                    />
                    <div className='font-graphikMedium'>{specialty.title}</div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Description */}
          <div className='relative z-20 w-full -mb-40 lg:w-2/3'>
            <div className='z-20 w-64 absolute-x-center -top-9'>
              <GatsbyImage
                image={getImage(logo?.localFile)}
                alt={logo?.altText}
              />
            </div>
            <div className='absolute top-0 bottom-0 left-0 z-0 right-8'>
              <Frame />
            </div>
            <div className='relative px-8 py-24 mt-6 ml-6 md:px-12 xl:px-40'>
              <BackgroundImage
                image={getImage(data.specialtiesBgImage?.localFile)}
                alt={data.specialtiesBgImage?.altText}
              />
              <div
                className='absolute inset-0'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 0%)',
                }}
              ></div>
              <div className='relative text-center'>
                <div className='mb-2 text-black uppercase'>
                  <h5 className='tracking-wider font-graphikMedium'>
                    Reason To
                  </h5>
                  <h2>The Best Services</h2>
                </div>

                {/* Separator */}
                <div className='w-40 mx-auto mt-6 mb-10'>
                  <Separator />
                </div>

                <div className='mx-auto'>
                  <GatsbyImage
                    image={getImage(
                      data.specialtiesItems[selected].image?.localFile
                    )}
                    alt={data.specialtiesItems[selected].image?.altText}
                    className='inline-block w-16 mb-5'
                  />
                </div>

                <h4 className='font-graphikMedium'>
                  {data.specialtiesItems[selected].title}
                </h4>
                <p className='mt-3 text-gray'>
                  {data.specialtiesItems[selected].description}
                </p>
                <div className='flex flex-col items-center justify-center px-5 mt-12 gap-4 sm:flex-row'>
                  <button
                    type='button'
                    className='flex-1 px-0 btn btn-primary'
                    onClick={() =>
                      contactFormRef.current.scrollIntoView({
                        block: 'end',
                        behavior: 'smooth',
                      })
                    }
                  >
                    Schedule Service Now
                  </button>
                  <button
                    type='button'
                    className='flex-1 px-0 btn btn-secondary'
                    onClick={() =>
                      contactFormRef.current.scrollIntoView({
                        block: 'end',
                        behavior: 'smooth',
                      })
                    }
                  >
                    Virtual Estimate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutSecondary>
    </section>
  )
}
export default SpecialtiesDesktop
