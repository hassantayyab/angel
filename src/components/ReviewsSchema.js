import React from 'react' 
import { useReviewsSchemaQuery } from '../hooks/use-reviews-schema-query'
import { Helmet } from 'react-helmet'



const ReviewsSchema = (props) => {
   

    const { wp, site, query1, forRatingValuePart1, forRatingValuePart2 } = useReviewsSchemaQuery()
    

    function length(obj) {
        return Object.keys(obj).length;
    }
    const totalRatings = length (forRatingValuePart1.nodes)
    const fiveFourThreeRatings = length (forRatingValuePart2.nodes)

    let total = 0
    const ratingsTotal = forRatingValuePart1.nodes
    let i
   for (i = 0; i < ratingsTotal.length; i++) {  
    total += ratingsTotal[i].rating;  
   }
   
   let averageRating = total / fiveFourThreeRatings
   averageRating = averageRating.toFixed(1)

   

   const reviews = query1.nodes.map(item =>{

    let comments = JSON.stringify(item.comments)
    comments = comments.replace(/\\n/g, '')
       if(item.rating === 0){
        return(
            `{
             "@type": "Review",
             "datePublished":"${item.reviewDate}",
             "reviewRating":{
             "@type": "Rating",
             "ratingValue":"1"
             },
             "author":{
             "@type":"Person",
             "name":"${item.reviewer.firstName} ${item.reviewer.lastName}"
             },
             "description": ${comments},
             "itemReviewed":{
             "@type":"Thing",
             "name":"${item.businessName}"
             }
             }`
        )
       }else if (item.rating >= 1){
           return(
            `{
                "@type": "Review",
                "datePublished":"${item.reviewDate}",
                "reviewRating":{
                "@type": "Rating",
                "ratingValue":"${item.rating}"
                },
                "author":{
                "@type":"Person",
                "name":"${item.reviewer.firstName} ${item.reviewer.lastName}"
                },
                "description": ${comments},
                "itemReviewed":{
                "@type":"Thing",
                "name":"${item.businessName}"
                }
                }`
           )
       }else{
           //Review is somehow greater than 5.
           return(
            `{
                "@type": "Review",
                "datePublished":"${item.reviewDate}",
                "reviewRating":{
                "@type": "Rating",
                "ratingValue":"5"
                },
                "author":{
                "@type":"Person",
                "name":"${item.reviewer.firstName} ${item.reviewer.lastName}"
                },
                "description": ${comments},
                "itemReviewed":{
                "@type":"Thing",
                "name":"${item.businessName}"
                }
                }`
           )
       }
       
   })
  
  

    return(
        <Helmet>
<script async type="application/ld+json" charset="utf-8">
{`
{
    "@context": "http://schema.org",
    "@type": "Product",
    "aggregateRating": { "@type": "AggregateRating", "bestRating": 5, "ratingValue": ${averageRating}, "reviewCount": ${ratingsTotal.length}, "worstRating": 1 },
   "brand": {
      "@type": "Brand",
      "name": "${wp.nexvelSchemaMarkup.nexvelschema.businessName}"
    },
    "image": "${site.siteMetadata.siteUrl+props.image}",
    "name": "${wp.nexvelSchemaMarkup.nexvelschema.businessName}",
   "review":[${reviews}]
  }
`}
</script>
</Helmet>
    )
}
export default ReviewsSchema