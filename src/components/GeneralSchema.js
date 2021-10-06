import React from 'react' 
import { Helmet } from 'react-helmet'
import { useGeneralSchemaQuery } from '../hooks/use-general-schema-query'

const GeneralSchema = (props) =>{

    const data = useGeneralSchemaQuery()

   
    function length(obj) {
        return Object.keys(obj).length;
    }
    const rowCount1 = length( data.wp.nexvelSchemaMarkup.nexvelschema.services ) - 1;
    const rowCount2 = length( data.wp.nexvelSchemaMarkup.nexvelschema.cities ) - 1;
    
  let j
  let k 
  let l
  
    let services = []
    for (j = 0; j <= rowCount1; j++) {
            if (j === 0){
                l =
                `,{
                "@type": "Service",
                "serviceType": "${data.wp.nexvelSchemaMarkup.nexvelschema.services[j].service}",
                "areaServed": [`
                    for (k = 0; k <= rowCount2; k++) {
                        

                  if(k < rowCount2){
                      l+=
                      `
                      {
                        "@type": "City",
                        "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.cities[k].city}"
                      },
                      `
                      
                  }
                   else{
                       l+=
                       `
                       {
                        "@type": "City",
                        "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.cities[k].city}"
                        }
                       `
                   }
                  
                   
                }
                l+=
                `],
                "provider": {
                 "@type": "Organization",
                 "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.businessName}",
                 "@id": "${props.siteUrl}"
                },
                "url": "${data.wp.nexvelSchemaMarkup.nexvelschema.services[j].linkToRelevantPageOnYourWebsite}"
                }`
                
                }
     
                else if(j > 0 && j < rowCount1){
                    l =
                    `
                    {
                   "@type": "Service",
                   "serviceType": "${data.wp.nexvelSchemaMarkup.nexvelschema.services[j].service}",
                   "areaServed": [`
                      
                       for (k = 0; k <= rowCount2; k++) {
                
                  if(k < rowCount2){
                      l+=
                       `
                       {
                         "@type": "City",
                         "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.cities[k].city}"
                       },
                       `
                       
                    }
                  else{
                      l+=
                      `
                      {
                        "@type": "City",
                        "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.cities[k].city}"
                      }
                      `
                  }
                  
                }
                l+=
                   `],
                   "provider": {
                     "@type": "Organization",
                     "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.businessName}",
                     "@id": "${props.siteUrl}"
                   },
                   "url": "${data.wp.nexvelSchemaMarkup.nexvelschema.services[j].linkToRelevantPageOnYourWebsite}"
                 }
                 `
                }
                else{
                    l =
                    `
              {
              "@type": "Service",
              "serviceType": "${data.wp.nexvelSchemaMarkup.nexvelschema.services[j].service}",
              "areaServed": [` 
              for (k = 0; k <= rowCount2; k++) {
              
                if(k < rowCount2){
                    l +=
                `
                {
                  "@type": "City",
                  "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.cities[k].city}"
                },
                `
                
              }
              else{
                  l+=
                  `
              {
              "@type": "City",
              "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.cities[k].city}"
              }
              `
              }
              
              
              }
              l+=
              `],
              "provider": {
               "@type": "Organization",
               "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.businessName}",
               "@id": "${props.siteUrl}"
              },
              "url": "${data.wp.nexvelSchemaMarkup.nexvelschema.services[j].linkToRelevantPageOnYourWebsite}"
              }
              `
              
            }
            
            services.push(l);  
        
    }
   
       
          
        

    return(
        <Helmet>
        <script async type="application/ld+json" charset="utf-8">
        {`
        {
            "@context": "http://www.schema.org",
            "@graph":[
              {
              "@type": "${data.wp.nexvelSchemaMarkup.nexvelschema.businessType}",
              "name": "${data.wp.nexvelSchemaMarkup.nexvelschema.businessName}",
              "url": "${data.site.siteMetadata.siteUrl}/",
              "logo": "${data.site.siteMetadata.siteUrl+data.wp.nexvelSchemaMarkup.nexvelschema.logo.localFile.publicURL}",
              "image": "${data.site.siteMetadata.siteUrl+data.wp.nexvelSchemaMarkup.nexvelschema.image.localFile.publicURL}",
              "description": "${data.wp.nexvelSchemaMarkup.nexvelschema.describeYourBusiness}",
              "telephone": "${data.wp.nexvelSchemaMarkup.nexvelschema.phoneNumber}",
              "address": {
              "@type": "PostalAddress",
              "streetAddress": "${data.wp.nexvelSchemaMarkup.nexvelschema.streetAddress}",
              "addressLocality": "${data.wp.nexvelSchemaMarkup.nexvelschema.city}",
              "addressRegion": "${data.wp.nexvelSchemaMarkup.nexvelschema.state}",
              "postalCode": "${data.wp.nexvelSchemaMarkup.nexvelschema.zipCode}",
              "addressCountry": "USA"
            },"openingHoursSpecification": [
                ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.areYouOpen === true  ?
                    `
                         {
                           "@type": "OpeningHoursSpecification",
                           "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.close.amorpm}",
                           "dayOfWeek": "http://schema.org/Sunday",
                           "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.sunday.open.amorpm}"
                         },
                      `
                      : ``
                 }
             ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.areYouOpen === true ?
                 `
                      {
                        "@type": "OpeningHoursSpecification",
                        "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.close.amorpm}",
                        "dayOfWeek": "http://schema.org/Saturday",
                        "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.saturday.open.amorpm}"
                      },
                   `
                   : ``
              }
              ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.areYouOpen === true ?
                 `
                      {
                        "@type": "OpeningHoursSpecification",
                        "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.close.amorpm}",
                        "dayOfWeek": "http://schema.org/Thursday",
                        "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.thursday.open.amorpm}"
                      },
                   `
                   : ``
              }
              ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.areYouOpen === true ?
                 `
                      {
                        "@type": "OpeningHoursSpecification",
                        "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.close.amorpm}",
                        "dayOfWeek": "http://schema.org/Tuesday",
                        "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.tuesday.open.amorpm}"
                      },
                   `
                   : ``
              }
              ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.areYouOpen === true ?
                 `
                      {
                        "@type": "OpeningHoursSpecification",
                        "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.close.amorpm}",
                        "dayOfWeek": "http://schema.org/Friday",
                        "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.friday.open.amorpm}"
                      },
                   `
                   : ``
              }
              ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.areYouOpen === true ?
                 `
                      {
                        "@type": "OpeningHoursSpecification",
                        "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.close.amorpm}",
                        "dayOfWeek": "http://schema.org/Monday",
                        "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.monday.open.amorpm}"
                      },
                   `
                   : ``
              }
              ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.areYouOpen === true ?
                 `
                      {
                        "@type": "OpeningHoursSpecification",
                        "closes":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.close.closeHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.close.closeMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.close.amorpm}",
                        "dayOfWeek": "http://schema.org/Wednesday",
                        "opens":  "${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.open.openHour}:${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.open.openMinute} ${data.wp.nexvelSchemaMarkup.nexvelschema.hoursOfOperation.wednesday.open.amorpm}"
                      }
                   `
                   : ``
              }
            ]
           }
           ${services}
          ]
        }
        `}
        </script>
        </Helmet>
    )
}
export default GeneralSchema