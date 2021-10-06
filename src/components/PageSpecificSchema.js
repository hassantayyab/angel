import React from 'react' 
import { Helmet } from 'react-helmet'
import { usePageSpecificSchemaQuery } from '../hooks/use-page-specific-schema-query'


const PageSpecificSchema = (props) =>{
    function length(obj) {
        return Object.keys(obj).length;
    }
const data = usePageSpecificSchemaQuery()

const blogPage = data.nexvelSchemaMarkup.nexvelschema.blogPageUrl
const aboutPage = data.nexvelSchemaMarkup.nexvelschema.aboutPageUrl
const contactPage = data.nexvelSchemaMarkup.nexvelschema.contactPageUrl
const strippedContent = props.articleBody !== (undefined || null) ? props.articleBody.replace(/(<([^>]+)>)/gi, "") : null
const wordCount = props.articleBody !== (undefined || null) ? strippedContent.split(' ').length : null

/* The single letters are not significant. */

/* For the videos section */
let theVideos = []
let a
let b
const videoRows = props.videos !== null ? length(props.videos) - 1 : null
if(props.videos !== null){
    for (a = 0; a <= videoRows; a++) {
        b = `{
            "@type": "VideoObject",
            "name": "${(props.videos[a].title).replace(/"/g, '\\\"')}",
            "@id": "${props.videos[a].url}",
            "description": "${(props.videos[a].description).replace(/"/g, '\\\"')}",
            "thumbnailUrl": "${props.siteUrl+props.videos[a].thumbnailImage.localFile.publicURL}",
            "uploadDate": "${props.videos[a].uploadDate}"
        }`
            theVideos.push(b)
        }
}

/* For the questions and answers section */
let theQuestionsAndAnswers = []
let d 
let e
const questionAndAnswerRows = props.questionsAndAnswers !== null ? length(props.questionsAndAnswers) -1 : null
if(props.questionsAndAnswers !== null){

        d = `{
            "@type": "FAQPage",
            "mainEntity": [`
            for (e = 0; e <= questionAndAnswerRows; e++) {
                if(e < questionAndAnswerRows){
                d+=`{
                    "@type": "Question",
                    "name": "${(props.questionsAndAnswers[e].question).replace(/"/g, '\\\"')}",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "${(props.questionsAndAnswers[e].answer).replace(/"/g, '\\\"')}"
                    }
                  },`
                }else{
                    d+=`{
                        "@type": "Question",
                        "name": "${(props.questionsAndAnswers[e].question).replace(/"/g, '\\\"')}",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "${(props.questionsAndAnswers[e].answer).replace(/"/g, '\\\"')}"
                        }
                      }`
                }
                }
            d+=`]

            
        }`
        theQuestionsAndAnswers.push(d)
        
}

/* For the maps section */
let theMaps = []
let f
let g
const mapRows = props.maps !== null ? length(props.maps) - 1 : null
if(props.maps !== null){
    for (f = 0; f <= mapRows; f++) {
        g = `{
            "@type": "Map",
              "mapType": "TransitMap",
              "url":  "${props.maps[f].mapUrl}"
           }
        `
            theMaps.push(g)
        }
}

/* For the digital documents section */
let theDigitalDocuments = []
let h
let i
const digitalDocRows = props.digitalDocuments !== null ? length(props.digitalDocuments) - 1 : null
if(props.digitalDocuments !== null){
    for (h = 0; h <= digitalDocRows; h++) {
        i = `{
            "@type": "DigitalDocument",
            "name": "${(props.digitalDocuments[h].title).replace(/"/g, '\\\"')}"
          }`
            theDigitalDocuments.push(i)
        }
}

/*For the images section */
let theImages = []
let j
let k
const imagesRows = props.images !== null ? length(props.images) - 1 : null
if(props.images !== null){
    
    for (j = 0; j <= imagesRows; j++) {
        k = `{
            "@type": "ImageObject",
            "contentUrl": ${JSON.stringify(props.siteUrl+props.images[j].image.localFile.publicURL)},
            "datePublished": ${JSON.stringify(props.images[j].image.date)},
            
           
            "description": ${props.images[j].image.description !== null ? 
                JSON.stringify(props.images[j].image.description.replace(/(<([^>]+)>)/gi, "").replace(/(\r\n|\n|\r)/gm, "")) 
                : `""`},
                
    
            
            "name": ${JSON.stringify(props.images[j].image.title)}
          }`
            theImages.push(k)
        }
}

/* Blog Post ArticleBody */
let theArticleBody = []
let l 
let m 
let n
const categoryRows = props.categories !== (undefined || null) ? length(props.categories.nodes) - 1 : null
if(props.categories !== null){
    for (l = 0; l <= categoryRows; l++) {
        n = `
        ${props.categories !== (undefined || null) ? props.categories.nodes[l].name : null}
        `
        theArticleBody.push(n)
    }
}
const tagRows = props.tags !== (undefined || null) ? length(props.tags.nodes) - 1 : null
if(props.tags !== null){
    for (m = 0; m <= tagRows; m++) {
        n = `
        ${props.tags !== undefined ? props.tags.nodes[m].name : null}
        `
        theArticleBody.push(n)
    }
}

    return(
        <Helmet>
{(blogPage === props.uri || blogPage === props.siteUrl+props.uri) &&
    <script async type="application/ld+json" charset="utf-8">
{`
{
    "@context": "http://schema.org",
    "@type": "Blog",
    "name": "${data.nexvelSchemaMarkup.nexvelschema.businessName} Blog"
}`
}
</script>
}
{(aboutPage === props.uri || aboutPage === props.siteUrl+props.uri) &&
    <script async type="application/ld+json" charset="utf-8">
{`
{
    "@context": "http://schema.org",
    "@type": "AboutPage",
    "about": "${data.nexvelSchemaMarkup.nexvelschema.businessName}",
  	"name": "${props.title}"
}`
}
</script>
}
{(contactPage === props.uri || contactPage === props.siteUrl+props.uri) &&
    <script async type="application/ld+json" charset="utf-8">
{`
{
    "@context": "http://schema.org",
    "@type": "ContactPage",
    "description":"${data.nexvelSchemaMarkup.nexvelschema.businessName} contact page",
		"name":"${props.title}",
		"potentialAction":"Contact ${data.nexvelSchemaMarkup.nexvelschema.businessName}",
		"url":"${props.siteUrl}${data.nexvelSchemaMarkup.nexvelschema.contactPageUrl}"
}`
}
</script>
}
{props.post === true &&
    <script async type="application/ld+json" charset="utf-8">
{`
{
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "@id":"${props.siteUrl}${props.uri}",
         "headline":"${props.title}",
         "datePublished":"${props.datePublished}",
         "dateModified":"${props.dateModified}",
         "image":"${props.image}",
         "author":"${props.author}",
         "publisher":[{"@type":"Organization","name": "${data.nexvelSchemaMarkup.nexvelschema.businessName}","logo":[{"@type":"ImageObject","url":"${props.siteUrl}${data.nexvelSchemaMarkup.nexvelschema.logo.localFile.publicURL}"}]}],
         "articleSection":"${theArticleBody}",
       "articleBody":"${strippedContent}",
       "wordCount":"${wordCount}"
}`
}
</script>
}
{props.hasSchema === true &&
    <script async type="application/ld+json" charset="utf-8">
{`
{
    "@context": "http://www.schema.org",
    "@graph":[
        ${props.videos !== null ?
            ((props.questionsAndAnswers || props.maps || props.digitalDocuments || props.images) !== null ) ?
                `${theVideos},`
                :
                `${theVideos}`
            
        : ``}
       ${props.questionsAndAnswers !== null ?
        ((props.maps || props.digitalDocuments || props.images) !== null ) ?
            `${theQuestionsAndAnswers},`
            
            :
            `${theQuestionsAndAnswers}`
            :
            ``}
       
    ${props.maps !== null ?
        ((props.digitalDocuments || props.images) !== null) ?
            `${theMaps},`
            :
            `${theMaps}`
        
    : ``}
    ${props.digitalDocuments !== null ?
        ((props.images) !== null) ?
            `${theDigitalDocuments},`
            :
            `${theDigitalDocuments}`
        
    : ``}
    ${props.images !== null ?
        `${theImages}`
        : ``
        }
    ]
}
`}

</script>
}
        </Helmet>
    )
}
export default PageSpecificSchema