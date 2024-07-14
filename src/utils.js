export const TOKEN_TINY = '0ZdVBZOeoqMFK66lFBwKPMDN9O9gXdS9SMWgRvw284MINa5lulxK0MgtGGAk'

export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export const addElemNode = (elem, classElem, textContent) =>
	new DOMParser().parseFromString(
		`<${elem} class=${classElem}>${textContent}</${elem}>`,
		'text/html'
	).body.firstChild;

export const addElemNode = (elem, classElem = '', textContent = '') =>
  new DOMParser()
    .parseFromString(`<${elem} class=${classElem}>${textContent}</${elem}>`, 'text/html')
    .body
    .firstChild;

export const addFileInput = (classElem = '', id = '', textContent = 'Выбрите файл') => `
  <div class="${classElem}">
    <input type="file" name="file" id="${id}"  accept="image/*">
    <label for="${id}">${textContent}</label>
  </div
`

export const postDataUrl = (url, method, body, token = '') =>
  fetch(`${url}api_token=${token}`, {
    headers: { 'Content-Type': 'application/json' },
    method, body
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.error('Error:', err))

