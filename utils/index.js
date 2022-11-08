export const getFormattedDate = (date) => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().locale;
	return date
		? new Date(date).toLocaleDateString(`${timezone ?? 'en-us'}`, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		}) : '';
}

const FORMAT_CHARS = {
	h1: {
		slice: 2,
		chars: "# ",
	},
	h2: {
		slice: 3,
		chars: "## "
	},
	bold: {
		slice: 2,
		chars: "****"
	},
	italic: {
		slice: 1,
		chars: "**"
	},
	'list-ul': {
		slice: 2,
		chars: "* "
	},
	link: {
		slice: 7,
		chars: "[text](link)"
	}
}

export const INITIAL_DATA = {
	active: false,
	data: {
		pubDate: new Date(),
		title: "Markdown Generator",
		image: "/steps.jpg",
	}
}

export const INITIAL_FILE_NAME = 'markdown-generator.md';
export const INITIAL_FILE_NAME_JSON = 'markdown-generator.json';

export const HEADER_NAMES = {
	title: 'Title',
	image: "Image URL",
	pubDate: "Date"
}

export const META_TAGS = {
	title: 'Simple Markdown Generator',
	description: "A simple way to create and download a .md file.",
	logoUrl: "https://i.ibb.co/cbTqWZK/markdown.png",
	url: 'https://markdown-generator.vercel.app'
}

export const JSON_META_TAGS = {
	title: 'Simple JSON Generator',
	description: "A simple way to create and download a .json file.",
	logoUrl: "https://i.ibb.co/cbTqWZK/markdown.png",
	url: 'https://markdown-generator.vercel.app'
}

export const SAMPLE_TEXT = '# <div align="center">Markdown h1</div>\n## Markdown h2 \n \n Simple plain text.\n\n Leave two spaces at the end of a line to go to the line.\n\n Attributs: *italic*, **bold** \n\n ## Make:\n\n * a\n * list\n\n Link with placeholder text: *[Medium](https://www.medium.com)* \n\n To use a simple link, just type it: https://www.medium.com/ \n\n\n You can also use common HTML language: \n\n > `<div align="center">` \n\n ## Some extra documentation: \n\n > [MARKDOWN BASICS](https://www.markdownguide.org/basic-syntax/) \n \n > [Customize Markdown](https://help.start.gg/en/articles/1987102-customizing-text-with-markdown) ';

export const addTextFormat = (element, format) => {
	const x = element.value;
	const curPos = element.selectionStart;
	const endPos = element.selectionEnd;
	const newEl = FORMAT_CHARS[format] || {};
	const simpleFormats = ['h1', 'h2', 'list-ul'];

	if (curPos === endPos || simpleFormats.includes(format)) {
		element.value = x.slice(0, curPos) + newEl.chars + x.slice(curPos);
	} else if (format !== 'link') {
		const chars = format === 'bold' ? '**' : '*';
		const selectedValue = x.slice(curPos, endPos)
		element.value = x.slice(0, curPos) + chars + selectedValue + chars + x.slice(endPos);
	}

	element.focus();
	element.setSelectionRange(curPos + newEl.slice, curPos + newEl.slice);
}

export const getExtension = (input, extension = 'md') => {
	const output = input.substr(0, input.lastIndexOf('.')) || input;

	if (output.includes('.')) return getExtension(output)

	return output + `.${extension}`
}

export const getHeader = (data) => {
	const date = getFormattedDate(data.pubDate)

	return `--- \n\n pubDate: ${date} \n title: ${data.title} \n image: ${data.image} \n\n --- \n\n`
}

// JSON

export const isArrayCheck = (arr) => {
  const { value } = arr.find(item => item.id === 'isArray')

  return value;
}

export const generateRandomID = () => Math.random().toString(16).slice(2);

export const generateContentScaffolding = config => {
  const scaffolding = [];
  const newConfig = [...config.filter(c => c.type !== 'switch')];

  newConfig.forEach(conf => {
    const randomId = generateRandomID();
    const newObj = {...conf, id: randomId}

    scaffolding.push(newObj);
  })

	const scaffoldingObj = {
		id: generateRandomID(),
		components: scaffolding
	}

  return scaffoldingObj;
}

export const formatFile = (content, header) => {
  const currentObj = {
    config: header,
    data: content
  }

  const currentFile = JSON.stringify(currentObj)
  return currentFile;
}
