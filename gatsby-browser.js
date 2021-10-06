import './src/styles/global.css'

const addScript2 = (url) => {
	const script = document.createElement('script')
	script.src = url
	document.getElementsByTagName(`head`)[0].appendChild(script)
}

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}

export const onRouteUpdate = (s) => {
	
	
	addScript2(
		'//scripts.iconnode.com/62300.js'
	)

}