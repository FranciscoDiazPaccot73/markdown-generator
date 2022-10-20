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
  pubDate: "Aug 08 2022",
  title: "AstroWind template in depth",
  image: "/steps.jpg",
}

export const SAMPLE_TEXT = '# Title\n## Sub-Title \n### Deeper title \n \n Paragraphs are separated\n by an empty line.\n\n Leave two spaces at the end of a line\n to go to the line.\n\n Attributs: *italic*, **bold**, \n`monospace`, ~~striped~~.\n\n List:\n\n * apples\n * oranges\n * pears\n\n Numbered list:\n\n 1. tofu\n 2. mushrooms\n 3. bread\n\n Link with placeholder text: *[Medium](https://www.medium.com)* \n\n Simple link: https://www.medium.com/ \n\n Code: ```\n console.log("Hello folks! I hoped you enjoyed this quick tutorial. Thanks for reading."); \n``` \n \n [MARKDOWN BASICS](https://www.markdownguide.org/basic-syntax/) \n \n [Customize Markdown](https://help.start.gg/en/articles/1987102-customizing-text-with-markdown) ';

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
		element.value = x.slice(0, curPos) + chars + x.slice(curPos) + chars;
	}

	element.focus();
	element.setSelectionRange(curPos + newEl.slice, curPos + newEl.slice);
}
