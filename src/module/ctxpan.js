export const NewCtxItem = (name, value) => {
	return { type:'ITEM', name:name, value:value };
}

export const NewCtxHeading = (title) => {
	return { type:'HEADING', value:title }
}

export const NewCtxText = (text) => {
	return { type:'TEXT', value:text }
}